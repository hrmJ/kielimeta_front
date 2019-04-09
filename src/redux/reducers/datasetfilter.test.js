/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { updateField, submitDataset } from '../actions/datasetform';

import appReducer from './index';
import datasetfilterReducer from './datasetfilter';

let generalstore;
let store;

beforeEach(() => {
  generalstore = createStore(appReducer, applyMiddleware(thunk));
  store = createStore(datasetfilterReducer, applyMiddleware(thunk));
});

describe('datasetfilterReducer', () => {
  it(' should have a datasetFilters property', () => {
    expect(generalstore.getState()).toHaveProperty('datasetFilters');
  });

  it(' should return an object of the type {key1: [], key2:[]}  for the updateFilter action ', () => {
    store.dispatch({ type: 'UPDATE_FILTER', checked: true, key: 'lang', val: 'Fi-fi' });
    expect(store.getState()).toEqual({ query: '', lang: ['Fi-fi'] });
  });

  it('should be able to update the "query" param', () => {
    store.dispatch({ type: 'UPDATE_FILTER', checked: true, key: 'query', val: 'searchme' });
    expect(store.getState()).toEqual({ query: 'searchme' });
  });

  it('should be able to update the state many times for the same val', () => {
    store.dispatch({ type: 'UPDATE_FILTER', checked: true, key: 'lang', val: 'Fi-fi' });
    store.dispatch({ type: 'UPDATE_FILTER', checked: false, key: 'lang', val: 'Fi-fi' });
    expect(store.getState()).toEqual({ lang: [], query: '' });
  });

  it('should be able  to update  the state for different keys', () => {
    store.dispatch({ type: 'UPDATE_FILTER', checked: true, key: 'lang', val: 'Fi-fi' });
    store.dispatch({ type: 'UPDATE_FILTER', checked: true, key: 'lang', val: 'Ru-ru' });
    expect(store.getState()).toEqual({ lang: ['Fi-fi', 'Ru-ru'], query: '' });
  });

  it('should be able to update the state for multiple keys many times', () => {
    store.dispatch({ type: 'UPDATE_FILTER', checked: true, key: 'lang', val: 'Fi-fi' });
    store.dispatch({ type: 'UPDATE_FILTER', checked: true, key: 'lang', val: 'Ru-ru' });
    store.dispatch({ type: 'UPDATE_FILTER', checked: false, key: 'lang', val: 'Fi-fi' });
    expect(store.getState()).toEqual({ lang: ['Ru-ru'], query: '' });
  });
});
