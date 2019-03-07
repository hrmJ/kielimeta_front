import { combineReducers } from 'redux';
import authorReducer from './author';

const appReducer = combineReducers({
  authorlist: authorReducer,
});

export default appReducer;
