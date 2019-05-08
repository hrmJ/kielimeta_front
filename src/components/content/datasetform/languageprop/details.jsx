import React from 'react';
import formstyles from '../datasetform.scss';
import Select from 'react-select';
import langmap from 'langmap';
import uuid from 'cuid';

// NOTE: a temporary mock, to be replaced with database data
const langOptions = Object.keys(langmap)
  .filter(key => key.includes('-'))
  .map(code => ({
    value: code,
    label: langmap[code]['englishName']
  }));

export const selectStyle = {
  container: provided => ({
    ...provided,
    width: '10em'
  })
};

export default props => {
  const { onChange, details = {} } = props;
  const { language_code = '', variety = '' } = details;

  if (language_code) {
    const label = langOptions.filter(lev => lev.value === language_code).map(obj => obj.label);
    langselectval = { label: label, value: language_code };
  }

  let langselectval;

  return (
    <section>
      <div className={formstyles.fieldContainer}>
        <div>Kieli</div>
        <Select
          styles={selectStyle}
          onChange={selectedoption => onChange('language_code', selectedoption.value)}
          options={langOptions}
          value={langselectval}
        />
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
    </section>
  );
};
