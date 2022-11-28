import { useEffect, useRef } from "react";
import useScheduler from "../../../services/context/schedulerContext";
import EditTask from "./edit-task";
import SchedulerTasks from "../scheduler-tasks";

const SchedulerGrid = () => {
  const schedulerGridRef = useRef();
  const {
    state,
    handleAddTask,
    handleResizing,
    handleDragging,
    handleMouseUp,
  } = useScheduler();

  const handleGridMouseDown = (e) => {
    if (e.target !== schedulerGridRef.current) return;

    handleAddTask({
      e,
      grid: schedulerGridRef.current,
    });
  };

  const onMouseMove = (e) => {
    e.preventDefault();

    if (state.resizerIndex !== -1) {
      handleResizing({
        e,
        grid: schedulerGridRef.current,
        resizerIndex: state.resizerIndex,
      });
    }

    if (state.currentDraggedIdx === -1) return;

    handleDragging({
      e,
      index: state.currentDraggedIdx,
      grid: schedulerGridRef.current,
      mouseOffset: state.mouseOffset,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [state]);

  return (
    <div
      ref={schedulerGridRef}
      className="scheduler__grid"
      onMouseDown={handleGridMouseDown}
    >
      <SchedulerTasks grid={schedulerGridRef.current} />
      {state.activeEdit && <EditTask />}
    </div>
  );
};

export default SchedulerGrid;
