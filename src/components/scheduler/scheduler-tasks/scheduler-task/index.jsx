import { useEffect, useState } from "react";
import {
  MIN_X_STEP,
  MIN_Y_STEP,
} from "../../../../services/constants/schedulerConstants";
import useScheduler from "../../../../services/context/schedulerContext";
import { compareDates } from "../../../../utils/compareDates";
import Confirm from "./confirm";
import ContextMenu from "./context-menu";

const SchedulerTask = ({ task, index }) => {
  const [controls, setControls] = useState({
    openContextMenu: false,
    confirm: false,
  });
  const { state, startResizing, startDragging } = useScheduler();

  useEffect(() => {
    const closeMenu = () => {
      if (controls.openContextMenu)
        setControls((prev) => ({ ...prev, openContextMenu: false }));
    };

    window.addEventListener("mousedown", closeMenu);

    return () => window.addEventListener("mousedown", closeMenu);
  }, [controls.openContextMenu]);

  const correspondingDate = state.activeWeek.filter((el) =>
    compareDates(el.date, task.date)
  )[0];

  const horizontalStep = state.activeWeek.indexOf(correspondingDate);
  task.left = horizontalStep * MIN_X_STEP;

  const taskStyles = {
    backgroundColor: `var(--${task.color}`,
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

    setControls((prev) => ({ ...prev, openContextMenu: true }));
  };

  const startResize = (e) => {
    setControls((prev) => ({ ...prev, openContextMenu: false }));
    startResizing(e, index);
  };

  return (
    <>
      <div
        className="scheduler__task"
        onMouseDown={handleStartDragging}
        onContextMenu={handleContextMenu}
        style={taskStyles}
      >
        <h4 className="task__name">{task.name}</h4>
        <span className="task__time">{task.time}</span>
        <span className="task__resizer" onMouseDown={startResize}></span>
        {controls.openContextMenu && (
          <ContextMenu setControls={setControls} index={index} />
        )}
      </div>
      {controls.confirm && <Confirm setControls={setControls} index={index} />}
      {controls.openContextMenu && (
        <div className="overlay overlay--transparent"></div>
      )}
    </>
  );
};

export default SchedulerTask;
