import cuid from 'cuid';
import React from 'react';
import styles from './labelledinput.scss';
import formstyles from '../../content/datasetform/datasetform.scss';
import generalStyles from '../../../general_styles/general_styles.scss';

export default (props) => {
  const {
    id, label, type, handleChange, children,
  } = props;
  let input;
  switch (type) {
    case 'textarea':
      input = <textarea defaultValue="" id={id} onChange={handleChange} />;
      break;
    default:
      input = <input type="text" id={id} onChange={handleChange} />;
  }

  return (
    <div className={formstyles.fieldContainer}>
      <label htmlFor={id}>{label}</label>
      {children || input}
    </div>
  );
};
