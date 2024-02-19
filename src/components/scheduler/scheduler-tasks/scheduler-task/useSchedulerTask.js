import { useEffect, useState } from "react";
import { MIN_X_STEP } from "../../../../services/constants/schedulerConstants";
import useControls from "../../../../services/context/controlsContext";
import useScheduler from "../../../../services/context/schedulerContext";
import { formatTime12 } from "../../../../utils/formatTime";
import { getOffsetInGrid } from "../../../../utils/getOffsetInGrid";
import { isEqualDates } from "../../../../utils/isEqualDates";

const useSchedulerTask = (task, index) => {
  // const [controls, setControls] = useState({
  //   openContextMenu: false,
  //   confirm: false,
  // });

  const { state, startResizing, startDragging } = useScheduler();
  const { openTaskContextMenu } = useControls();

  useEffect(() => {
    // const closeMenu = () => {
    //   if (controls.openContextMenu)
    //     setControls((prev) => ({ ...prev, openContextMenu: false }));
    // };
    // window.addEventListener("mousedown", closeMenu);
    // return () => window.addEventListener("mousedown", closeMenu);
  }, []);

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

  const handleContextMenu = (e) => openTaskContextMenu(e, index);

  const startResize = () => {
    // setControls((prev) => ({ ...prev, openContextMenu: false }));
    startResizing(index);
  };

  const taskLeft = `${task.left + task.collideOffset}px`;

  const taskProps = {
    className: `scheduler__task${task.collide ? " collide" : ""}`,
    onMouseDown: handleStartDragging,
    onContextMenu: handleContextMenu,
    onTouchStart: handleStartDragging,
    style: {
      backgroundColor: `var(--${task.color})`,
      left: taskLeft,
      top: `${getOffsetInGrid(task.timeStart)}px`,
      height: `${task.height}px`,
    },
  };

  return { taskProps, startResize, time };
};

export default useSchedulerTask;
