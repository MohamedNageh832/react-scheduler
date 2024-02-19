import { useEffect, useRef } from "react";
import useScheduler from "../../../services/context/schedulerContext";

const useSchedulerGrid = () => {
  const schedulerGridRef = useRef();
  const { state, addGridElement, createTask } = useScheduler();

  useEffect(() => {
    if (!schedulerGridRef.current) return;

    addGridElement(schedulerGridRef.current);
  }, [schedulerGridRef.current]);

  useEffect(() => {
    const handleGridMouseDown = (e) => {
      if (e.target !== schedulerGridRef.current) return;

      createTask(e);
    };

    window.addEventListener("mousedown", handleGridMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleGridMouseDown);
    };
  }, [state]);

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const gridProps = {
    ref: schedulerGridRef,
    className: "scheduler__grid",
    onContextMenu: onContextMenu,
  };

  return { gridProps };
};

export default useSchedulerGrid;
