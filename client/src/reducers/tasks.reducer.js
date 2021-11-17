import { GET_ALL_TASKS } from "../actions/task.actions";

const initialState = {};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TASKS:
      return action.payload;
    default:
      return state;
  }
}
