import { thunkCreator } from './utils';
import { baseUrl } from './datasets';

const getVarieties = (lang) => {
  const url = `${baseUrl}/languages/${lang}/varieties`;
  console.log(url);
  return thunkCreator({
    types: ['VARIETIES_REQUEST', 'VARIETIES_SUCCESS', 'VARIETIES_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json()),
  });
};

export { getVarieties };
