import { useRef } from "react";
import SchedulerTask from "../scheduler-task";

const MIN_x_STEP = 120;
const MIN_Y_STEP = 16;

const SchedulerGrid = () => {
  const schedulerGridRef = useRef();
  const currentDragged = useRef(null);
  const activeResizer = useRef(null);
  const mouseoffset = { x: 0, y: 0 };

  const onMouseDown = (e) => {
    currentDragged.current = e.currentTarget;

    const windowOffsetX = window.scrollX + e.clientX;
    const windowOffsetY = window.scrollY + e.clientY;
    mouseoffset.x = windowOffsetX - schedulerGridRef.current.offsetLeft;
    mouseoffset.y =
      windowOffsetY - schedulerGridRef.current.offsetTop - e.target.offsetTop;
  };

  const onMouseMove = (e) => {
    e.preventDefault();

    if (activeResizer.current) {
      const windowOffsetY = window.scrollY + e.clientY;
      const mouseYPos = windowOffsetY - schedulerGridRef.current.offsetTop;
      const heightStep = Math.ceil(mouseYPos / MIN_Y_STEP);

      activeResizer.current.parentElement.style.height = `${
        heightStep * MIN_Y_STEP - 2
      }px`;
    }

    if (!currentDragged.current) return;

    const windowOffsetX = window.scrollX + e.clientX;
    const mouseXPos = windowOffsetX - schedulerGridRef.current.offsetLeft;
    const widthStep = mouseXPos < 1 ? 0 : Math.floor(mouseXPos / MIN_x_STEP);

    const windowOffsetY = window.scrollY + e.clientY;
    const mouseYPos =
      windowOffsetY - schedulerGridRef.current.offsetTop - mouseoffset.y;
    const heightStep = mouseYPos < 1 ? 0 : Math.floor(mouseYPos / MIN_Y_STEP);

    currentDragged.current.style.left = `${widthStep * MIN_x_STEP}px`;
    currentDragged.current.style.top = `${heightStep * MIN_Y_STEP}px`;
  };

  const onMouseUp = () => {
    currentDragged.current = null;
    activeResizer.current = null;
  };

  return (
    <div
      ref={schedulerGridRef}
      className="scheduler__grid"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <SchedulerTask
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        activeResizer={activeResizer}
      />
    </div>
  );
};

export default SchedulerGrid;
