import { ACTIONS } from "../actions/controlsActions";

export const intialState = {
  editTheme: false,
  editTask: null,
  deleteTask: null,
  taskContextMenu: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.OPEN_EDIT_THEME:
      return { ...state, editTheme: true };
    case ACTIONS.CLOSE_EDIT_THEME:
      return { ...state, editTheme: false };
    case ACTIONS.OPEN_EDIT_TASK:
      return { ...state, editTask: payload.taskId };
    case ACTIONS.CLOSE_EDIT_TASK:
      return { ...state, editTask: null };
    case ACTIONS.OPEN_TASK_CONTEXT_MENU:
      return { ...state, taskContextMenu: payload.taskId };
    case ACTIONS.CLOSE_TASK_CONTEXT_MENU:
      return { ...state, taskContextMenu: null };
    case ACTIONS.CONFIRM_DELETE_TASK:
      return { ...state, deleteTask: payload.taskId };
    case ACTIONS.CLOSE_CONFIRM_DELETE_TASK:
      return { ...state, deleteTask: null };
    default:
      return state;
  }
};
