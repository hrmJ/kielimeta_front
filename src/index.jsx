/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import App from './App';
import DevTools from './DevTools';
import './general_styles/general_styles.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    {process.env.NODE_ENV !== 'production' && <DevTools />}
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
