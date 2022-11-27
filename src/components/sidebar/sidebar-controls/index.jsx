import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import getSchedulerHeader from "../../../utils/getSchedulerHeader";

const SidebarControls = ({ onChange }) => {
  const currentDate = new Date();

  const [date, setDate] = useState(formatDate(currentDate));

  const handleChange = (e) => {
    const newHeader = getSchedulerHeader(new Date(e.target.value));
    setDate(e.target.value);
    onChange(newHeader);
  };

  return (
    <section className="sidebar__controls">
      <section>
        <label className="sidebar__label" htmlFor="start-date">
          start from
        </label>
        <input
          value={date}
          onChange={handleChange}
          id="start-date"
          type="date"
        />
      </section>
    </section>
  );
};

export default SidebarControls;
