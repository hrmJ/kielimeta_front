import { thunkCreator } from './utils.js';

const listAll = () => {
  const url = 'http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/datasets';
  console.log(url);
  return thunkCreator({
    types: [
      'LIST_DATASETS_REQUEST',
      'LIST_DATASETS_SUCCESS',
      'LIST_DATASETS_ERROR',
    ],
    promise: fetch(url, { mode: 'cors' }).then(response => response.json()),
  });
};

export { listAll };
