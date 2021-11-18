import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
} from "../actions/note.actions";

const initialState = {};

export default function noteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.payload;

    case ADD_NOTE:
      return [...state, action.payload];

    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload.noteId);

    case UPDATE_NOTE:
      return state.map((note) => {
        if (note.id === action.payload.noteId) {
          return {
            ...note,
            text: action.payload.noteData.text,
            updated_at: action.payload.noteData.updated_at,
          };
        } else return note;
      });
    default:
      return state;
  }
}
