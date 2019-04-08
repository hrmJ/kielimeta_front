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

test('the listAll action should populate the datasets object with objects', () => {
  store.dispatch(listAll()).then(() => expect(store.getState().length).toBeGreaterThan(0));
});

test('the filterByQuery action should return only objects matching a query', () =>
  store.dispatch(filterByQuery('searchable')).then(() => expect(store.getState().length).toBe(2)));
