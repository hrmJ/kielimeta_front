/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';

import AttachmentField from '../../attachmentField';
import AutoCompleteField from '../../../../ui/autocompletefield';
import DatasetDocumentsInput from './datasetDocumentsInput';
import Genre from './genre';
import LabelledInput from '../../../../ui/labelledinput';
import MediaTypes from './mediatypes';
import ResourceType from './resourcetype';

const generalInfo = props => {
  const { handleChange, title, description, keywords, dispatch, datasetDocuments } = props;

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
        maxEntries={300}
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
      <DatasetDocumentsInput dispatch={dispatch} datasetDocuments={datasetDocuments} />
    </div>
  );
};

generalInfo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  datasetDocuments: PropTypes.arrayOf(PropTypes.any).isRequired,
  mediaTypes: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
};

generalInfo.defaultProps = {
  description: '',
  keywords: [],
  mediaTypes: [],
  title: ''
};

export default generalInfo;
