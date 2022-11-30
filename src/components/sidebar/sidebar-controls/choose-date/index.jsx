import { useState } from "react";
import useScheduler from "../../../../services/context/schedulerContext";
import { formatDate } from "../../../../utils/formatDate";
import getSchedulerHeader from "../../../../utils/getSchedulerHeader";

const ChooseDate = () => {
  const { changeActiveWeek } = useScheduler();
  const currentDate = new Date();

  const [date, setDate] = useState(formatDate(currentDate));

  const handleChange = (e) => {
    const newHeader = getSchedulerHeader(new Date(e.target.value));
    setDate(e.target.value);
    changeActiveWeek(newHeader);
  };

  return (
    <section className="controls__item" data-category="Controls">
      <label className="sidebar__label" htmlFor="start-date">
        start from
      </label>
      <input
        value={date}
        onChange={handleChange}
        className="input"
        id="start-date"
        type="date"
      />
    </section>
  );
};

export default ChooseDate;
