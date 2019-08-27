import { baseUrl, thunkCreator } from './utils';
import { getCookie } from '../../utils';

const fetchLanguageData = () => {
  const url = `${baseUrl}/languages/admin`;
  return thunkCreator({
    types: ['FETCH_LANGUAGES_REQUEST', 'FETCH_LANGUAGES_SUCCESS', 'FETCH_LANGUAGES_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(res => res.json())
  });
};

const updateLanguageInAdmin = (originalCode, editedVals) => {
  const url = `${baseUrl}/languages/admin`;
  const csrf = getCookie('csrftoken');
  return thunkCreator({
    types: ['UPDATE_LANGUAGE_REQUEST', 'UPDATE_LANGUAGE_SUCCESS', 'UPDATE_LANGUAGE_FAILURE'],
    promise: fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify({ originalCode, ...editedVals })
    }).then(response => response)
  });
};

export { fetchLanguageData, updateLanguageInAdmin };
