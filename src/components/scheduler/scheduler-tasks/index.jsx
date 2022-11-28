import useScheduler from "../../../services/context/schedulerContext";
import SchedulerTask from "./scheduler-task";

const SchedulerTasks = ({ grid }) => {
  const { state, handleMouseDown } = useScheduler();

  const onResize = (e, index) => {
    handleMouseDown({
      type: "resizing",
      grid,
      e,
      offsetTop: e.currentTarget.offsetTop,
      index,
    });
  };

  const handleDragging = (e, index) => {
    e.stopPropagation();
    if (!e.currentTarget) return;

    handleMouseDown({
      type: "dragging",
      grid,
      e,
      offsetTop: e.currentTarget.offsetTop,
      index,
    });
  };

  return (
    <>
      {state.tasks.map((task, i) => (
        <SchedulerTask
          key={i}
          index={i}
          task={task}
          activeWeek={state.activeWeek}
          onMouseDown={(e) => handleDragging(e, i)}
          onResize={onResize}
        />
      ))}
    </>
  );
};

export default SchedulerTasks;
