import { useMemo, useRef, useState } from "react";
import { mouseOffsetX, mouseOffsetY } from "../../../utils/mouseOffset";
import SchedulerTask from "../scheduler-task";

const MIN_X_STEP = 120;
const MIN_Y_STEP = 16;
const ONE_HOUR_IN_GRID = 64;

const SchedulerGrid = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditting, setIsEditting] = useState(null);
  const schedulerGridRef = useRef();
  const draggedIdx = useRef(-1);
  const activeResizer = useRef(-1);
  const mouseOffset = useMemo(() => ({ x: 0, y: 0 }), [draggedIdx.current]);

  const getTaskTime = ({ offsetTop, verticalStep }) => {
    const hours = Math.floor(offsetTop / ONE_HOUR_IN_GRID);
    const minutes = (verticalStep % 4) * 15;

    const hours12 = hours < 13 ? hours : hours - 12;
    const adjustedHours = hours12 < 10 ? `0${hours12}` : hours12;
    const adjustedMinutes = minutes < 15 ? `0${minutes}` : minutes;
    const adjustedTime = hours < 12 ? "am" : "pm";

    return `${adjustedHours}:${adjustedMinutes} ${adjustedTime}`;
  };

  const handleAddTask = (e) => {
    if (draggedIdx.current !== -1 || activeResizer.current !== -1) return;

    const mouseXPos = mouseOffsetX(e, schedulerGridRef.current);
    const mouseYPos = mouseOffsetY(e, schedulerGridRef.current);

    const horizontalStep = Math.floor(mouseXPos / MIN_X_STEP);
    const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

    const itemOffsetLeft = horizontalStep * MIN_X_STEP;
    const itemOffsetTop = verticalStep * MIN_Y_STEP;
    const timeStart = getTaskTime({ offsetTop: itemOffsetTop, verticalStep });
    const timeEnd = getTaskTime({
      offsetTop: itemOffsetTop + MIN_Y_STEP,
      verticalStep: verticalStep + 1,
    });

    const newTask = {
      name: "hi",
      top: itemOffsetTop,
      left: itemOffsetLeft,
      heightSpan: 1,
      time: `${timeStart} - ${timeEnd}`,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const onMouseDown = (e, idx) => {
    if (e.currentTarget === schedulerGridRef.current) {
      handleAddTask(e);
      return;
    }

    draggedIdx.current = idx;

    // mosue offsets relative to parent
    mouseOffset.x = mouseOffsetX(e, schedulerGridRef.current);
    mouseOffset.y =
      mouseOffsetY(e, schedulerGridRef.current) - e.currentTarget.offsetTop;
  };

  const onMouseMove = (e) => {
    e.preventDefault();

    if (activeResizer.current !== -1) {
      const tasksClone = [...tasks];
      const task = tasksClone[activeResizer.current];

      const mouseYPos = mouseOffsetY(e, schedulerGridRef.current) - task.top;
      const verticalStep = Math.floor(mouseYPos / MIN_Y_STEP);

      task.heightSpan = verticalStep;
      const timeStart = getTaskTime({
        offsetTop: task.top,
        verticalStep: task.top,
      });

      const timeEnd = getTaskTime({
        offsetTop: task.top + task.heightSpan * MIN_Y_STEP,
        verticalStep: task.top + task.heightSpan,
      });

      task.time = `${timeStart} - ${timeEnd}`;

      setTasks(tasksClone);
    }

    if (draggedIdx.current === -1) return;

    const mouseXPos = mouseOffsetX(e, schedulerGridRef.current);
    const horizontalStep =
      mouseXPos < 1 ? 0 : Math.floor(mouseXPos / MIN_X_STEP);

    const mouseYPos = mouseOffsetY(e, schedulerGridRef.current) - mouseOffset.y;
    const verticalStep = mouseYPos < 1 ? 0 : Math.floor(mouseYPos / MIN_Y_STEP);

    const tasksClone = [...tasks];
    const task = tasksClone[draggedIdx.current];

    const taskOffsetLeft = horizontalStep * MIN_X_STEP;
    const taskOffsetTop = verticalStep * MIN_Y_STEP;

    const timeStart = getTaskTime({
      offsetTop: taskOffsetTop,
      verticalStep,
    });

    const timeEnd = getTaskTime({
      offsetTop: taskOffsetTop + task.heightSpan * MIN_Y_STEP,
      verticalStep: verticalStep + task.heightSpan,
    });

    task.left = taskOffsetLeft;
    task.top = taskOffsetTop;
    task.time = `${timeStart} - ${timeEnd}`;
    setTasks(tasksClone);
  };

  const onMouseUp = () => {
    draggedIdx.current = -1;
    activeResizer.current = -1;
  };

  return (
    <div
      ref={schedulerGridRef}
      className="scheduler__grid"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {tasks.map((task, i) => (
        <SchedulerTask
          key={i}
          index={i}
          task={task}
          onMouseDown={(e) => onMouseDown(e, i)}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          activeResizer={activeResizer}
        />
      ))}
    </div>
  );
};

export default SchedulerGrid;
