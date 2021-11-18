import { GET_NOTES, ADD_NOTE, DELETE_NOTE } from "../actions/note.actions";

const initialState = {};

export default function noteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.payload;

    case ADD_NOTE:
      return [...state, action.payload];

    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload.noteId);

    default:
      return state;
  }
}
