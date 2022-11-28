import Navbar from "../../components/navbar";
import Scheduler from "../../components/scheduler";
import Sidebar from "../../components/sidebar";
import SchedulerSidebar from "../../components/scheduler/scheduler-sidebar";
import SchedulerHeader from "../../components/scheduler/scheduler-header";
import SchedulerGrid from "../../components/scheduler/scheduler-grid";
import SidebarLinks from "../../components/sidebar/sidebar-links";
import SidebarControls from "../../components/sidebar/sidebar-controls";
import { SchedulerProvider } from "../../services/context/schedulerContext";

const SchedulerPage = () => {
  return (
    <>
      <Navbar />
      <section className="flex">
        <SchedulerProvider>
          <Sidebar>
            <SidebarLinks />
            <SidebarControls />
          </Sidebar>
          <Scheduler>
            <SchedulerSidebar />
            <section className="scheduler__body">
              <SchedulerHeader />
              <SchedulerGrid />
            </section>
          </Scheduler>
        </SchedulerProvider>
      </section>
    </>
  );
};

export default SchedulerPage;
