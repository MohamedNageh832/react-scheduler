import React from "react";
import useSchedulerTask from "./useSchedulerTask";

const SchedulerTask = ({ task, index }) => {
  const { taskProps, startResize, time } = useSchedulerTask(task, index);

  return (
    <>
      <div {...taskProps}>
        <h4 className="task__name">{task.name}</h4>
        <span className="task__time">{time}</span>
        <span className="task__resizer" onMouseDown={startResize}></span>
      </div>
    </>
  );
};

export default React.memo(SchedulerTask);
