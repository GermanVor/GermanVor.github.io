import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux"; //, applyMiddleware, combineReducers
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";

import * as reducer from "./store/posts/reducer";
const store = createStore(reducer.default, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
