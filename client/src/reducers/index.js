import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import taskReducer from "./task.reducer";
import tasksReducer from "./tasks.reducer";
import errorReducer from "./error.reducer";

export default combineReducers({
  userReducer,
  taskReducer,
  tasksReducer,
  errorReducer,
});
