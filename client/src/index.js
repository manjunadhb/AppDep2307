import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

let initialStore = {
  loginDetails: {},
};

let userReducer = (latestStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type == "login") {
    return { ...latestStore, loginDetails: dispatchedObj.data };
  } else if (dispatchedObj.type == "addTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "editTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "removeTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "deleteTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "addLeave") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "editLeave") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "deleteTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "cancelTask") {
    return { ...latestStore };
  }
  return latestStore;
};

let tasksReducer = (latestStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type == "addTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "editTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "removeTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "deleteTask") {
    return { ...latestStore };
  }
  return latestStore;
};

let leavesReducer = (latestStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type == "addLeave") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "editLeave") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "deleteTask") {
    return { ...latestStore };
  } else if (dispatchedObj.type == "cancelTask") {
    return { ...latestStore };
  }
  return latestStore;
};

// let store = createStore(userReducer);
let store = createStore(
  combineReducers({ userReducer, tasksReducer, leavesReducer }),
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
