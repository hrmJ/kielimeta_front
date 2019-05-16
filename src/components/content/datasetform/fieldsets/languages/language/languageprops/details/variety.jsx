import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import AdditionalField from '../../../../../../../ui/additionalfield';
import LabelledInput from '../../../../../../../ui/labelledinput';
import { selectStyle } from './index';
import formstyles from '../../../../../datasetform.scss';

export default (props) => {
  const {
    varieties, language_code, onChange, variety,
  } = props;

  if (!varieties[language_code]) {
    return null;
  }
  const varietyOptions = varieties[language_code].map(obj => ({
    label: obj.variety.replace('generic', 'ei tarkempaa varianttia'),
    value: obj.variety,
  }));

  return (
    <div className={`${formstyles.upperContainer} ${formstyles.smallerFields}`}>
      <div className={formstyles.upperContainer}>
        <LabelledInput label="Tarkempi variantti" id={`langvar_${language_code}`}>
          <CreatableSelect
            onChange={selectedoption => onChange('variety', selectedoption.value)}
            options={varietyOptions}
            styles={selectStyle}
          />
        </LabelledInput>
        <AdditionalField originalValues={varietyOptions.map(obj => obj.value)} currentVal={variety}>
          <LabelledInput label="Variantin tyyppi" id={`langvartype${language_code}`}>
            <Select styles={selectStyle} options={[]} onChange={selected => null} />
          </LabelledInput>
          <LabelledInput
            label="Lyhyt kuvaus variantista"
            id={`langvar${language_code}`}
            type="textarea"
            handleChange={() => null}
          />
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
            { value: 'mixed', label: 'Vaikeasti määriteltävissä' },
          ]}
        />
      </LabelledInput>
    </div>
  );
};
