import { useState } from "react";
import Navbar from "../../components/navbar";
import Scheduler from "../../components/scheduler";
import Sidebar from "../../components/sidebar";
import SchedulerSidebar from "../../components/scheduler/scheduler-sidebar";
import SchedulerHeader from "../../components/scheduler/scheduler-header";
import SchedulerGrid from "../../components/scheduler/scheduler-grid";
import getSchedulerHeader from "../../utils/getSchedulerHeader";
import SidebarLinks from "../../components/sidebar/sidebar-links";
import SidebarControls from "../../components/sidebar/sidebar-controls";

const SchedulerPage = () => {
  const [schedulerWeek, setSchedulerWeek] = useState(
    getSchedulerHeader(new Date())
  );

  return (
    <>
      <Navbar />
      <section className="flex">
        <Sidebar>
          <SidebarLinks />
          <SidebarControls onChange={setSchedulerWeek} />
        </Sidebar>
        <Scheduler>
          <SchedulerSidebar />
          <section className="scheduler__body">
            <SchedulerHeader activeWeek={schedulerWeek} />
            <SchedulerGrid activeWeek={schedulerWeek} />
          </section>
        </Scheduler>
      </section>
    </>
  );
};

export default SchedulerPage;
