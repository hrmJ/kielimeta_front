import { thunkCreator } from './utils';

let baseUrl = 'http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%';

const setBaseUrl = (url) => {
  /**
   * A way to mock the url for jest tests
   */
  baseUrl = url;
};

const filterByQuery = (query) => {
  const url = `${baseUrl}/datasets/filter/${query}`;
  return thunkCreator({
    types: ['FILTER_DATASETS_REQUEST', 'FILTER_DATASETS_SUCCESS', 'FILTER_DATASETS_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json()),
  });
};

const listAll = () => {
  const url = `${baseUrl}/datasets`;
  return thunkCreator({
    types: ['LIST_DATASETS_REQUEST', 'LIST_DATASETS_SUCCESS', 'LIST_DATASETS_ERROR'],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json()),
  });
};

export { listAll, filterByQuery, setBaseUrl };
