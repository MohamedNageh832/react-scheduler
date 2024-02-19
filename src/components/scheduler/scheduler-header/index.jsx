import useScheduler from "../../../services/context/schedulerContext";
import SchedulerColumn from "./scheduler-column";

const SchedulerHeader = () => {
  const { state } = useScheduler();

  return (
    <header className="scheduler__header">
      {state.activeWeek.map((item, i) => (
        <SchedulerColumn key={i} data={item} />
      ))}
    </header>
  );
};

export default SchedulerHeader;
