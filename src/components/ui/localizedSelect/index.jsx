import CreatableSelectOriginal from 'react-select/lib/Creatable';
import OriginalSelect from 'react-select';
import OriginalAsyncSelectCreatbale from 'react-select/lib/AsyncCreatable';
import PropTypes from 'prop-types';

import React from 'react';

const formatPlaceholder = (isSearchable, isMulti) => {
  let placeholder = 'Valitse';
  if (isSearchable) {
    placeholder += ' / kirjoita';
  }
  if (isMulti) {
    placeholder += ' yksi tai useita';
  }
  placeholder += '...';
  return placeholder;
};

const CreatableSelect = props => {
  const { isMulti, isSearchable, ...otherProps } = props;

  return (
    <CreatableSelectOriginal
      {...otherProps}
      isMulti={isMulti}
      isSearchable={isSearchable}
      placeholder={formatPlaceholder(isSearchable, isMulti)}
      formatCreateLabel={val => `Uusi kategoria: ${val}`}
      noOptionsMessage={() => 'Ei tallennettuja: luo uusi kirjoittamalla.'}
    />
  );
};

const AsyncSelectCreatable = props => {
  const { isMulti, isSearchable, placeholder, ...otherProps } = props;
  return (
    <OriginalAsyncSelectCreatbale
      {...otherProps}
      placeholder={placeholder || formatPlaceholder(isSearchable, isMulti)}
      isSearchable={isSearchable}
      isMulti={isMulti}
      formatCreateLabel={val => `Uusi kategoria: ${val}`}
    />
  );
};

const Select = props => {
  const { isMulti, isSearchable, placeholder, ...otherProps } = props;

  return (
    <OriginalSelect
      {...otherProps}
      placeholder={placeholder || formatPlaceholder(isSearchable, isMulti)}
      isMulti={isMulti}
      isSearchable={isSearchable}
    />
  );
};

AsyncSelectCreatable.propTypes = {
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  placeholder: PropTypes.string
};

AsyncSelectCreatable.defaultProps = {
  isMulti: false,
  isSearchable: true,
  placeholder: undefined
};

Select.propTypes = {
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  placeholder: PropTypes.string
};

Select.defaultProps = {
  isMulti: false,
  isSearchable: true,
  placeholder: undefined
};

CreatableSelect.propTypes = {
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool
};

CreatableSelect.defaultProps = {
  isMulti: false,
  isSearchable: true
};

export { CreatableSelect, Select, AsyncSelectCreatable };
