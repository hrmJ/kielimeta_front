import { combineReducers } from 'redux';

import { languageVarietyReducer, languageVarietyTypeReducer } from './languagevariety';
import datasetReducer from './datasets';
import datasetfilterReducer from './datasetfilter';
import datasetformReducer from './datasetform';
import languageNameReducer from './languagenames';
import loadingStateReducer from './loadingstate';
import originalfilterReducer from './originalfilter';
import preloadedSelectsReducer from './preloadedSelects';
import loadStatusReducer from './loadStatus';

const appReducer = combineReducers({
  datasets: datasetReducer,
  loadingState: loadingStateReducer,
  datasetform: datasetformReducer,
  datasetFilters: datasetfilterReducer,
  originalFilterValues: originalfilterReducer,
  languageVarieties: languageVarietyReducer,
  languageNames: languageNameReducer,
  languageVarietyTypes: languageVarietyTypeReducer,
  preloadedSelects: preloadedSelectsReducer,
  loadStatus: loadStatusReducer
});

export default appReducer;
