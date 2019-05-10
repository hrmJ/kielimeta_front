/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import styles from '../../datasetform.scss';
import generalstyles from '../../../../../general_styles/general_styles.scss';
import AutoCompleteField from '../../../../ui/autocompletefield';
import MediaTypes from './mediatypes';
import ResourceType from './resourcetype';

export default props => {
  const { handleChange, dispatch, mediaTypes = [], originalFormValues, resourcetype } = props;
  let resourcetypeDescription = null;

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
      <ResourceType {...props} />
      <MediaTypes {...props} />
    </fieldset>
  );
};
