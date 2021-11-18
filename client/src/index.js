import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { getAllTasks } from "./actions/task.actions";
import { getAllUsers } from "./actions/user.actions";
import { getNotes } from "./actions/note.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getAllTasks());
store.dispatch(getAllUsers());
store.dispatch(getNotes());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
