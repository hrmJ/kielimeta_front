import { components } from 'react-select';

import React from 'react';
import Tooltip from '@atlaskit/tooltip';

import { CreatableSelect, Select } from '../localizedSelect';
import { selectStyle } from '../../../general_styles/jsStyles';

const Option = props => (
  <Tooltip content={props.data.tooltip}>
    <components.Option {...props} />
  </Tooltip>
);

export default props => {
  const {
    options,
    tooltipName,
    valueName,
    labelName,
    creatable,
    onChange,
    value,
    isSearchable = false
  } = props;
  const formattedOptions = options.map(o => ({
    styles: selectStyle,
    value: o[valueName],
    label: o[labelName || valueName],
    tooltip: o[tooltipName]
  }));

  const passedProps = {
    options: formattedOptions,
    styles: selectStyle,
    onChange,
    value,
    components: { Option }
  };
  return creatable ? (
    <CreatableSelect {...passedProps} />
  ) : (
    <Select {...passedProps} isSearchable={isSearchable} />
  );
};
