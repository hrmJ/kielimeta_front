/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import styles from './datasetform.scss';
import AutoCompleteField from './autocompletefield';

export default props => {
  const { handleChange } = props;

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
        id="resourcetype"
        onChange={handleChange('resourcetype')}
        categoryName="name"
        tooltipName="description"
        path={'resourcetypes'}
      >
        Aineiston tyyppi
      </AutoCompleteField>
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
    </fieldset>
  );
};
