import React from 'react';
import Select from 'react-select';
import langmap from 'langmap';
import uuid from 'cuid';
import formstyles from '../../../../datasetform.scss';
import AutoCompleteField from '../../../../../../ui/autocompletefield';

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

export default (props) => {
  const { onChange, details = {} } = props;
  const { language_code = '', variety = '' } = details;

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
          tooltipName=""
          path="languages"
        >
          Kieli
        </AutoCompleteField>
      </div>
      <div className={formstyles.fieldContainer}>
        <label htmlFor={`langvar_${uuid()}`}>Tarkempi variantti</label>
        <input
          type="text"
          value={variety}
          onChange={ev => onChange('variety', ev.target.value)}
          placeholder="Jätä tyhjäksi, jos ei määritelty"
          id={`langvar_${uuid()}`}
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
};
