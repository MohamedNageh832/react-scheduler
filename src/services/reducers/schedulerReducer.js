import { compareDates } from "../../utils/compareDates";
import getSchedulerHeader from "../../utils/getSchedulerHeader";
import { LocalStorage } from "../../utils/localStorage";
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
  activeWeek.some((column) => compareDates(el.date, column.date));
const tasks = storedTasks ? storedTasks.filter(activeTasks) : [];

export const intialState = {
  tasks,
  activeWeek,
  activeEdit: null,
  gridElement: null,
  ...intialMouseStates,
};

export const reducer = (state, action) => {
  const { type, payload } = action || {};

  switch (type) {
    case ACTIONS.CHANGE_ACTIVE_WEEK:
      return { ...state, activeWeek: payload.activeWeek, tasks: payload.tasks };
    case ACTIONS.ADD_GRID_ELEMENT:
      return { ...state, gridElement: payload.gridElement };
    case ACTIONS.UPDATE_TASKS:
      return { ...state, tasks: payload.tasks, activeEdit: null };
    case ACTIONS.CREATE_TASK:
      return { ...state, tasks: payload.tasks, activeEdit: payload.activeEdit };
    case ACTIONS.EDIT_TASK:
      return { ...state, activeEdit: payload.task };
    case ACTIONS.START_RESIZING:
      return {
        ...state,
        mouseOffset: payload.mouseOffset,
        resizerIndex: payload.index,
      };
    case ACTIONS.RESIZING:
      return { ...state, tasks: payload.tasks };
    case ACTIONS.START_DRAGGING:
      return {
        ...state,
        mouseOffset: payload.mouseOffset,
        currentDraggedIdx: payload.index,
      };
    case ACTIONS.DRAGGING:
      return { ...state, tasks: payload.tasks };
    case ACTIONS.MOUSE_UP:
      return { ...state, ...intialMouseStates };
    default:
      return state;
  }
};
