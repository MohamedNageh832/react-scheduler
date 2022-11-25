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

    const { left, top } = schedulerGridRef.current.getBoundingClientRect();
    mouseoffset.x = e.clientX - left;
    mouseoffset.y = e.clientY - top;
  };

  const onMouseMove = (e) => {
    e.preventDefault();

    if (activeResizer.current) {
      const { top } = schedulerGridRef.current.getBoundingClientRect();

      const mouseYPos = e.clientY - top;
      const heightStep = Math.ceil(mouseYPos / MIN_Y_STEP);

      activeResizer.current.parentElement.style.height = `${
        heightStep * MIN_Y_STEP - 2
      }px`;
    }

    if (!currentDragged.current) return;

    const { left, top } = schedulerGridRef.current.getBoundingClientRect();

    const mouseXPos = e.clientX - left;
    const widthStep = mouseXPos < 1 ? 0 : Math.floor(mouseXPos / MIN_x_STEP);

    const mouseYPos = e.clientY - top - mouseoffset.y;
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
