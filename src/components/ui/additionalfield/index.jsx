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

const additionalField = props => {
  const {
    handleChange,
    label,
    id,
    originalValues,
    currentVal,
    condition,
    children,
    type = 'textarea',
    value
  } = props;

  if (currentVal || originalValues || condition === undefined) {
    if (!checkCondition(originalValues, currentVal)) {
      return null;
    }
  }

  if (condition === false) {
    return null;
  }

  const inputProps = { id: id, onChange: handleChange, value: value };

  return (
    <div className={`${generalStyles.someTopMargin} ${styles.additionalField}`}>
      {children || (
        <div className={styles.fieldContainer}>
          <label htmlFor={id}>{label}</label>
          {type === 'textarea' ? (
            <textarea {...inputProps} />
          ) : (
            <input type="text" {...inputProps} />
          )}
        </div>
      )}
    </div>
  );
};

additionalField.defaultProps = {
  value: ''
};

export default additionalField;
