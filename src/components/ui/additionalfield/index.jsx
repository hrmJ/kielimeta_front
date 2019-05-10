import React, { Component } from 'react';
import styles from './additionalfield.scss';
import generalStyles from '../../../general_styles/general_styles.scss';

export default props => {
  const { handleChange, label, condition, id } = props;

  if (!condition) {
    return null;
  }

  return (
    <div className={`${generalStyles.someTopMargin} ${styles.additionalField}`}>
      <div className={styles.fieldContainer}>
        <label htmlFor={id}>{label}</label>
        <textarea defaultValue="" id={id} onChange={handleChange} />
      </div>
    </div>
  );
};
