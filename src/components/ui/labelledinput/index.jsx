import cuid from 'cuid';
import React from 'react';
import styles from './labelledinput.scss';
import formstyles from '../../content/datasetform/datasetform.scss';
import generalStyles from '../../../general_styles/general_styles.scss';

export default (props) => {
  const {
    id, label, type, handleChange, children, value,
  } = props;
  const inputProps = { id, defaultValue: '', onChange: handleChange };
  if (value !== undefined) {
    inputProps.value = value;
    delete inputProps.defaultValue;
  }
  let input;
  if (!children) {
    input = type === 'textarea' ? <textarea {...inputProps} /> : <input type="text" {...inputProps} />;
  }

  return (
    <div className={formstyles.fieldContainer}>
      <label htmlFor={id}>{label}</label>
      {children || input}
    </div>
  );
};
