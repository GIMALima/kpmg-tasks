import { UPLOAD_ERRORS } from "../actions/task.actions";
import { GET_NOTES_ERRORS } from "../actions/note.actions";

const initialState = {
  userError: [],
  taskError: [],
  noteError: [],
  uploadError: [],
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_ERRORS:
      return {
        uploadError: action.payload,
        userError: [],
        taskError: [],
        noteError: [],
      };

    case GET_NOTES_ERRORS:
      return {
        noteError: action.payload,
        taskError: [],
        userError: [],
        uploadError: [],
      };

    default:
      return state;
  }
}
