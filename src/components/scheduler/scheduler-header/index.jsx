import SchedulerColumn from "./scheduler-column";

const SchedulerHeader = ({ activeWeek }) => {
  return (
    <header className="scheduler__header">
      {activeWeek.map((item, i) => (
        <SchedulerColumn key={i} data={item} />
      ))}
    </header>
  );
};

export default SchedulerHeader;
