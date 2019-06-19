import React, { Component } from 'react';
import { Select, CreatableSelect } from '../../../../../../../ui/localizedSelect';

import { getVarietyTypes } from '../../../../../../../../redux/actions/languageactions';
import { selectStyle } from '../../../../../../../../general_styles/jsStyles';
import AdditionalField from '../../../../../../../ui/additionalfield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import formstyles from '../../../../../datasetform.scss';

const modalityOptions = [
  { value: 'written', label: 'Kirjoitettu kieli' },
  { value: 'spoken', label: 'Puhuttu kieli' },
  { value: 'internet', label: 'Internetkieli' },
  { value: 'mixed', label: 'Vaikeasti määriteltävissä' }
];

export default class Variety extends Component {
  componentDidMount() {
    const { dispatch, varietyTypes = [] } = this.props;
    if (!varietyTypes.length) {
      dispatch(getVarietyTypes());
    }
  }

  render() {
    const {
      idx,
      varieties,
      language_code,
      language_name,
      onChange,
      variety,
      varietyTypes = [],
      dispatch,
      varietyType = '',
      isNewLanguage = false,
      modality
    } = this.props;
    let varietyOptions = [];
    let varietyDetailsCondition = false;
    let varietySelectValue = { value: 'generic', label: 'ei tarkempaa varianttia' };
    const typeOptions = varietyTypes
      .filter(t => t !== 'generic')
      .map(t => ({ label: t, value: t }));

    if (!language_code) {
      return null;
    }

    if (varieties[language_code]) {
      varietyOptions = varieties[language_code].map(obj => ({
        label: obj.variety.replace('generic', 'ei tarkempaa varianttia'),
        value: obj.variety
      }));

      if (!varieties[language_code].map(obj => obj.variety).includes(variety)) {
        // a new variant was given
        varietyOptions.push({ label: variety, value: variety });
        varietyDetailsCondition = true;
      }
      varietySelectValue = varietyOptions.filter(o => o.value === variety);
      if (!varietySelectValue.length) {
        varietySelectValue = { value: 'generic', label: 'ei tarkempaa varianttia' };
      }
    } else if (isNewLanguage) {
      if (variety !== 'generic') {
        varietyDetailsCondition = true;
        varietySelectValue = { value: variety, label: variety };
        varietyOptions = [{ label: 'ei tarkempaa varianttia', value: 'generic' }];
      }
    }

    return (
      <div className={`${formstyles.upperContainer} ${formstyles.smallerFields}`}>
        <div className={formstyles.upperContainer}>
          <LabelledInput
            label="Tarkempi variantti"
            id={`langvar_${language_code}`}
            tooltip={`Tarkempi variantti voi
              olla alueellinen (kuten amerikanenglanti), murre tai tarvittaessa
              edustaa jotakin muuta tyyppiä. Jos varianttia ei löydy
              listasta, lisää se itse ja määrittele alle variantin tyyppi.`}
          >
            <CreatableSelect
              onChange={selected => onChange('variety', selected.value)}
              options={varietyOptions}
              value={varietySelectValue}
              styles={selectStyle}
              id={`lang_${idx}_variantselect`}
            />
          </LabelledInput>
          <AdditionalField condition={varietyDetailsCondition}>
            <LabelledInput label="Variantin tyyppi" id={`langvartype${language_code}`}>
              <Select
                id={`lang_${idx}_variant_type_select`}
                styles={selectStyle}
                options={typeOptions}
                value={varietyType !== 'generic' && { label: varietyType, value: varietyType }}
                onChange={selected => onChange('variety_type', selected.value)}
                isSearchable={false}
              />
            </LabelledInput>
            {/*
            <LabelledInput
              label="Lyhyt kuvaus variantista"
              id={`langvar${language_code}`}
              type="textarea"
              handleChange={() => null}
            />
						*/}
          </AdditionalField>
        </div>
        <LabelledInput label="Kielimuoto">
          <Select
            isMulti
            id={`langmod_${idx}`}
            styles={selectStyle}
            onChange={selected => onChange('modality', selected.map(s => s.value))}
            options={modalityOptions}
            value={
              modality &&
              modality.map(m => ({
                label: modalityOptions.filter(o => o.value === m)[0].label,
                value: m
              }))
            }
            isSearchable={false}
          />
        </LabelledInput>
      </div>
    );
  }
}
