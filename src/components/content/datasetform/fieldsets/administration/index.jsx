/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';

import LabelledInput from '../../../../ui/labelledinput';
import generalstyles from '../../../../../general_styles/general_styles.scss';
import styles from '../../datasetform.scss';

export default (props) => {
  const { handleChange, dispatch } = props;
  /**
   *
   * - react-select with authors as options + MUU / OTHER
   * - if OTHER, reveal additionalfield with PersonInput
   */

  return (
    <fieldset>
      <legend>Hallinta ja saatavuus</legend>
      <LabelledInput label="Yhteyshenkilö"> </LabelledInput>
    </fieldset>
  );
};
