import EditTask from "./edit-task";
import SchedulerTasks from "../scheduler-tasks";
import useSchedulerGrid from "./useSchedulerGrid";

const SchedulerGrid = () => {
  const { state, schedulerGridRef } = useSchedulerGrid();

  return (
    <div
      ref={schedulerGridRef}
      className="scheduler__grid"
      onContextMenu={(e) => e.preventDefault()}
    >
      <SchedulerTasks />
      {state.activeEdit && <EditTask />}
    </div>
  );
};

export default SchedulerGrid;
