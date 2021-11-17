import { GET_TASKS } from "../actions/task.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    default:
      return state;
  }
}
