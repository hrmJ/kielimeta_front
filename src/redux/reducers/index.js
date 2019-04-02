import { combineReducers } from 'redux';
import datasetReducer from './datasets';
import loadingStateReducer from './loadingstate';

const appReducer = combineReducers({
  datasets: datasetReducer,
  loadingDatasetList: loadingStateReducer,
  loadingState: loadingStateReducer,
});

export default appReducer;
