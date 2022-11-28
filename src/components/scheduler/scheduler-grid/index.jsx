import { useCallback, useEffect, useReducer, useRef } from "react";
import { reducer } from "../../../services/reducers/schedulerReducer";
import { MIN_X_STEP } from "../../../services/constants/schedulerConstants";
import { mouseOffsetX, mouseOffsetY } from "../../../utils/mouseOffset";
import { compareDates } from "../../../utils/compareDates";
import { LocalStorage } from "../../../utils/localStorage";
import { ACTIONS } from "../../../services/actions/schedulerActions";
import SchedulerTask from "../scheduler-task";
const localStorage = LocalStorage();

const intialMouseStates = {
  currentDraggedIdx: -1,
  resizerIndex: -1,
  mouseOffset: { x: 0, y: 0 },
};

const SchedulerGrid = ({ activeWeek }) => {
  const schedulerGridRef = useRef();
  const mouseStates = useRef(intialMouseStates);
  const storedTasks = localStorage.get("tasks7263");
  const activeTasks = (el) =>
    activeWeek.some((column) => compareDates(el.date, column.date));
  const tasksVisible = storedTasks ? storedTasks.filter(activeTasks) : [];

  const [tasks, dispatch] = useReducer(reducer, tasksVisible);

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE_TASKS, payload: { tasks: tasksVisible } });
  }, [activeWeek]);

  const onMouseDown = (e, index) => {
    e.stopPropagation();

    if (e.currentTarget === schedulerGridRef.current) {
      if (
        mouseStates.current.currentDraggedIdx !== -1 ||
        mouseStates.current.resizerIndex !== -1
      )
        return;

      dispatch({
        type: ACTIONS.ADD_TASK,
        payload: {
          e,
          tasks: tasks,
          grid: schedulerGridRef.current,
          activeWeek,
        },
      });
    }

    mouseDown(mouseStates, {
      grid: schedulerGridRef.current,
      e,
      offsetTop: e.currentTarget.offsetTop,
      index,
    });
  };

  const onMouseMove = (e) => {
    e.preventDefault();

    if (mouseStates.current.resizerIndex !== -1)
      dispatch({
        type: ACTIONS.RESIZING,
        payload: {
          tasks,
          e,
          grid: schedulerGridRef.current,
          resizerIndex: mouseStates.current.resizerIndex,
        },
      });

    if (mouseStates.current.currentDraggedIdx === -1) return;

    dispatch({
      type: ACTIONS.DRAGGING,
      payload: {
        e,
        index: mouseStates.current.currentDraggedIdx,
        grid: schedulerGridRef.current,
        mouseOffset: mouseStates.current.mouseOffset,
        tasks,
        activeWeek,
      },
    });
  };

  const onMouseUp = () => (mouseStates.current = intialMouseStates);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const schedulerTask = useCallback(
    (task, i) => {
      const taskClone = { ...task };
      taskClone.left = -MIN_X_STEP;

      const correspondingDate = activeWeek.filter((el) =>
        compareDates(el.date, taskClone.date)
      )[0];

      const horizontalStep = activeWeek.indexOf(correspondingDate);
      taskClone.left = horizontalStep * MIN_X_STEP;

      return (
        <SchedulerTask
          key={i}
          index={i}
          task={taskClone}
          onMouseDown={(e) => onMouseDown(e, i)}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          mouseStates={mouseStates}
        />
      );
    },
    [tasks]
  );

  return (
    <div
      ref={schedulerGridRef}
      className="scheduler__grid"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      {tasks.map((task, i) => schedulerTask(task, i))}
    </div>
  );
};

function mouseDown(mouseStates, { index, grid, offsetTop, e }) {
  const mouseOffset = {
    x: mouseOffsetX(e, grid),
    y: mouseOffsetY(e, grid) - offsetTop,
  };

  mouseStates.current = {
    ...mouseStates.current,
    currentDraggedIdx: index,
    mouseOffset,
  };
}

export default SchedulerGrid;
