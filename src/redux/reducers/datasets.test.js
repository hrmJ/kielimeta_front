/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { listAll } from '../actions/datasets';

import datasetReducer from './datasets';

let store;

beforeEach(() => {
  store = createStore(datasetReducer, applyMiddleware(thunk));
});

test('initial state should be an empty list', () => {
  expect(store.getState()).toEqual([]);
});

test('the listAll action should populate the datasets object with objects', () => {
  const datasets = [
    { title: 'test title', description: 'alsdkjasd' },
    { title: 'test title2', description: 'alsdkjasd2' },
  ];
  fetch.mockResponseOnce(JSON.stringify(datasets));
  store.dispatch(listAll()).then(() => expect(store.getState()).toEqual(datasets));
});
