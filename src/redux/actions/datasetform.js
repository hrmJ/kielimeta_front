import { thunkCreator } from './utils';

const updateField = (name, val) => ({
  type: 'UPDATE_DATASETFORM_FIELD',
  name,
  val,
});

const fetchLanguages = () => null;

const addLanguage = language => ({
  type: 'ADD_LANGUAGE',
  language,
});

const updateLanguage = (language, idx) => ({
  type: 'UPDATE_LANGUAGE',
  language,
  idx,
});

const validateFields = (fields) => {
  const validated = fields;
  if (fields.languages) {
    validated.languages = fields.languages.map((lang) => {
      const validatedLanguage = lang;
      if (lang.annotations) {
        let validatedAnnotations = lang.annotations.filter(ann => Object.keys(ann).length);
        if (validatedAnnotations.length) {
          validatedAnnotations = validatedAnnotations.map((ann) => {
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

const submitDataset = (fields) => {
  const url = 'http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/datasets';
  const validatedFields = validateFields(fields);
  console.log(validatedFields);
  return thunkCreator({
    types: ['SUBMITDATASET_REQUEST', 'SUBMITDATASET_SUCCESS', 'SUBMITDATASET_FAILURE'],
    promise: fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(validatedFields),
    }).then(response => response),
  });
};

export {
 updateField, submitDataset, fetchLanguages, addLanguage, updateLanguage 
};
