import { useState } from "react";
import getSchedulerHeader from "../../../utils/getSchedulerHeader";
import SchedulerColumn from "./scheduler-column";

const SchedulerHeader = ({ activeWeek }) => {
  const headerData = activeWeek ? activeWeek : getSchedulerHeader(new Date());

  return (
    <header className="scheduler__header">
      {headerData.map((item, i) => (
        <SchedulerColumn key={i} data={item} />
      ))}
    </header>
  );
};

export default SchedulerHeader;
