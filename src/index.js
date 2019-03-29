import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import DevTools from "./DevTools.jsx";
import "./general_styles/general_styles.scss";

const store = configureStore({ datasets: [] });

ReactDOM.render(
  <Provider store={store}>
    <App />
    {process.env.NODE_ENV !== "production" && <DevTools /> && false == true}
  </Provider>,
  document.getElementById("root")
);
