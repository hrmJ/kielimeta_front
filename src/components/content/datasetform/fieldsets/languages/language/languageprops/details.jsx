import React, { Component } from 'react';
import Select from 'react-select';
import langmap from 'langmap';
import uuid from 'cuid';
import formstyles from '../../../../datasetform.scss';
import AutoCompleteField from '../../../../../../ui/autocompletefield';
import { getVarieties } from '../../../../../../../redux/actions/languageactions';
import AdditionalField from '../../../../../../ui/additionalfield';

// NOTE: a temporary mock, to be replaced with database data
const langOptions = Object.keys(langmap)
  .filter(key => key.includes('-'))
  .map(code => ({
    value: code,
    label: langmap[code].englishName,
  }));

export const selectStyle = {
  container: provided => ({
    ...provided,
    width: '60%',
  }),
};

export default class Details extends Component {
  componentDidMount() {
    const { dispatch, details = {} } = this.props;
    const { language_code = '', variety = '' } = details;
    // dispatch(getVarieties(language_code));
  }

  render() {
    const { onChange, details = {}, varieties } = this.props;
    const { language_code = '', variety = '' } = details;
    let varietyOptions = [];
    if (varieties[language_code]) {
      varietyOptions = varieties[language_code].map(obj => ({
        label: obj.variety.replace('generic', 'ei tarkempaa varianttia'),
        value: obj.variety,
      }));
    }

    if (language_code) {
      const label = langOptions.filter(lev => lev.value === language_code).map(obj => obj.label);
      langselectval = { label, value: language_code };
    }

    let langselectval;

    return (
      <section>
        <div className={formstyles.upperContainer}>
          <AutoCompleteField
            onChange={selectedoption => onChange('language_code', selectedoption.value)}
            categoryName="code"
            labelName="name"
            path="languages"
          >
            Kieli
          </AutoCompleteField>
        </div>
        <div className={formstyles.upperContainer}>
          <AutoCompleteField
            onChange={selectedoption => onChange('variety', selectedoption.value)}
            categoryName="variety"
            toolTipName="variety_type"
            path={`languages/${language_code}/varieties`}
            defaultOptions={varietyOptions}
          >
            Tarkempi variantti
          </AutoCompleteField>
					<AdditionalField
						originalValues={resourcetypes}
						currentVal={resourcetype}
						handleChange={ev => dispatch(
							updateField('resourcetype', {
								name: resourcetype.name || resourcetype,
								description: ev.target.value,
							}),
						)
						}
						label="Määrittele lyhyesti antamasi aineistotyyppi"
						id="resourcetypedescription"
					/>
        </div>
        <div className={formstyles.fieldContainer}>
          <label htmlFor={`langvar_${uuid()}`}>Kielimuoto</label>
          <Select
            isMulti
            styles={selectStyle}
            onChange={selected => onChange('modality', selected.map(s => s.value))}
            options={[
              { value: 'written', label: 'Kirjoitettu kieli' },
              { value: 'spoken', label: 'Puhuttu kieli' },
              { value: 'internet', label: 'Internetkieli' },
              { value: 'mixed', label: 'Vaikeasti määriteltävissä' },
            ]}
          />
        </div>
      </section>
    );
  }
}
