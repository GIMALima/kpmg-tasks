import {
  GET_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
  UPDATE_TASK_STATE,
  ASSIGN_TASK,
  UPLOAD_SOLUTION,
} from "../actions/task.actions";

const initialState = {};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload.taskId);

    case UPDATE_TASK:
      return state.map((task) => {
        if (task.id === action.payload.taskId) {
          return {
            ...task,
            title: action.payload.taskData.title,
            description: action.payload.taskData.description,
            deadline: action.payload.taskData.deadline,
            updated_at: action.payload.taskData.updated_at,
          };
        } else return task;
      });

    case UPDATE_TASK_STATE:
      return state.map((task) => {
        if (task.id === action.payload.taskId) {
          return {
            ...task,
            state: action.payload.state,
          };
        } else return task;
      });

    case ASSIGN_TASK:
      return [...state, action.payload];

    case UPLOAD_SOLUTION:
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            state: action.payload.state,
            solution: action.payload.solution,
            updated_at: action.payload.updated_at,
          };
        } else return task;
      });

    default:
      return state;
  }
}
