import { mouseOffsetX, mouseOffsetY } from "../../utils/mouseOffset";
import { LocalStorage } from "../../utils/localStorage";
import { ACTIONS } from "../actions/schedulerActions";
import {
  MIN_X_STEP,
  MIN_Y_STEP,
  ONE_HOUR_IN_GRID,
} from "../constants/schedulerConstants";

const localStorage = LocalStorage();

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_TASKS:
      return action.payload.tasks;
    case ACTIONS.ADD_TASK:
      return handleAddTask(action.payload);
    case ACTIONS.START_RESIZE:
      return { ...state, ...action.payload };
    case ACTIONS.RESIZING:
      return [...handleResize(action.payload)];
    case ACTIONS.DRAGGING:
      return [...handleDragging(action.payload)];
    default:
      return state;
  }
};

function handleAddTask({ e, grid, activeWeek, tasks }) {
  const mouseXPos = mouseOffsetX(e, grid);
  const mouseYPos = mouseOffsetY(e, grid);

  const horizontalStep = Math.floor(mouseXPos / MIN_X_STEP);
  const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

  const itemOffsetLeft = horizontalStep * MIN_X_STEP;
  const offsetTop = verticalStep * MIN_Y_STEP;
  const timeStart = getTaskTime({ offsetTop, verticalStep });

  const task = {
    name: "hi",
    top: offsetTop,
    left: itemOffsetLeft,
    heightSpan: 1,
    time: timeStart,
    date: activeWeek[horizontalStep].date,
  };

  const newTasks = [...tasks, task];

  localStorage.set("tasks7263", newTasks);
  return newTasks;
}

function getTaskTime({ offsetTop, verticalStep }) {
  const hours = Math.floor(offsetTop / ONE_HOUR_IN_GRID);
  const minutes = (verticalStep % 4) * 15;

  const hours12 = hours < 13 ? hours : hours - 12;
  const adjustedHours = hours12 === 0 ? `12` : hours12;
  const adjustedMinutes = minutes < 15 ? `0${minutes}` : minutes;
  const adjustedTime = hours < 12 ? "am" : "pm";

  return `${adjustedHours}:${adjustedMinutes} ${adjustedTime}`;
}

function handleResize({ resizerIndex, e, tasks, grid }) {
  const task = tasks[resizerIndex];

  let mouseYPos = mouseOffsetY(e, grid) - task.top;
  if (mouseYPos < 1) mouseYPos = 1;
  const verticalStep = Math.ceil(mouseYPos / MIN_Y_STEP);

  task.heightSpan = verticalStep;
  const timeStart = getTaskTime({
    offsetTop: task.top,
    verticalStep: task.top,
  });

  const timeEnd = getTaskTime({
    offsetTop: task.top + task.heightSpan * MIN_Y_STEP,
    verticalStep: task.top + task.heightSpan,
  });

  task.time = verticalStep > 1 ? `${timeStart} - ${timeEnd}` : timeStart;

  localStorage.set("tasks7263", tasks);
  return tasks;
}

function handleDragging({ e, index, grid, tasks, mouseOffset, activeWeek }) {
  const task = tasks[index];

  let mouseXPos = mouseOffsetX(e, grid);

  const overflowsLeft = mouseXPos < 1;
  const taskWidth = MIN_X_STEP;
  const taskOffsetRight = task.left + taskWidth;
  const isTouchingRight = taskOffsetRight >= grid.clientWidth;
  const mouseXIsOutside = mouseXPos + taskWidth > grid.clientWidth;

  if (overflowsLeft) mouseXPos = 0;
  else if (isTouchingRight && mouseXIsOutside)
    mouseXPos = grid.clientWidth - taskWidth;

  const horizontalStep = Math.floor(mouseXPos / MIN_X_STEP);

  const mouseYOffset = mouseOffsetY(e, grid);
  let mouseYPos = mouseYOffset - mouseOffset.y;

  const overflowsTop = mouseYPos < 1;
  const taskHeight = task.heightSpan * MIN_Y_STEP;
  const taskOffsetBottom = task.top + taskHeight;
  const isTouchingBottom = taskOffsetBottom >= grid.clientHeight;
  const mouseYIsOutside =
    mouseYOffset + taskHeight - mouseOffset.y > grid.clientHeight;

  if (overflowsTop) mouseYPos = 0;
  else if (isTouchingBottom && mouseYIsOutside)
    mouseYPos = grid.clientHeight - taskHeight;

  const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

  const taskOffsetLeft = horizontalStep * MIN_X_STEP;
  const taskOffsetTop = verticalStep * MIN_Y_STEP;

  const timeStart = getTaskTime({
    offsetTop: taskOffsetTop,
    verticalStep,
  });

  const timeEnd = getTaskTime({
    offsetTop: taskOffsetTop + task.heightSpan * MIN_Y_STEP,
    verticalStep: verticalStep + task.heightSpan,
  });

  task.left = taskOffsetLeft;
  task.top = taskOffsetTop;
  task.date = activeWeek[horizontalStep].date;
  task.time = task.taskHeight > 1 ? `${timeStart} - ${timeEnd}` : timeStart;

  localStorage.set("tasks7263", tasks);
  return tasks;
}
