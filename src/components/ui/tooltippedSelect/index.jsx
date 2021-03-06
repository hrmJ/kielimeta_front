import { components } from 'react-select';
import PropTypes from 'prop-types';

import React from 'react';
import Tooltip from '../tooltip';

import { CreatableSelect, Select } from '../localizedSelect';
import { selectStyle } from '../../../general_styles/jsStyles';

const Option = props => (
  <Tooltip content={props.data.tooltip}>
    <components.Option {...props} />
  </Tooltip>
);

const tooltippedSelect = props => {
  const {
    options,
    tooltipName,
    valueName,
    labelName,
    creatable,
    onChange,
    value,
    isSearchable,
    id,
    defaultValue,
    styles
  } = props;
  const formattedOptions = options.map(o => ({
    styles: selectStyle,
    value: o[valueName],
    label: o[labelName || valueName],
    tooltip: o[tooltipName]
  }));

  const passedProps = {
    options: formattedOptions,
    styles: styles || selectStyle,
    onChange,
    value,
    defaultValue,
    components: { Option },
    id
  };
  return creatable ? (
    <CreatableSelect {...passedProps} />
  ) : (
    <Select {...passedProps} isSearchable={isSearchable} />
  );
};

tooltippedSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
    .isRequired,
  tooltipName: PropTypes.string,
  valueName: PropTypes.string,
  labelName: PropTypes.string,
  creatable: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  defaultValue: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  isSearchable: PropTypes.bool,
  id: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.any)
};

tooltippedSelect.defaultProps = {
  tooltipName: 'description',
  valueName: 'value',
  labelName: 'label',
  creatable: false,
  onChange: () => null,
  value: undefined,
  defaultValue: undefined,
  isSearchable: false,
  id: '',
  styles: undefined
};

export default tooltippedSelect;
