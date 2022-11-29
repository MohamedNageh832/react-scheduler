import useScheduler from "../../../services/context/schedulerContext";
import SchedulerTask from "./scheduler-task";

const SchedulerTasks = () => {
  const { state } = useScheduler();

  return (
    <>
      {state.tasks.map((task, i) => (
        <SchedulerTask key={i} index={i} task={task} />
      ))}
    </>
  );
};

export default SchedulerTasks;
