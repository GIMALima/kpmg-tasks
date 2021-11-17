import { GET_ALL_TASKS, ASSIGN_TASK } from "../actions/task.actions";

const initialState = {};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TASKS:
      return action.payload;

    case ASSIGN_TASK:
      return state.filter((task) => task.id !== action.payload.id);

    default:
      return state;
  }
}
