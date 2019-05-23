import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import React from 'react';
import Tooltip from '@atlaskit/tooltip';

import { selectStyle } from '../../../general_styles/jsStyles';

const Option = props => (
  <Tooltip content={props.data.tooltip}>
    <components.Option {...props} />
  </Tooltip>
);

export default (props) => {
  const {
    options,
    tooltipName,
    valueName,
    labelName,
    onChange,
    value,
    creatable,
    isSearchable = false,
  } = props;
  const formattedOptions = options.map(o => ({
    value: o[valueName],
    label: o[labelName || valueName],
    tooltip: o[tooltipName],
  }));

  const passedProps = {
    options: formattedOptions,
    styles: selectStyle,
    onChange,
    value,
    components: { Option },
  };
  return creatable ? (
    <CreatableSelect {...passedProps} />
  ) : (
    <Select {...passedProps} isSearchable={isSearchable} />
  );
};
