import { useEffect, useState } from "react";
import {
  MIN_X_STEP,
  MIN_Y_STEP,
} from "../../../../services/constants/schedulerConstants";
import useScheduler from "../../../../services/context/schedulerContext";
import { compareDates } from "../../../../utils/compareDates";

const SchedulerTask = ({ task, index }) => {
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const { state, editTask, startResizing, startDragging } = useScheduler();

  useEffect(() => {
    const closeMenu = (e) => {
      if (openContextMenu) {
        e.stopImmediatePropagation();
        setOpenContextMenu(false);
      }
    };

    window.addEventListener("mousedown", closeMenu);

    return () => window.addEventListener("mousedown", closeMenu);
  }, [openContextMenu]);

  const correspondingDate = state.activeWeek.filter((el) =>
    compareDates(el.date, task.date)
  )[0];

  const horizontalStep = state.activeWeek.indexOf(correspondingDate);
  task.left = horizontalStep * MIN_X_STEP;

  const taskStyles = {
    backgroundColor: task.color,
    left: `${task.left}px`,
    top: `${task.top}px`,
    height: `${task.heightSpan * MIN_Y_STEP - 2}px`,
  };

  const handleStartDragging = (e) => {
    if (!e.target.classList.contains("scheduler__task")) return;

    startDragging(e, index);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    setOpenContextMenu(true);
  };

  const startResize = (e) => {
    e.stopPropagation();
    startResizing(e, index);
  };

  const handleEdit = (e) => {
    e.stopPropagation();

    editTask(task);
  };

  return (
    <div
      className="scheduler__task"
      onMouseDown={handleStartDragging}
      onContextMenu={handleContextMenu}
      style={taskStyles}
    >
      <h4 className="task__name">{task.name}</h4>
      <span className="task__time">{task.time}</span>
      <span className="task__resizer" onMouseDown={startResize}></span>

      {openContextMenu && (
        <section className="task__controls">
          <button className="task__btn" onMouseDown={handleEdit}>
            edit
          </button>
        </section>
      )}
    </div>
  );
};

export default SchedulerTask;
