import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools.jsx';

const store = configureStore({ authorlist: [] });

ReactDOM.render(
  <Provider store={store}>
    <App />
    {process.env.NODE_ENV !== 'production' && <DevTools />}
  </Provider>,
  document.getElementById('root')
);
