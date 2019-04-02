/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { listAll } from '../actions/datasets';

import appReducer from './index';

let generalstore;
let store;

beforeEach(() => {
  generalstore = createStore(appReducer, applyMiddleware(thunk));
});

test('the general store should have a datasetform property', () => {
  expect(generalstore.getState()).toHaveProperty('datasetform');
});
