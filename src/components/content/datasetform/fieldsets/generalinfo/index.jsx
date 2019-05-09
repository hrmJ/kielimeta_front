/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import styles from '../../datasetform.scss';
import generalstyles from '../../../../../general_styles/general_styles.scss';
import AutoCompleteField from '../../../../ui/autocompletefield';
import MediaTypes from './mediatypes';

export default props => {
  const { handleChange, dispatch, mediaTypes = [] } = props;

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
      <MediaTypes dispatch={dispatch} mediaTypes={mediaTypes} />
      {mediaTypes.includes('other') ? (
        <div className={`${generalstyles.someTopMargin} ${styles.additionalField}`}>
          <div className={styles.fieldContainer}>
            <label htmlFor="mediatypedescription">Kuvaile aineistojen koostumusta tarkemmin</label>
            <textarea
              defaultValue=""
              id="mediatypedescription"
              onChange={handleChange('media_description')}
            />
          </div>
          {/*
          <div className={styles.fieldContainer}>
            <label htmlFor="mediatypedescription">Mediatyypin nimi</label>
            <input type="text" defaultValue="" id="mediatypelabel" onChange={() => null} />
          </div>
          */}
        </div>
      ) : null}
    </fieldset>
  );
};
