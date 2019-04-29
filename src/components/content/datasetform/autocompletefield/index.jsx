import React, { Component } from 'react';
import formstyles from '../datasetform.scss';
import AsyncSelect from 'react-select/lib/AsyncCreatable';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './autocompletefield.scss';
import Tooltip from '@atlaskit/tooltip';
import { baseUrl } from '../../../../redux/actions/datasets';

const selectStyle = {
  container: provided => ({
    ...provided,
    width: '60%'
  })
};

const Option = props => {
  return (
    <Tooltip content={props.data.tooltip}>
      <components.Option {...props} />
    </Tooltip>
  );
};

export default class AutoCompleteField extends Component {
  getOptions(inputValue) {
    const { categoryName, tooltipName, path } = this.props;
    const url = `${baseUrl}/${path}?search=${inputValue}`;
    return fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(options =>
        options.map(option => ({
          label: option[categoryName],
          value: option[categoryName],
          tooltip: option[tooltipName]
        }))
      );
  }

  render() {
    const { handleChange, children, id } = this.props;

    return (
      <div className={formstyles.fieldContainer}>
        <label htmlFor="resourcetype">{children}</label>
        {/*
      <input type="text" defaultValue="" id="resourcetype" onChange={handleChange} />
      */}
        <AsyncSelect
          id={id}
          components={{ Option }}
          styles={selectStyle}
          cacheOptions
          defaultOptions
          loadOptions={inputValue => this.getOptions(inputValue)}
        />
      </div>
    );
  }
}
