import axios from "axios";

// Tasks.
export const GET_TASKS = "GET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";

// Errors.
export const GET_TASK_ERRORS = "GET_TASK_ERRORS";

export const getTasks = (userId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/task/${userId}`)
      .then((res) => {
        dispatch({ type: GET_TASKS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addTask = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/task/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_TASK_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_TASK_ERRORS, payload: "" });
        }
      });
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/task/${taskId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_TASK, payload: { taskId } });
      })
      .catch((err) => console.log(err));
  };
};
