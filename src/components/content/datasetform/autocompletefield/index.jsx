import React from 'react';
import formstyles from '../datasetform.scss';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
const colourOptions = [{ label: 'blue', value: 'blue' }, { label: 'yellow', value: 'yellow' }];

const filterColors = inputValue => {
  return colourOptions.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default props => {
  const { handleChange, children } = props;

  return (
    <div className={formstyles.fieldContainer}>
      <label htmlFor="resourcetype">{children}</label>
      {/*
      <input type="text" defaultValue="" id="resourcetype" onChange={handleChange} />
      */}
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
    </div>
  );
};
