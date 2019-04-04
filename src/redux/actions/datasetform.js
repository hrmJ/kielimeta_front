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

const submitDataset = (fields) => {
  const url = 'http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/datasets';

  // TODO: client side field validation

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
      body: JSON.stringify(fields),
    }).then(response => response),
  });
};

export {
 updateField, submitDataset, fetchLanguages, addLanguage, updateLanguage 
};
