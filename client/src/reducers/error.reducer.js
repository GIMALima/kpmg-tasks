import { GET_TASK_ERRORS } from "../actions/task.actions";

const initialState = { userError: [], taskError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK_ERRORS:
      return {
        taskError: action.payload,
        userError: [],
      };

    default:
      return state;
  }
}
