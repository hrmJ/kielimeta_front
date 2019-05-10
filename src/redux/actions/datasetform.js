import { thunkCreator } from './utils';
import { getCookie } from '../../utils';
import { baseUrl } from './datasets';

const updateField = (name, val) => ({
  type: 'UPDATE_DATASETFORM_FIELD',
  name,
  val
});

const fetchLanguages = () => null;

const addLanguage = language => ({
  type: 'ADD_LANGUAGE',
  language
});

const updateLanguage = (language, idx) => ({
  type: 'UPDATE_LANGUAGE',

  language,
  idx
});

const validateFields = fields => {
  const validated = fields;
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

  return validated;
};

const submitDataset = fields => {
  const url = '%%API_SERVER_PROTOCOL%%://%%API_SERVER_HOST%%/datasets';
  const validatedFields = validateFields(fields);
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: ['SUBMITDATASET_REQUEST', 'SUBMITDATASET_SUCCESS', 'SUBMITDATASET_FAILURE'],
    promise: fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(validatedFields)
    }).then(response => response)
  });
};

const fetchOriginalFieldValues = fieldname => {
  const url = `${baseUrl}/${fieldname}`;
  return thunkCreator({
    types: [
      'FETCH_ORIGINAL_FIELD_VALUES_REQUEST',
      'FETCH_ORIGINAL_FIELD_VALUES_SUCCESS',
      'FETCH_ORIGINAL_FIELD_VALUES_FAILURE'
    ],
    promise: fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(vals => ({
        vals: vals,
        fieldname: fieldname
      }))
  });
};

export {
  updateField,
  submitDataset,
  fetchLanguages,
  addLanguage,
  updateLanguage,
  fetchOriginalFieldValues
};
