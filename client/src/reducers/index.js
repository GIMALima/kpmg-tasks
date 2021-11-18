import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import taskReducer from "./task.reducer";
import tasksReducer from "./tasks.reducer";
import noteReducer from "./note.reducer";
import errorReducer from "./error.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  taskReducer,
  tasksReducer,
  noteReducer,
  errorReducer,
});
