import { GET_TASK_ERRORS } from "../actions/task.actions";
import { GET_NOTES_ERRORS } from "../actions/note.actions";

const initialState = { userError: [], taskError: [], noteError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK_ERRORS:
      return {
        taskError: action.payload,
        userError: [],
      };

    case GET_NOTES_ERRORS:
      return {
        noteError: action.payload,
        taskError: [],
        userError: [],
      };

    default:
      return state;
  }
}
