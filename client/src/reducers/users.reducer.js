import { GET_USERS } from "../actions/user.actions";

const initialState = {};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;

    default:
      return state;
  }
}
