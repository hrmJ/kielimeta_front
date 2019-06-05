import { thunkCreator } from './utils';
import { getCookie } from '../../utils';
import { baseUrl } from './datasets';
import { getVarieties, updateLanguageName } from './languageactions';

const _updateField = (name, val) => ({
  type: 'UPDATE_DATASETFORM_FIELD',
  name,
  val
});

const updateField = (name, val, language) => dispatch => {
  if (language) {
    dispatch(getVarieties(language.value))
      .then(() => dispatch(updateLanguageName(language.value, language.label)))
      .then(() => dispatch(_updateField(name, val)));
  } else {
    dispatch(_updateField(name, val));
  }
};

const fetchLanguages = () => null;

const updateLanguage = (language, idx) => ({
  type: 'UPDATE_LANGUAGE',
  language,
  idx
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
  validated.owner = validated.owner.split(/,\s*/);
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

export { updateField, submitDataset, fetchLanguages, updateLanguage };
