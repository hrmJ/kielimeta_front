import React from 'react';
import PropTypes from 'prop-types';
import formstyles from '../../content/datasetform/datasetform.scss';

const index = props => {
  const { id, label, type, handleChange, children, value, placeholder } = props;
  const inputProps = { id, defaultValue: '', onChange: handleChange, placeholder };
  if (value !== undefined) {
    inputProps.value = value;
    delete inputProps.defaultValue;
  }
  let input;
  if (!children) {
    input =
      type === 'textarea' ? <textarea {...inputProps} /> : <input type="text" {...inputProps} />;
  }

  return (
    <div className={formstyles.fieldContainer}>
      <label htmlFor={id}>{label}</label>
      {children || input}
    </div>
  );
};

index.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.element,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  id: PropTypes.string
};

index.defaultProps = {
  placeholder: '',
  label: '',
  type: 'text',
  children: null,
  value: null,
  id: ''
};

export default index;
