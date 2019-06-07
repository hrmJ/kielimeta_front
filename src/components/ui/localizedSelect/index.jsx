import CreatableSelectOriginal from 'react-select/lib/Creatable';
import OriginalSelect from 'react-select';
import OriginalAsyncSelectCreatbale from 'react-select/lib/AsyncCreatable';
import PropTypes from 'prop-types';

import React from 'react';

const CreatableSelect = props => {
  return (
    <CreatableSelectOriginal
      {...props}
      formatCreateLabel={val => `Uusi kategoria: ${val}`}
      placeholder="Valitse/kirjoita..."
      noOptionsMessage={() => 'Ei tallennettuja: luo uusi kirjoittamalla.'}
    />
  );
};

const formatPlaceholder = isMulti => {
  let formatted = 'Valitse/kirjoita';
  if (isMulti) {
    formatted += ' yksi tai useita..';
  } else {
    formatted += '...';
  }
  return formatted;
};

const AsyncSelectCreatable = props => {
  const { isMulti, placeholder, ...otherProps } = props;
  return (
    <OriginalAsyncSelectCreatbale
      {...otherProps}
      placeholder={placeholder || formatPlaceholder(isMulti)}
      isMulti={isMulti}
      formatCreateLabel={val => `Uusi kategoria: ${val}`}
    />
  );
};

const Select = props => {
  const { isMulti, ...otherProps } = props;

  const placeholder = isMulti ? 'Valitse yksi tai useita...' : 'Valitse...';
  return <OriginalSelect {...otherProps} placeholder={placeholder} isMulti={isMulti} />;
};

AsyncSelectCreatable.propTypes = {
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string
};

AsyncSelectCreatable.defaultProps = {
  isMulti: false,
  placeholder: undefined
};

Select.propTypes = {
  isMulti: PropTypes.bool
};

Select.defaultProps = {
  isMulti: false
};

export { CreatableSelect, Select, AsyncSelectCreatable };
