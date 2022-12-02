import { createContext, useContext, useReducer } from "react";
import { isEqualDates } from "../../utils/isEqualDates";
import { LocalStorage } from "../../utils/localStorage";
import { getMouseOffset } from "../../utils/getMouseOffset";
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
      activeWeek.some((column) => isEqualDates(el.date, column.date));
    const tasks = intialState.tasks.filter(activeTasks);
    dispatch({
      type: ACTIONS.CHANGE_ACTIVE_WEEK,
      payload: { activeWeek, tasks },
    });
  };

  const handleUpdateTasks = (tasks) => {
    localStorage.set("tasks7263", tasks);

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
    const { x, y } = getMouseOffset(e, state.gridElement);

    const horizontalStep = Math.floor(x / MIN_X_STEP);
    const verticalStep = Math.floor(y / MIN_Y_STEP);

    const itemOffsetLeft = horizontalStep * MIN_X_STEP;
    const offsetTop = verticalStep * MIN_Y_STEP;
    const timeStart = getTaskTime({ offsetTop });
    const timeEnd = getTaskTime({
      offsetTop: offsetTop + MIN_Y_STEP,
    });

    const task = {
      name: "no title",
      top: offsetTop,
      left: itemOffsetLeft,
      height: 14,
      color: "blue",
      timeStart,
      timeEnd,
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

  const startResizing = (resizerIndex) => {
    dispatch({
      type: ACTIONS.START_RESIZING,
      payload: { resizerIndex },
    });
  };

  const startDragging = (e, currentDraggedIdx) => {
    const task = state.tasks[currentDraggedIdx];
    const { x, y } = getMouseOffset(e, state.gridElement);

    const mouseOffset = { x: x - task.left, y: y - task.top };

    dispatch({
      type: ACTIONS.START_DRAGGING,
      payload: { mouseOffset, currentDraggedIdx },
    });
  };

  const handleResizing = (e) => {
    const task = state.tasks[state.resizerIndex];

    const { y } = getMouseOffset(e, state.gridElement);
    let mouseYPos = y - task.top;

    if (mouseYPos < 1) mouseYPos = 1;

    const height = Math.ceil(mouseYPos / MIN_Y_STEP) * MIN_Y_STEP;

    const timeEnd = getTaskTime({
      offsetTop: task.top + height,
    });

    task.height = height - 2;

    task.timeEnd = timeEnd;

    localStorage.set("tasks7263", state.tasks);
    dispatch({ type: ACTIONS.RESIZING, payload: { tasks: state.tasks } });
  };

  const handleDragging = (e) => {
    const task = state.tasks[state.currentDraggedIdx];
    const grid = state.gridElement;

    let { x } = getMouseOffset(e, grid);

    const overflowsLeft = x < 1;
    const taskWidth = MIN_X_STEP;
    const taskOffsetRight = task.left + taskWidth;
    const isTouchingRight = taskOffsetRight >= grid.clientWidth;
    const mouseXIsOutside = x + taskWidth > grid.clientWidth;

    if (overflowsLeft) x = 0;
    else if (isTouchingRight && mouseXIsOutside)
      x = grid.clientWidth - taskWidth;

    const { y } = getMouseOffset(e, grid);
    let mouseYPos = y - state.mouseOffset.y;

    const overflowsTop = mouseYPos < 1;
    const taskOffsetBottom = task.top + task.height;
    const isTouchingBottom = taskOffsetBottom >= grid.clientHeight;
    const mouseYIsOutside =
      y + task.height - state.mouseOffset.y > grid.clientHeight;

    if (overflowsTop) mouseYPos = 0;
    else if (isTouchingBottom && mouseYIsOutside)
      mouseYPos = grid.clientHeight - task.height;

    const horizontalStep = Math.floor(x / MIN_X_STEP);
    const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

    const left = horizontalStep * MIN_X_STEP;
    const top = verticalStep * MIN_Y_STEP;

    const timeStart = getTaskTime({ offsetTop: top });

    const timeEnd = getTaskTime({
      offsetTop: top + task.height + 2,
    });

    const date = state.activeWeek[horizontalStep].date;

    task.left = left;
    task.top = top;
    task.date = date;
    task.timeStart = timeStart;
    task.timeEnd = timeEnd;

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
  const adjustedHours = hours < 10 ? `0${hours}` : hours;
  const adjustedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${adjustedHours}:${adjustedMinutes}`;
}

const useScheduler = () => {
  const context = useContext(SchedulerContext);

  if (context === undefined) {
    throw Error("useScheduler must be used within SchedulerContext");
  }

  return context;
};

export default useScheduler;
