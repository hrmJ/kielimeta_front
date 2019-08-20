import { getCookie } from '../../utils';
import { getVarieties, updateLanguageName } from './languageactions';
import { thunkCreator, baseUrl } from './utils';

const updateFieldRaw = (name, val) => ({
  type: 'UPDATE_DATASETFORM_FIELD',
  name,
  val
});

const updateField = (name, val, language) => dispatch => {
  if (name === 'access_information') {
    // If giving an 'other' as a way of accessing, clear the 'location'
    // field since they are mutually exclusive
    const { placeOfPublication, access_information: accessInformation } = val;
    dispatch(updateFieldRaw('place_of_publication', { ...placeOfPublication, location: '' }));
    dispatch(updateFieldRaw('access_information', accessInformation));
  } else if (name === 'place_of_publication_location') {
    // If giving a url as a place_of_publication, clear the 'access_information
    // field since they are mutually exclusive
    dispatch(updateFieldRaw('access_information', ''));
    dispatch(updateFieldRaw('place_of_publication', val));
  } else if (language) {
    dispatch(getVarieties(language.value))
      .then(() => dispatch(updateLanguageName(language.value, language.label)))
      .then(() => dispatch(updateFieldRaw(name, val)));
  } else {
    dispatch(updateFieldRaw(name, val));
  }
};

const fetchLanguages = () => null;

const updateLanguage = (language, idx) => ({
  type: 'UPDATE_LANGUAGE',
  language,
  idx
});

const resetSubmitStatus = () => ({
  type: 'SUBMITDATASET_RESET'
});

const setEditedId = newId => ({
  type: 'SET_EDITED_ID',
  newId
});

const validateFields = fields => {
  const validated = Object.assign({}, fields);
  if (fields.languages) {
    validated.languages = fields.languages.map(lang => {
      const validatedLanguage = lang;
      if (lang.annotations) {
        let validatedAnnotations = lang.annotations.filter(ann => Object.keys(ann).length);
        if (validatedAnnotations.length) {
          validatedAnnotations = validatedAnnotations.map(ann => {
            const { version = '' } = ann;
            return { ...ann, version };
          });
          validatedLanguage.annotations = validatedAnnotations;
        }
      }
      return validatedLanguage;
    });
  }
  // NOTE: authors is a json field
  validated.authors = JSON.stringify(validated.authors);
  validated.keywords = validated.keywords || [];
  validated.resourcetype = validated.resourcetype || 'unknown';
  validated.place_of_publication = [validated.place_of_publication];
  validated.owner = validated.owner && validated.owner.split(/,\s*/);
  validated.description = validated.description || 'no description';
  if (validated.license_info && validated.license === 'undefined') {
    validated.license = validated.license_info;
    delete validated.license_info;
  }
  // Before submitting, also delete the indicator about this being a copy
  // if such was present
  delete validated.isCopy;
  // ... and other view-only stuff
  delete validated.related_datasets;
  delete validated.documents;
  return validated;
};

const submitDatasetDocuments = (datasetDocuments, id) => {
  const data = new FormData();
  datasetDocuments.forEach(doc => {
    data.append(`file${doc.id}`, doc.file || 'UNCHANGED');
    data.append(`description${doc.id}`, doc.description);
  });
  const csrf = getCookie('csrftoken');
  const url = `${baseUrl}/file_upload/${id}`;
  return thunkCreator({
    types: ['SUBMITFILE_REQUEST', 'SUBMITFILE_SUCCESS', 'SUBMITFILE_FAILURE'],
    promise: fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        // 'Content-Type': 'file??',
        'X-CSRFToken': csrf
      },
      body: data
    }).then(response => response)
  });
};

const submitDatasetRaw = (fields, id) => {
  const { main_version_id: mainVersion } = fields;
  let isUpdate = false;
  if ((id && !mainVersion) || (id && mainVersion && id * 1 !== mainVersion * 1)) {
    isUpdate = true;
  }
  const url = isUpdate ? `${baseUrl}/datasets/${id}` : `${baseUrl}/datasets`;
  const validatedFields = validateFields(fields);
  if (!isUpdate && validatedFields.id) {
    delete validatedFields.id;
  }
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: ['SUBMITDATASET_REQUEST', 'SUBMITDATASET_SUCCESS', 'SUBMITDATASET_FAILURE'],
    promise: fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(validatedFields)
    }).then(response => (isUpdate ? response : response.json()))
  });
};

const submitDataset = (fields, id, datasetDocuments) => dispatch => {
  dispatch(submitDatasetRaw(fields, id)).then(response => {
    if (response.pk || id) {
      if (Array.isArray(datasetDocuments)) {
        // if information about files not changed, skip this step
        dispatch(submitDatasetDocuments(datasetDocuments, response.pk || id));
      }
    }
  });
};

const resetFormData = () => {
  return { type: 'RESET_FORM_DATA' };
};

const editFileQueue = files => {
  return { type: 'EDIT_FILE_QUEUE', files };
};

const submitFile = file => {
  const csrf = getCookie('csrftoken');
  const url = `${baseUrl}/file_upload`;
  return thunkCreator({
    types: ['SUBMITFILE_REQUEST', 'SUBMITFILE_SUCCESS', 'SUBMITFILE_FAILURE'],
    promise: fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        // 'Content-Type': 'file??',
        'X-CSRFToken': csrf
      },
      body: file
    }).then(response => response)
  });
};

export {
  editFileQueue,
  submitFile,
  updateField,
  submitDataset,
  fetchLanguages,
  updateLanguage,
  resetSubmitStatus,
  setEditedId,
  resetFormData
};
