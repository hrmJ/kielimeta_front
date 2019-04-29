import React from 'react';
import formstyles from '../datasetform.scss';
import AsyncSelect from 'react-select/lib/AsyncCreatable';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './autocompletefield.scss';
import Tooltip from '@atlaskit/tooltip';

const selectStyle = {
  container: provided => ({
    ...provided,
    width: '10em'
  }),
  option: provided => ({
    ...provided,
    flex: '1 1'
  })
};

const Option = props => {
  return (
    <div className={styles.OptionContainer}>
      <components.Option {...props} />
      <Tooltip content="test">
        <FontAwesomeIcon icon={faInfoCircle} />
      </Tooltip>
    </div>
  );
};

const promiseOptions = inputValue => {
  const url = `http://%%API_SERVER_HOST_TEST%%/resourcetypes?search=${inputValue}`;
  return fetch(url, { mode: 'cors' })
    .then(response => response.json())
    .then(options =>
      options
        // .filter(option => option.includes(inputValue))
        .map(option => ({ label: option, value: option }))
    );
};

export default props => {
  const { handleChange, children } = props;

  return (
    <div className={formstyles.fieldContainer}>
      <label htmlFor="resourcetype">{children}</label>
      {/*
      <input type="text" defaultValue="" id="resourcetype" onChange={handleChange} />
      */}
      <AsyncSelect
        components={{ Option }}
        styles={selectStyle}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
    </div>
  );
};
