import SchedulerTasks from "../scheduler-tasks";
import useSchedulerGrid from "./useSchedulerGrid";
import { useMemo } from "react";

const SchedulerGrid = () => {
  const { gridProps } = useSchedulerGrid();

  const tasks = useMemo(() => <SchedulerTasks />, []);

  return <div {...gridProps}>{tasks}</div>;
};

export default SchedulerGrid;
