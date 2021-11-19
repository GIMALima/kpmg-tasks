import axios from "axios";
import { REVIEW_STATE } from "../Constants";

// Actions.
export const GET_TASKS = "GET_TASKS";
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const UPDATE_TASK_STATE = "UPDATE_TASK_STATE";
export const ASSIGN_TASK = "ASSIGN_TASK";
export const UPLOAD_SOLUTION = "UPLOAD_SOLUTION";

// Errors.
export const UPLOAD_ERRORS = "UPLOAD_ERRORS";
export const GET_TASK_ERRORS = "GET_TASK_ERRORS";

export const getAllTasks = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/task/`)
      .then((res) => {
        dispatch({ type: GET_ALL_TASKS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

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

export const updateTask = (taskId, taskData) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/task/${taskId}`,
      data: { taskData },
    })
      .then((res) => {
        dispatch({ type: UPDATE_TASK, payload: { taskData, taskId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updateTaskState = (taskId, state) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/task/state/${taskId}`,
      data: { state },
    })
      .then((res) => {
        dispatch({ type: UPDATE_TASK_STATE, payload: { state, taskId } });
      })
      .catch((err) => console.log(err));
  };
};

export const assignTask = (taskId, userId, state) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/task/assign/${taskId}`,
      data: { state: state, assignee: userId },
    })
      .then((res) => {
        dispatch({ type: ASSIGN_TASK, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadSolution = (taskId, data) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/task/upload/${taskId}`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: UPLOAD_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: UPLOAD_ERRORS, payload: "" });
          dispatch({ type: UPLOAD_SOLUTION, payload: res.data });
          dispatch(updateTaskState(taskId, REVIEW_STATE));
        }
      })
      .catch((err) => console.log(err));
  };
};
