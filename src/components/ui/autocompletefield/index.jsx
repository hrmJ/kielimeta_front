import { components } from 'react-select';
import React, { Component } from 'react';
import Tooltip from '@atlaskit/tooltip';

import FieldInfo from '../fieldInfo';
import { AsyncSelectCreatable } from '../../ui/localizedSelect';
import { baseUrl } from '../../../redux/actions/datasets';
import { selectStyle } from '../../../general_styles/jsStyles';
import formstyles from '../../content/datasetform/datasetform.scss';
import styles from './autocompletefield.scss';

const Option = props => (
  <Tooltip content={props.data.tooltip}>
    <components.Option {...props} />
  </Tooltip>
);

export default class AutoCompleteField extends Component {
  getOptions(inputValue) {
    const { categoryName, tooltipName, path, labelName, maxEntries = 10 } = this.props;
    const url = `${baseUrl}/${path}?search=${encodeURI(inputValue)}`;
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
      value,
      tooltip
    } = this.props;

    let select;
    if (value !== undefined) {
      select = (
        <AsyncSelectCreatable
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
        <AsyncSelectCreatable
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
        {children && <label htmlFor="resourcetype">{children}</label>}
        {select}
        {tooltip && (
          <div className={styles.tooltip}>
            <FieldInfo text={tooltip} />{' '}
          </div>
        )}
      </div>
    );
  }
}
