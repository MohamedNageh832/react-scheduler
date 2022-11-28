import { ACTIONS } from "../actions/schedulerActions";

const intialMouseStates = {
  currentDraggedIdx: -1,
  resizerIndex: -1,
  mouseOffset: { x: 0, y: 0 },
};

export const intialState = {
  tasks: [],
  ...intialMouseStates,
};

export const reducer = (state, action) => {
  const { type, payload } = action || {};

  switch (type) {
    case ACTIONS.UPDATE_TASKS:
      return { ...state, tasks: payload.tasks };
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: payload.tasks };
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
