import axios from "axios";

export const GET_NOTES = "GET_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export const GET_NOTES_ERRORS = "GET_NOTES_ERRORS";

export const getNotes = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/note`)
      .then((res) => {
        dispatch({ type: GET_NOTES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addNote = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/note/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_NOTES_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: ADD_NOTE, payload: res.data });
        }
      });
  };
};

export const deleteNote = (noteId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/note/${noteId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_NOTE, payload: { noteId } });
      })
      .catch((err) => console.log(err));
  };
};
