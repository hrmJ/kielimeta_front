import { combineReducers } from 'redux';
import datasetReducer from './datasets';
import loadingStateReducer from './loadingstate';

const appReducer = combineReducers({
  datasets: datasetReducer,
  loadingState: loadingStateReducer,
});

export default appReducer;
