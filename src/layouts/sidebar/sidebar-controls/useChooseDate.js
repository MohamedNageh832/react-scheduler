import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import useScheduler from "../../../services/context/schedulerContext";
import getSchedulerHeader from "../../../utils/getSchedulerHeader";

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
    className: "input",
    id: "start-date",
    type: "date",
  };

  return { inputProps };
};

export default useChooseDate;
