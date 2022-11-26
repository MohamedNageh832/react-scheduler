import { useState } from "react";
import Navbar from "../../components/navbar";
import Scheduler from "../../components/scheduler";
import Sidebar from "../../components/sidebar";
import SchedulerSidebar from "../../components/scheduler/scheduler-sidebar";
import SchedulerHeader from "../../components/scheduler/scheduler-header";
import SchedulerGrid from "../../components/scheduler/scheduler-grid";

const SchedulerPage = () => {
  const [schedulerWeek, setSchedulerWeek] = useState(null);

  const updateScheduler = (array) => {
    setSchedulerWeek(array);
  };

  return (
    <>
      <Navbar />
      <section className="flex">
        <Sidebar updateScheduler={updateScheduler} />
        <Scheduler>
          <SchedulerSidebar />
          <section className="scheduler__body">
            <SchedulerHeader activeWeek={schedulerWeek} />
            <SchedulerGrid />
          </section>
        </Scheduler>
      </section>
    </>
  );
};

export default SchedulerPage;
