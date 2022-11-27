import { useCallback, useEffect, useReducer, useRef } from "react";
import { reducer } from "../../../services/reducers/schedulerReducer";
import {
  MIN_X_STEP,
  MIN_Y_STEP,
  AVAILABLE_STEPS,
} from "../../../services/constants/schedulerConstants";
import { compareDates } from "../../../utils/compareDates";
import { LocalStorage } from "../../../utils/localStorage";
import SchedulerTask from "../scheduler-task";
const localStorage = LocalStorage();

const SchedulerGrid = ({ activeWeek }) => {
  const storedTasks = localStorage.get("tasks7263");
  const activeTasks = (el) =>
    activeWeek.some((column) => compareDates(el.date, column.date));
  const tasks = storedTasks.filter(activeTasks);
  const schedulerGridRef = useRef();
  const currentDraggedIdx = useRef();

  const intialState = {
    resizerIndex: -1,
    tasks,
    mouseOffset: { x: 0, y: 0 },
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  const onMouseDown = (e, index) => {
    e.stopPropagation();

    if (e.currentTarget === schedulerGridRef.current) {
      if (state.currentDraggedIdx !== -1 || state.resizerIndex !== -1) return;

      dispatch({
        type: "addTask",
        e,
        tasks: state.tasks,
        grid: schedulerGridRef.current,
        activeWeek,
      });
      return;
    }

    dispatch({
      type: "mouseDown",
      grid: schedulerGridRef.current,
      e,
      offsetTop: e.currentTarget.offsetTop,
      index,
    });
  };

  const onMouseMove = (e) => {
    e.preventDefault();

    console.log(state);

    if (state.resizerIndex !== -1)
      dispatch({
        tasks,
        e,
        grid: schedulerGridRef.current,
        resizerIndex: state.resizerIndex,
        type: "resizing",
      });

    if (state.currentDraggedIdx === -1) return;

    dispatch({
      type: "dragging",
      e,
      index: state.currentDraggedIdx,
      grid: schedulerGridRef.current,
      mouseOffset: state.mouseOffset,
      tasks: state.tasks,
      activeWeek,
    });
  };

  const onMouseUp = () => dispatch({ type: "mouseUp" });

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onResize = (index) => dispatch({ type: "startResize", index });

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
          onResize={onResize}
        />
      );
    },
    [state]
  );

  return (
    <div
      style={{ height: MIN_Y_STEP * AVAILABLE_STEPS }} // TODO: turn to css
      ref={schedulerGridRef}
      className="scheduler__grid"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      {state.tasks.map((task, i) => schedulerTask(task, i))}
    </div>
  );
};

export default SchedulerGrid;
