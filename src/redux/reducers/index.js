import { combineReducers } from 'redux';
import datasetReducer from './datasets';
import loadingStateReducer from './loadingstate';
import datasetformReducer from './datasetform';
import datasetfilterReducer from './datasetfilter';
import originalfilterReducer from './originalfilter';
import originalFormValueReducer from './originalformvalues';
import languageVarietyReducer from './languagevariety';

const appReducer = combineReducers({
  datasets: datasetReducer,
  loadingState: loadingStateReducer,
  datasetform: datasetformReducer,
  datasetFilters: datasetfilterReducer,
  originalFilterValues: originalfilterReducer,
  originalFormValues: originalFormValueReducer,
  languageVarieties: languageVarietyReducer,
});

export default appReducer;
