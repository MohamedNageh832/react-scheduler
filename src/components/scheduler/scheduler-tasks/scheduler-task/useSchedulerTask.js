import { useEffect, useState } from "react";
import { MIN_X_STEP } from "../../../../services/constants/schedulerConstants";
import useScheduler from "../../../../services/context/schedulerContext";
import { formatTime12 } from "../../../../utils/formatTime";
import { getOffsetInGrid } from "../../../../utils/getOffsetInGrid";
import { isEqualDates } from "../../../../utils/isEqualDates";

const useSchedulerTask = (task, index) => {
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
    isEqualDates(el.date, task.date)
  )[0];

  const horizontalStep = state.activeWeek.indexOf(correspondingDate);
  task.left = horizontalStep * MIN_X_STEP;

  const timeStart = formatTime12(task.timeStart);
  const timeEnd = formatTime12(task.timeEnd);
  const time = task.height > 29 ? `${timeStart} - ${timeEnd}` : timeStart;

  const handleStartDragging = (e) => {
    if (!e.target.classList.contains("scheduler__task")) return;

    startDragging(e, index);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    setControls((prev) => ({ ...prev, openContextMenu: true }));
  };

  const startResize = () => {
    setControls((prev) => ({ ...prev, openContextMenu: false }));
    startResizing(index);
  };

  const taskProps = {
    className: "scheduler__task",
    onMouseDown: handleStartDragging,
    onContextMenu: handleContextMenu,
    style: {
      backgroundColor: `var(--${task.color})`,
      left: `${task.left}px`,
      top: `${getOffsetInGrid(task.timeStart)}px`,
      height: `${task.height}px`,
    },
  };

  return { taskProps, controls, setControls, startResize, time };
};

export default useSchedulerTask;
