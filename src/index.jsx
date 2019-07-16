/* eslint-disable react/jsx-filename-extension */
import React, { Suspense, lazy } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import App from './App';
import './general_styles/general_styles.scss';
import utilityStyles from './general_styles/utilities.scss';

const store = configureStore();

const DevTools = lazy(() => import(/* webpackChunkName: "redux-devtools" */ './DevTools'));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div className={utilityStyles.loading} />}>
      <App />
      {process.env.NODE_ENV !== 'production' && <DevTools />}
    </Suspense>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
