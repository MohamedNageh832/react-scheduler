import { useState } from "react";
import SchedulerColumn from "./scheduler-column";

const days = [
  {
    day: "sunday",
    date: 9,
  },
  {
    day: "sunday",
    date: 9,
  },
  {
    day: "sunday",
    date: 9,
  },
  {
    day: "sunday",
    date: 9,
  },
  {
    day: "sunday",
    date: 9,
  },
  {
    day: "sunday",
    date: 9,
  },
];

const SchedulerHeader = () => {
  const [daysVisible, setDaysVisible] = useState(days);

  return (
    <header className="scheduler__header">
      {daysVisible.map((item, i) => (
        <SchedulerColumn key={i} data={item} />
      ))}
    </header>
  );
};

export default SchedulerHeader;
