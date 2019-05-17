import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/AsyncCreatable';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@atlaskit/tooltip';
import styles from './autocompletefield.scss';
import formstyles from '../../content/datasetform/datasetform.scss';
import { baseUrl } from '../../../redux/actions/datasets';

const selectStyle = {
  container: provided => ({
    ...provided,
    width: '60%'
  })
};

const Option = props => (
  <Tooltip content={props.data.tooltip}>
    <components.Option {...props} />
  </Tooltip>
);

export default class AutoCompleteField extends Component {
  getOptions(inputValue) {
    const { categoryName, tooltipName, path, labelName, maxEntries = 10 } = this.props;
    const url = `${baseUrl}/${path}?search=${inputValue}`;
    return fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(options =>
        options.slice(0, maxEntries).map(option => {
          if (categoryName === 'flat') {
            return {
              label: option,
              value: option,
              tooltip: undefined
            };
          }
          return {
            label: option[labelName || categoryName],
            value: option[categoryName],
            tooltip: option[tooltipName]
          };
        })
      );
  }

  render() {
    const {
      handleChange,
      children,
      id,
      isMulti = false,
      onChange,
      fieldname,
      defaultOptions = true,
      value
    } = this.props;

    let select;
    if (value !== undefined) {
      select = (
        <AsyncSelect
          id={id}
          isMulti={isMulti}
          components={{ Option }}
          styles={selectStyle}
          onChange={onChange}
          value={value}
          loadOptions={inputValue => this.getOptions(inputValue)}
          defaultOptions
        />
      );
    } else {
      select = (
        <AsyncSelect
          id={id}
          defaultInputValue={value}
          isMulti={isMulti}
          components={{ Option }}
          styles={selectStyle}
          onChange={onChange}
          defaultOptions={defaultOptions}
          loadOptions={inputValue => this.getOptions(inputValue)}
        />
      );
    }

    return (
      <div className={formstyles.fieldContainer}>
        <label htmlFor="resourcetype">{children}</label>
        {select}
      </div>
    );
  }
}
