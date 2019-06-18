/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

import AutoCompleteField from '../../../../ui/autocompletefield';
import Genre from './genre';
import LabelledInput from '../../../../ui/labelledinput';
import MediaTypes from './mediatypes';
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
    media_description,
    genre,
    description,
    keywords
  } = props;
  let resourcetypeDescription = null;

  const descriptionTooltip = `Kuvaile aineistoa ja pyri kertomaan myös,
    minkälaisiin tutkimustarkoituksiin aineisto eritisesti soveltuu. Tänne voit
    kirjoittaa myös huomiot, joille ei lomakkeella ole valmista kenttää.`;

  return (
    <div>
      <LabelledInput
        label="Nimi"
        tooltip="Aineiston nimi"
        id="datasettitle"
        value={title}
        handleChange={handleChange('title')}
      />
      <LabelledInput
        label="Kuvaus"
        type="textarea"
        tooltip={descriptionTooltip}
        id="datasetdescription"
        value={description}
        handleChange={handleChange('description')}
      />
      <AutoCompleteField
        id="keyword"
        isMulti
        onChange={handleChange('keywords')}
        categoryName="flat"
        tooltipName=""
        path="keywords"
        value={keywords.map(kw => ({ label: kw, value: kw }))}
        tooltip={`Kirjoita mahdollisimman monta avainsanaa (suomeksi). Jos
          mahdollista, käytä jo olemassa olevia, mutta voit myös luoda uusia.`}
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
