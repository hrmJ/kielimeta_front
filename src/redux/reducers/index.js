import { combineReducers } from 'redux';
import datasetReducer from './datasets';
import loadingStateReducer from './loadingstate';
import datasetformReducer from './datasetform';

const appReducer = combineReducers({
  datasets: datasetReducer,
  loadingState: loadingStateReducer,
  datasetform: datasetformReducer,
});

export default appReducer;
