import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

class Variety extends Component {
  componentDidMount() {
    const { dispatch, varietyTypes } = this.props;
    if (!varietyTypes.length) {
      dispatch(getVarietyTypes());
    }
  }

  render() {
    const {
      idx,
      varieties,
      code,
      onChange,
      variety,
      varietyTypes,
      varietyType,
      isNewLanguage,
      modality
    } = this.props;
    let varietyOptions = [];
    let varietyDetailsCondition = false;
    let varietySelectValue = { value: 'generic', label: 'ei tarkempaa varianttia' };
    const typeOptions = varietyTypes
      .filter(t => t !== 'generic')
      .map(t => ({ label: t, value: t }));

    if (!code) {
      return null;
    }

    if (varieties[code]) {
      varietyOptions = varieties[code].map(obj => ({
        label: obj.variety.replace('generic', 'ei tarkempaa varianttia'),
        value: obj.variety
      }));

      if (!varieties[code].map(obj => obj.variety).includes(variety)) {
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
            id={`langvar_${code}`}
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
            <LabelledInput label="Variantin tyyppi" id={`langvartype${code}`}>
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
              id={`langvar${code}`}
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

Variety.propTypes = {
  idx: PropTypes.number.isRequired,
  varieties: PropTypes.objectOf(PropTypes.any),
  code: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  variety: PropTypes.string,
  varietyTypes: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  varietyType: PropTypes.string,
  isNewLanguage: PropTypes.bool,
  modality: PropTypes.arrayOf(PropTypes.string)
};

Variety.defaultProps = {
  varieties: {},
  varietyType: '',
  isNewLanguage: false,
  modality: [],
  varietyTypes: [],
  code: '',
  variety: ''
};

export default Variety;
