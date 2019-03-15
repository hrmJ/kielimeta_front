import { combineReducers } from "redux";
import datasetReducer from "./datasets";

const appReducer = combineReducers({
  datasets: datasetReducer
});

export default appReducer;
