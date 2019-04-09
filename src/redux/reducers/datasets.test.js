/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// bit of a hack to use actual fetch requests in the tests
import fetch from 'jest-fetch-mock';
import { listAll, filterByQuery, setBaseUrl } from '../actions/datasets';

import datasetReducer from './datasets';

let store;

beforeEach(() => {
  store = createStore(datasetReducer, applyMiddleware(thunk));
  setBaseUrl('http://localhost:8000');
});

test('initial state should be an empty list', () => {
  expect(store.getState()).toEqual([]);
});

describe('datasetReducer', () => {
  it('should populate the datasets object with objects when the listAll action is dispatched', () => {
    store.dispatch(listAll()).then(() => expect(store.getState().length).toBeGreaterThan(0));
  });

  it('should not raise errors when the filterByQuery action is dispatched', () => {
    store.dispatch(filterByQuery({ lang: ['fi-FI'], query: 'searchable' }));
    //expect(store.getState().length).toBe(2);
  });

  //.then(() => expect(store.getState().length).toBe(2)));
});
