import { isEqualDates, getSchedulerHeader, LocalStorage } from "../../utils";
import { ACTIONS } from "../actions/schedulerActions";

const intialMouseStates = {
  currentDraggedIdx: -1,
  resizerIndex: -1,
  mouseOffset: { x: 0, y: 0 },
};

const localStorage = LocalStorage();
const storedTasks = localStorage.get("tasks7263");
const activeWeek = getSchedulerHeader(new Date());
const activeTasks = (el) =>
  activeWeek.some((column) => isEqualDates(el.date, column.date));
const tasks = storedTasks ? storedTasks.filter(activeTasks) : [];

export const intialState = {
  tasks,
  activeWeek,
  activeEdit: null,
  gridElement: null,
  creatingTask: false,
  ...intialMouseStates,
};

export const reducer = (state, action) => {
  const { type, payload } = action || {};

  switch (type) {
    case ACTIONS.CHANGE_ACTIVE_WEEK:
      return { ...state, ...payload };
    case ACTIONS.ADD_GRID_ELEMENT:
      return { ...state, ...payload };
    case ACTIONS.UPDATE_TASKS:
      return { ...state, ...payload };
    case ACTIONS.CREATE_TASK:
      return { ...state, ...payload };
    case ACTIONS.DELETE_TASK:
      return { ...state, ...payload };
    case ACTIONS.EDIT_TASK:
      return { ...state, activeEdit: payload.task };
    case ACTIONS.START_RESIZING:
      return { ...state, ...payload };
    case ACTIONS.RESIZING:
      return { ...state, ...payload };
    case ACTIONS.START_DRAGGING:
      return { ...state, ...payload };
    case ACTIONS.DRAGGING:
      return { ...state, ...payload };
    case ACTIONS.MOUSE_UP:
      return { ...state, ...payload, ...intialMouseStates };
    default:
      return state;
  }
};
