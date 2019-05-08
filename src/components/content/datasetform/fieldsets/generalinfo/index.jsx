/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import styles from '../../datasetform.scss';
import generalStyles from '../../../../../general_styles/general_styles.scss';
import AutoCompleteField from '../../../../ui/autocompletefield';
import CbItem from '../../../../ui/checkboxlistitem';
import { updateField } from '../../../../../redux/actions/datasetform';

export default props => {
  const { handleChange, dispatch } = props;

  return (
    <fieldset>
      <legend>Yleistiedot</legend>
      <div className={styles.fieldContainer}>
        <label htmlFor="datasettitle">Nimi</label>
        <input type="text" defaultValue="" id="datasettitle" onChange={handleChange('title')} />
      </div>
      <div className={styles.fieldContainer}>
        <label htmlFor="datasetdescription">Kuvaus</label>
        <textarea defaultValue="" id="datasetdescription" onChange={handleChange('description')} />
      </div>
      <AutoCompleteField
        id="keyword"
        isMulti={true}
        onChange={handleChange('keywords')}
        categoryName="flat"
        tooltipName=""
        path={'keywords'}
      >
        Avainsanat
      </AutoCompleteField>
      <AutoCompleteField
        id="resourcetype"
        onChange={handleChange('resourcetype')}
        categoryName="name"
        tooltipName="description"
        path={'resourcetypes'}
      >
        Aineiston tyyppi
      </AutoCompleteField>
      <div className={styles.fieldContainer}>
        <label>Sisältää</label>
        <div>
          <ul className={`${generalStyles.responsiveList} ${styles.mediatypeList}`}>
            <CbItem onChange={() => dispatch(updateField('mediatypes', 'text'))}>Tekstiä</CbItem>
            <CbItem>Ääntä</CbItem>
            <CbItem>Videoita</CbItem>
            <CbItem>Kuvia</CbItem>
            <CbItem>Muuta</CbItem>
          </ul>
        </div>
      </div>
    </fieldset>
  );
};
