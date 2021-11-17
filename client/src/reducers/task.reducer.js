import { GET_TASKS, DELETE_TASK } from "../actions/task.actions";

const initialState = {};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload.taskId);

    default:
      return state;
  }
}
