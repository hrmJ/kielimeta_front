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
import editedIdReducer from './editedId';
import datasetGroupReducer from './datasetGroups';
import groupNameReducer from './groupNames';
import datasetVersionReducer from './datasetVersions';
import datasetPageReducer from './datasetPage';
import datasetUserReducer from './datasetUser';
import userDetailsReducer from './userDetails';
import datasetFileReducer from './datasetFile';
import userNameReducer from './userName';
import userPickerReducer from './userPicker';
import datasetTitleReducer from './datasetTitle';
import activeTitleReducer from './activeTitle';

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
  loadStatus: loadStatusReducer,
  editedId: editedIdReducer,
  groupedDatasets: datasetGroupReducer,
  groupNames: groupNameReducer,
  datasetVersions: datasetVersionReducer,
  datasetPage: datasetPageReducer,
  datasetUsers: datasetUserReducer,
  userDetails: userDetailsReducer,
  datasetDocuments: datasetFileReducer,
  userNames: userNameReducer,
  pickedUsers: userPickerReducer,
  datasetTitles: datasetTitleReducer,
  activeTitle: activeTitleReducer
});

export default appReducer;
