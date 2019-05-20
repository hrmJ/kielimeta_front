import { combineReducers } from 'redux';

import { languageVarietyReducer, languageVarietyTypeReducer } from './languagevariety';
import datasetReducer from './datasets';
import datasetfilterReducer from './datasetfilter';
import datasetformReducer from './datasetform';
import languageNameReducer from './languagenames';
import loadingStateReducer from './loadingstate';
import originalFormValueReducer from './originalformvalues';
import originalfilterReducer from './originalfilter';

const appReducer = combineReducers({
  datasets: datasetReducer,
  loadingState: loadingStateReducer,
  datasetform: datasetformReducer,
  datasetFilters: datasetfilterReducer,
  originalFilterValues: originalfilterReducer,
  originalFormValues: originalFormValueReducer,
  languageVarieties: languageVarietyReducer,
  languageNames: languageNameReducer,
  languageVarietyTypes: languageVarietyTypeReducer
});

export default appReducer;
