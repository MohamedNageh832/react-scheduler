import { useState } from "react";
import useScheduler from "../../../services/context/schedulerContext";
import { getSchedulerHeader, formatDate } from "../../../utils";

const useChooseDate = () => {
  const { changeActiveWeek } = useScheduler();
  const currentDate = new Date();

  const [date, setDate] = useState(formatDate(currentDate));

  const handleChange = (e) => {
    const newHeader = getSchedulerHeader(new Date(e.target.value));
    setDate(e.target.value);
    changeActiveWeek(newHeader);
  };

  const inputProps = {
    value: date,
    onChange: handleChange,
    className: "input form__input--border",
    id: "start-date",
    type: "date",
    label: "First day of the week",
  };

  return { inputProps };
};

export default useChooseDate;
