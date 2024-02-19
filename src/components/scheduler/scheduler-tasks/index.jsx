import { useCallback } from "react";
import useScheduler from "../../../services/context/schedulerContext";
import SchedulerTask from "./scheduler-task";

const SchedulerTasks = () => {
  const { state } = useScheduler();
  const renderTask = useCallback(
    (task, i) => <SchedulerTask key={i} index={i} task={task} />,
    []
  );

  return <>{state.tasks.map((task, i) => renderTask(task, i))}</>;
};

export default SchedulerTasks;
