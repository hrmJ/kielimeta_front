import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import middleware from './middleware';
import appReducer from '../reducers';
import DevTools from '../../DevTools.jsx';

function getSessionKey() {
  const matches = window.location.href.match(/[?&]debug=([^&#]+)\b/);
  console.log(matches && matches.length > 0 ? matches[1] : null);
  return matches && matches.length > 0 ? matches[1] : null;
}

const enhancer = compose(
  middleware,
  DevTools.instrument(),
  persistState(getSessionKey())
);

export default function configureStore(initialState) {
  return createStore(appReducer, initialState, enhancer);
}
