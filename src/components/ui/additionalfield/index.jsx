import React, { Component } from 'react';
import styles from './additionalfield.scss';
import generalStyles from '../../../general_styles/general_styles.scss';

const checkCondition = (originalValues, val) => {
  if (val && Array.isArray(originalValues)) {
    if (!originalValues.includes(val)) {
      return true;
    }
  }
  return false;
};

export default (props) => {
  const {
    handleChange, label, id, originalValues, currentVal,
  } = props;

  if (!checkCondition(originalValues, currentVal)) {
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
