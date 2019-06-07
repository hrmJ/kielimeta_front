/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

import AutoCompleteField from '../../../../ui/autocompletefield';
import MediaTypes from './mediatypes';
import Genre from './genre';
import ResourceType from './resourcetype';
import styles from '../../datasetform.scss';

const generalInfo = props => {
  const {
    handleChange,
    dispatch,
    mediaTypes = [],
    originalFormValues,
    resourcetype,
    title,
    textGenres,
    mediatypes,
    genre,
    description,
    keywords
  } = props;
  let resourcetypeDescription = null;

  return (
    <div>
      <div className={styles.fieldContainer}>
        <label htmlFor="datasettitle">Nimi</label>
        <input type="text" value={title} id="datasettitle" onChange={handleChange('title')} />
      </div>
      <div className={styles.fieldContainer}>
        <label htmlFor="datasetdescription">Kuvaus</label>
        <textarea
          value={description}
          id="datasetdescription"
          onChange={handleChange('description')}
        />
      </div>
      <AutoCompleteField
        id="keyword"
        isMulti
        onChange={handleChange('keywords')}
        categoryName="flat"
        tooltipName=""
        path={'keywords'}
        value={keywords.map(kw => ({ label: kw, value: kw }))}
      >
        Avainsanat
      </AutoCompleteField>
      <ResourceType {...props} />
      <MediaTypes {...props} />
      <Genre {...props} />
    </div>
  );
};

generalInfo.defaultProps = {
  description: '',
  keywords: []
};

export default generalInfo;
