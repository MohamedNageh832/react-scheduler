const SchedulerColumn = ({ data }) => {
  const currentDate = new Date();
  const active = currentDate === data.date;

  return (
    <span className="scheduler__column">
      <small className="scheduler__day">{data.day}</small>
      <p className={`scheduler__date ${active ? "active" : ""}`}>
        {new Date(data.date).getDate()}
      </p>
    </span>
  );
};

export default SchedulerColumn;
