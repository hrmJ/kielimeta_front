/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import styles from '../../datasetform.scss';
import generalstyles from '../../../../../general_styles/general_styles.scss';

export default (props) => {
  const { handleChange, dispatch } = props;

  return (
    <fieldset>
      <legend>Hallinta ja saatavuus</legend>
    </fieldset>
  );
};
