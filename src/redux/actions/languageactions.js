import { thunkCreator } from './utils';
import { baseUrl } from './datasets';

const getVarieties = (lang) => {
  const url = `${baseUrl}/languages/${lang}/varieties`;
  return thunkCreator({
    types: ['VARIETIES_REQUEST', 'VARIETIES_SUCCESS', 'VARIETIES_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json()),
  });
};

const updateLanguageName = (code, name) => ({
  type: 'UPDATE_LANGUAGE_NAME',
  value: { [code]: name },
});

export { getVarieties, updateLanguageName };
