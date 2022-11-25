const SchedulerSidebar = () => {
  return (
    <ul className="scheduler__sidebar">
      <li className="scheduler__time"></li>

      {[...Array(11)].map((_, i) => (
        <li className="scheduler__time" key={i}>
          {i + 1} am
        </li>
      ))}

      <li className="scheduler__time">12 pm</li>

      {[...Array(11)].map((_, i) => (
        <li className="scheduler__time" key={i}>
          {i + 1} pm
        </li>
      ))}
    </ul>
  );
};

export default SchedulerSidebar;
