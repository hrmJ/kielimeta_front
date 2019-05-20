import CreatableSelect from 'react-select/lib/Creatable';
import React, { Component } from 'react';
import Select from 'react-select';

import { selectStyle } from './index';
import AdditionalField from '../../../../../../../ui/additionalfield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import { getVarietyTypes } from '../../../../../../../../redux/actions/languageactions';
import formstyles from '../../../../../datasetform.scss';

export default class Variety extends Component {
  componentDidMount() {
    const { dispatch, varietyTypes = [] } = this.props;
    if (!varietyTypes.length) {
      dispatch(getVarietyTypes());
    }
  }

  render() {
    const { varieties, language_code, onChange, variety, varietyTypes = [], dispatch } = this.props;
    let varietyOptions = [];
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
    }

    return (
      <div className={`${formstyles.upperContainer} ${formstyles.smallerFields}`}>
        <div className={formstyles.upperContainer}>
          <LabelledInput label="Tarkempi variantti" id={`langvar_${language_code}`}>
            <CreatableSelect
              onChange={selected => onChange('variety', selected.value)}
              options={varietyOptions}
              styles={selectStyle}
            />
          </LabelledInput>
          <AdditionalField
            originalValues={varietyOptions.map(obj => obj.value)}
            currentVal={variety}
          >
            <LabelledInput label="Variantin tyyppi" id={`langvartype${language_code}`}>
              <Select
                styles={selectStyle}
                options={typeOptions}
                onChange={selected => onChange('variety_type', selected.value)}
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
        <LabelledInput label="Kielimuoto" id="langmod">
          <Select
            isMulti
            styles={selectStyle}
            onChange={selected => onChange('modality', selected.map(s => s.value))}
            options={[
              { value: 'written', label: 'Kirjoitettu kieli' },
              { value: 'spoken', label: 'Puhuttu kieli' },
              { value: 'internet', label: 'Internetkieli' },
              { value: 'mixed', label: 'Vaikeasti määriteltävissä' }
            ]}
          />
        </LabelledInput>
      </div>
    );
  }
}
