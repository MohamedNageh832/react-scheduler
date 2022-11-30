import { createContext, useContext, useReducer } from "react";
import { compareDates } from "../../utils/compareDates";
import { LocalStorage } from "../../utils/localStorage";
import { mouseOffsetX, mouseOffsetY } from "../../utils/mouseOffset";
import { ACTIONS } from "../actions/schedulerActions";
import {
  MIN_X_STEP,
  MIN_Y_STEP,
  ONE_HOUR_IN_GRID,
} from "../constants/schedulerConstants";
import { intialState, reducer } from "../reducers/schedulerReducer";

const localStorage = LocalStorage();
const SchedulerContext = createContext(intialState);

export const SchedulerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const editTask = (task) => {
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { task } });
  };

  const changeActiveWeek = (activeWeek) => {
    const activeTasks = (el) =>
      activeWeek.some((column) => compareDates(el.date, column.date));
    const tasks = intialState.tasks.filter(activeTasks);
    dispatch({
      type: ACTIONS.CHANGE_ACTIVE_WEEK,
      payload: { activeWeek, tasks },
    });
  };

  const handleUpdateTasks = (tasks) => {
    dispatch({
      type: ACTIONS.UPDATE_TASKS,
      payload: { tasks, creatingTask: false, activeEdit: null },
    });
  };

  const addGridElement = (node) => {
    dispatch({
      type: ACTIONS.ADD_GRID_ELEMENT,
      payload: { gridElement: node },
    });
  };

  const createTask = (e) => {
    const mouseXPos = mouseOffsetX(e, state.gridElement);
    const mouseYPos = mouseOffsetY(e, state.gridElement);

    const horizontalStep = Math.floor(mouseXPos / MIN_X_STEP);
    const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

    const itemOffsetLeft = horizontalStep * MIN_X_STEP;
    const offsetTop = verticalStep * MIN_Y_STEP;
    const timeStart = getTaskTime({ offsetTop });

    const task = {
      name: "no title",
      top: offsetTop,
      left: itemOffsetLeft,
      heightSpan: 1,
      time: timeStart,
      date: state.activeWeek[horizontalStep].date,
    };

    const tasks = [...state.tasks, task];

    dispatch({
      type: ACTIONS.CREATE_TASK,
      payload: { tasks, resizerIndex: tasks.length - 1, creatingTask: true },
    });
  };

  const deleteTask = (index) => {
    const tasks = state.tasks;

    tasks.splice(index, 1);
    localStorage.set("tasks7263", tasks);

    dispatch({
      type: ACTIONS.DELETE_TASK,
      payload: { tasks, creatingTask: false, activeEdit: null },
    });
  };

  const startResizing = (e, resizerIndex) => {
    const mouseOffset = {
      x: mouseOffsetX(e, state.gridELement),
      y: mouseOffsetY(e, state.gridELement) - e.target.offsetTop,
    };

    dispatch({
      type: ACTIONS.START_RESIZING,
      payload: { mouseOffset, resizerIndex },
    });
  };

  const startDragging = (e, currentDraggedIdx) => {
    const mouseOffset = {
      x: mouseOffsetX(e, state.gridElement),
      y: mouseOffsetY(e, state.gridElement) - e.target.offsetTop,
    };

    dispatch({
      type: ACTIONS.START_DRAGGING,
      payload: { mouseOffset, currentDraggedIdx },
    });
  };

  const handleResizing = (e) => {
    const task = state.tasks[state.resizerIndex];

    let mouseYPos = mouseOffsetY(e, state.gridElement) - task.top;
    if (mouseYPos < 1) mouseYPos = 1;
    const heightSpan = Math.ceil(mouseYPos / MIN_Y_STEP);

    task.heightSpan = heightSpan;
    const timeStart = getTaskTime({ offsetTop: task.top });

    const timeEnd = getTaskTime({
      offsetTop: task.top + heightSpan * MIN_Y_STEP,
    });

    task.time = heightSpan > 1 ? `${timeStart} - ${timeEnd}` : timeStart;

    localStorage.set("tasks7263", state.tasks);
    dispatch({ type: ACTIONS.RESIZING, payload: { tasks: state.tasks } });
  };

  const handleDragging = (e) => {
    const task = state.tasks[state.currentDraggedIdx];
    const grid = state.gridElement;

    let mouseXPos = mouseOffsetX(e, grid);

    const overflowsLeft = mouseXPos < 1;
    const taskWidth = MIN_X_STEP;
    const taskOffsetRight = task.left + taskWidth;
    const isTouchingRight = taskOffsetRight >= grid.clientWidth;
    const mouseXIsOutside = mouseXPos + taskWidth > grid.clientWidth;

    if (overflowsLeft) mouseXPos = 0;
    else if (isTouchingRight && mouseXIsOutside)
      mouseXPos = grid.clientWidth - taskWidth;

    const mouseYOffset = mouseOffsetY(e, grid);
    let mouseYPos = mouseYOffset - state.mouseOffset.y;

    const overflowsTop = mouseYPos < 1;
    const taskHeight = task.heightSpan * MIN_Y_STEP;
    const taskOffsetBottom = task.top + taskHeight;
    const isTouchingBottom = taskOffsetBottom >= grid.clientHeight;
    const mouseYIsOutside =
      mouseYOffset + taskHeight - state.mouseOffset.y > grid.clientHeight;

    if (overflowsTop) mouseYPos = 0;
    else if (isTouchingBottom && mouseYIsOutside)
      mouseYPos = grid.clientHeight - taskHeight;

    const horizontalStep = Math.floor(mouseXPos / MIN_X_STEP);
    const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

    const taskOffsetLeft = horizontalStep * MIN_X_STEP;
    const taskOffsetTop = verticalStep * MIN_Y_STEP;

    const timeStart = getTaskTime({ offsetTop: taskOffsetTop });

    const timeEnd = getTaskTime({
      offsetTop: taskOffsetTop + task.heightSpan * MIN_Y_STEP,
    });

    task.left = taskOffsetLeft;
    task.top = taskOffsetTop;
    task.date = state.activeWeek[horizontalStep].date;
    task.time = task.heightSpan > 1 ? `${timeStart} - ${timeEnd}` : timeStart;

    localStorage.set("tasks7263", state.tasks);
    dispatch({ type: ACTIONS.DRAGGING, payload: { tasks: state.tasks } });
  };

  const handleMouseUp = () => {
    if (state.creatingTask) {
      const task = state.tasks[state.tasks.length - 1];
      const activeEdit = task;

      dispatch({ type: ACTIONS.MOUSE_UP, payload: { activeEdit } });
    }
    dispatch({ type: ACTIONS.MOUSE_UP, payload: {} });
  };

  const value = {
    state,
    editTask,
    changeActiveWeek,
    handleUpdateTasks,
    startResizing,
    startDragging,
    addGridElement,
    createTask,
    deleteTask,
    handleResizing,
    handleDragging,
    handleMouseUp,
  };

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
};

function getTaskTime({ offsetTop }) {
  const hours = Math.floor(offsetTop / ONE_HOUR_IN_GRID);
  const minutes = Math.floor((offsetTop % ONE_HOUR_IN_GRID) / 15) * 15;

  const hours12 = hours < 13 ? hours : hours - 12;
  const adjustedHours = hours12 === 0 ? `12` : hours12;
  const adjustedMinutes = minutes < 15 ? `0${minutes}` : minutes;
  const adjustedTime = hours < 12 ? "am" : "pm";

  return `${adjustedHours}:${adjustedMinutes} ${adjustedTime}`;
}

const useScheduler = () => {
  const context = useContext(SchedulerContext);

  if (context === undefined) {
    throw Error("useScheduler must be used within SchedulerContext");
  }

  return context;
};

export default useScheduler;
