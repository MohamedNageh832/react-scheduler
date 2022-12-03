import getCurrentTime from "./getCurrentTime";

const SchedulerSidebar = () => {
  const { currentHour, pmTime, current24Hour } = getCurrentTime();

  return (
    <ul className="scheduler__sidebar">
      <li
        className={`scheduler__time ${
          !pmTime && currentHour === 0 ? "active" : ""
        }`}
      ></li>

      {[...Array(11)].map((_, i) => (
        <li
          className={`scheduler__time ${
            i + 1 === current24Hour ? "active" : ""
          }`}
          key={i}
        >
          {i + 1} am
        </li>
      ))}

      <li
        className={`scheduler__time ${
          pmTime && currentHour === 12 ? "active" : ""
        }`}
      >
        12 pm
      </li>

      {[...Array(11)].map((_, i) => (
        <li
          className={`scheduler__time ${
            pmTime && currentHour === i + 1 ? "active" : ""
          }`}
          key={i}
        >
          {i + 1} pm
        </li>
      ))}
    </ul>
  );
};

export default SchedulerSidebar;
