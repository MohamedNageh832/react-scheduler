import { useEffect, useRef } from "react";
import useScheduler from "../../../services/context/schedulerContext";
import EditTask from "./edit-task";
import SchedulerTasks from "../scheduler-tasks";

const SchedulerGrid = () => {
  const schedulerGridRef = useRef();
  const { state, addGridElement, createTask } = useScheduler();

  useEffect(() => {
    if (schedulerGridRef.current) {
      addGridElement(schedulerGridRef.current);
    }
  }, [schedulerGridRef.current]);

  useEffect(() => {
    const handleGridMouseDown = (e) => {
      e.preventDefault();
      if (e.target !== schedulerGridRef.current) return;

      createTask(e);
    };

    window.addEventListener("mousedown", handleGridMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleGridMouseDown);
    };
  }, [state]);

  return (
    <div ref={schedulerGridRef} className="scheduler__grid">
      <SchedulerTasks />
      {state.activeEdit && <EditTask />}
    </div>
  );
};

export default SchedulerGrid;
