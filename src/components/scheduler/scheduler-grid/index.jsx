import { useRef, useState } from "react";
import { mouseOffsetX, mouseOffsetY } from "../../../utils/mouseOffset";
import SchedulerTask from "../scheduler-task";

const MIN_X_STEP = 120;
const MIN_Y_STEP = 16;
const ONE_HOUR_IN_GRID = 64;

const SchedulerGrid = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditting, setIsEditting] = useState(null);
  const schedulerGridRef = useRef();
  const currentDragged = useRef(null);
  const activeResizer = useRef(null);
  const mouseOffset = { x: 0, y: 0 };

  const handleAddTask = (e) => {
    if (currentDragged.current || activeResizer.current) return;

    const mouseXPos = mouseOffsetX(e, schedulerGridRef.current);
    const mouseYPos = mouseOffsetY(e, schedulerGridRef.current);

    const horizontalStep = Math.floor(mouseXPos / MIN_X_STEP);
    const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

    const itemOffsetLeft = horizontalStep * MIN_X_STEP;
    const itemOffsetTop = verticalStep * MIN_Y_STEP;
    console.log(itemOffsetTop);
    console.log(mouseYPos);

    const task24Hour = Math.floor(itemOffsetTop / ONE_HOUR_IN_GRID);
    const taskMinutes = (verticalStep % 4) * 15;

    const adjustTime = (hours, minutes) => {
      const hours12 = hours < 13 ? hours : hours - 12;
      const adjustedHours = hours12 < 10 ? `0${hours12}` : hours12;
      const adjustedMinutes = minutes < 15 ? `0${minutes}` : minutes;
      const adjustedTime = hours < 12 ? "am" : "pm";

      return `${adjustedHours}:${adjustedMinutes} ${adjustedTime}`;
    };

    const time = adjustTime(task24Hour, taskMinutes);
    task24Hour < 12;

    const newTask = {
      name: "hi",
      top: itemOffsetTop,
      left: itemOffsetLeft,
      time,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const onMouseDown = (e) => {
    if (e.currentTarget === schedulerGridRef.current) {
      handleAddTask(e);
      return;
    }
    currentDragged.current = e.currentTarget;

    // mosue offsets relative to parent
    mouseOffset.x = mouseOffsetX(e, schedulerGridRef.current);
    mouseOffset.y =
      mouseOffsetY(e, schedulerGridRef.current) - e.currentTarget.offsetTop;
  };

  const onMouseMove = (e) => {
    e.preventDefault();

    if (activeResizer.current) {
      const mouseYPos =
        mouseOffsetY(e, schedulerGridRef.current) -
        activeResizer.current.parentElement.offsetTop;
      const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

      activeResizer.current.parentElement.style.height = `${
        verticalStep * MIN_Y_STEP - 2
      }px`;
    }

    if (!currentDragged.current) return;

    const mouseXPos = mouseOffsetX(e, schedulerGridRef.current);
    const horizontalStep =
      mouseXPos < 1 ? 0 : Math.floor(mouseXPos / MIN_X_STEP);

    const mouseYPos = mouseOffsetY(e, schedulerGridRef.current) - mouseOffset.y;
    const verticalStep = mouseYPos < 1 ? 0 : Math.floor(mouseYPos / MIN_Y_STEP);

    currentDragged.current.style.left = `${horizontalStep * MIN_X_STEP}px`;
    currentDragged.current.style.top = `${verticalStep * MIN_Y_STEP}px`;
  };

  const onMouseUp = () => {
    currentDragged.current = null;
    activeResizer.current = null;
  };

  return (
    <div
      ref={schedulerGridRef}
      className="scheduler__grid"
      // onClick={handleAddTask}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {tasks.map((task, i) => (
        <SchedulerTask
          key={i}
          task={task}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          activeResizer={activeResizer}
        />
      ))}
    </div>
  );
};

export default SchedulerGrid;
