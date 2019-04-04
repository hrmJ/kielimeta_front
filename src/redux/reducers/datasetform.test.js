/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { updateField, submitDataset } from '../actions/datasetform';

import appReducer from './index';
import datasetformReducer, { defaultPayload } from './datasetform';

let generalstore;
let store;

beforeEach(() => {
  generalstore = createStore(appReducer, applyMiddleware(thunk));
  store = createStore(datasetformReducer, applyMiddleware(thunk));
});

test('generalstore should have a datasetform property', () => {
  expect(generalstore.getState()).toHaveProperty('datasetform');
});

test('initial state should match the default payload', () => {
  expect(store.getState()).toEqual(defaultPayload);
});

test('updating a field should change the store accordingly', () => {
  store.dispatch(updateField('title', 'a nice title'));
  expect(store.getState()).toEqual({ ...defaultPayload, ...{ title: 'a nice title' } });
});

test('updating multiple fields should change the store accordingly', () => {
  store.dispatch(updateField('title', 'a nice title'));
  store.dispatch(updateField('description', 'a nice description'));
  expect(store.getState()).toEqual({
    ...defaultPayload,
    ...{ title: 'a nice title', description: 'a nice description' },
  });
});

test('updating the same field  multiple times should change the store accordingly', () => {
  store.dispatch(updateField('title', 'a nice title'));
  store.dispatch(updateField('title', 'a nice title2'));
  store.dispatch(updateField('title', 'the latest title'));
  expect(store.getState()).toEqual({ ...defaultPayload, ...{ title: 'the latest title' } });
});

test('adding a language with complex information', () => {
  const newlang = { name: 'Finnish', annotations: [{ type: 'MORPH', version: 'basic' }] };
  store.dispatch(updateField('languages', [newlang]));
  expect(store.getState().languages).toMatchObject([newlang]);
});

test('updating a language with complex information', () => {
  let newlang = { name: 'Finnish', annotations: [{ type: 'MORPH', version: 'basic' }] };
  store.dispatch(updateField('languages', [newlang]));
  newlang = { name: 'Finnish', annotations: [{ type: 'MORPH', version: 'notbasic' }] };
  store.dispatch(updateField('languages', [newlang]));
  expect(store.getState().languages).toMatchObject([newlang]);
});
