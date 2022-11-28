import { useEffect, useRef, useState } from "react";
import { compareDates } from "../../../utils/compareDates";
import SchedulerTask from "../scheduler-task";
import useScheduler from "../../../services/context/schedulerContext";
import { LocalStorage } from "../../../utils/localStorage";
import EditTask from "./edit-task";

const localStorage = LocalStorage();

const storedTasks = localStorage.get("tasks7263");

const SchedulerGrid = ({ activeWeek }) => {
  const schedulerGridRef = useRef();
  const [editIndex, setEditIndex] = useState(-1);
  const {
    state,
    handleUpdateTasks,
    handleMouseDown,
    handleAddTask,
    handleResizing,
    handleDragging,
    handleMouseUp,
  } = useScheduler();

  const activeTasks = (el) =>
    activeWeek.some((column) => compareDates(el.date, column.date));
  const tasksVisible = storedTasks ? storedTasks.filter(activeTasks) : [];

  useEffect(() => {
    handleUpdateTasks(tasksVisible);
  }, [activeWeek]);

  const handleGridMouseDown = (e) => {
    handleAddTask({
      e,
      grid: schedulerGridRef.current,
      activeWeek,
    });

    setEditIndex(state.tasks.length - 1);
  };

  const handleStartDragging = (e, index) => {
    e.stopPropagation();

    handleMouseDown({
      type: "dragging",
      grid: schedulerGridRef.current,
      e,
      offsetTop: e.currentTarget.offsetTop,
      index,
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
      activeWeek,
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

  const onResize = (e, index) => {
    handleMouseDown({
      type: "resizing",
      grid: schedulerGridRef.current,
      e,
      offsetTop: e.currentTarget.offsetTop,
      index,
    });
  };

  const handleEditTask = ({ name }) => {
    const tasks = state.tasks;
    const task = tasks[editIndex];
    task.name = name;

    localStorage.set("tasks7263", tasks);
    handleUpdateTasks(tasks);
    setEditIndex(-1);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  return (
    <div
      ref={schedulerGridRef}
      className="scheduler__grid"
      onMouseDown={handleGridMouseDown}
    >
      {state.tasks.map((task, i) => (
        <SchedulerTask
          key={i}
          index={i}
          task={task}
          activeWeek={activeWeek}
          onMouseDown={(e) => handleStartDragging(e, i)}
          onResize={onResize}
        />
      ))}
      {editIndex > -1 && (
        <EditTask onSubmit={handleEditTask} onCancel={handleCancelEdit} />
      )}
    </div>
  );
};

export default SchedulerGrid;
