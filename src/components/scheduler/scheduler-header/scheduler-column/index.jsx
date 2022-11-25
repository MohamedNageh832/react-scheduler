const SchedulerColumn = ({ data }) => {
  return (
    <span className="scheduler__column">
      <small className="scheduler__day">{data.day}</small>
      <p className="scheduler__date">{data.date}</p>
    </span>
  );
};

export default SchedulerColumn;
