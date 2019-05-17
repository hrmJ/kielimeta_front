import cuid from 'cuid';
import React from 'react';
import styles from './labelledinput.scss';
import formstyles from '../../content/datasetform/datasetform.scss';
import generalStyles from '../../../general_styles/general_styles.scss';

export default props => {
  const { id, label, type, handleChange, children } = props;
  const inputProps = { id: id, defaultValue: '', onChange: handleChange };
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
