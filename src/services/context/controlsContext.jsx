import { createContext, useContext, useMemo, useReducer } from "react";
import { ACTIONS } from "../actions/controlsActions";
import { intialState, reducer } from "../reducers/controlsReducer";

const ControlsContext = createContext(intialState);

export const ControlsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const openEditTheme = () => {
    dispatch({ type: ACTIONS.OPEN_EDIT_THEME });
  };

  const closeEditTheme = () => {
    dispatch({ type: ACTIONS.CLOSE_EDIT_THEME });
  };

  const openTaskContextMenu = (e, taskId) => {
    e.preventDefault();

    dispatch({ type: ACTIONS.OPEN_TASK_CONTEXT_MENU, payload: { taskId } });
  };

  const closeTaskContextMenu = () =>
    dispatch({ type: ACTIONS.CLOSE_TASK_CONTEXT_MENU });

  const confirmDeleteTask = (taskId) =>
    dispatch({ type: ACTIONS.CONFIRM_DELETE_TASK, payload: { taskId } });

  const closeConfirmDelete = () =>
    dispatch({ type: ACTIONS.CLOSE_CONFIRM_DELETE_TASK });

  const value = useMemo(
    () => ({
      state,
      openEditTheme,
      closeEditTheme,
      openTaskContextMenu,
      closeTaskContextMenu,
      confirmDeleteTask,
      closeConfirmDelete,
    }),
    [state]
  );

  return (
    <ControlsContext.Provider value={value}>
      {children}
    </ControlsContext.Provider>
  );
};

const useControls = () => {
  const context = useContext(ControlsContext);

  if (context === undefined) {
    throw Error("useControls must be used within ControlsContext");
  }

  return context;
};

export default useControls;
