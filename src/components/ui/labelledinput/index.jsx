import React from 'react';
import PropTypes from 'prop-types';
import formstyles from '../../content/datasetform/datasetform.scss';
import FieldInfo from '../fieldInfo';
import styles from './labelledinput.scss';

const LabelledInput = props => {
  const { id, label, type, handleChange, children, value, placeholder, tooltip, stacked } = props;
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
    <div className={stacked ? styles.stackedContainer : formstyles.fieldContainer}>
      <label htmlFor={id}>{label}</label>
      {children || input}
      {tooltip && (
        <div className={styles.tooltip}>
          <FieldInfo text={tooltip} />
        </div>
      )}
    </div>
  );
};

LabelledInput.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.element,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string,
  tooltip: PropTypes.string,
  stacked: PropTypes.bool
};

LabelledInput.defaultProps = {
  handleChange: () => null,
  placeholder: '',
  label: '',
  type: 'text',
  children: null,
  value: null,
  id: '',
  tooltip: '',
  stacked: false
};

export default LabelledInput;
