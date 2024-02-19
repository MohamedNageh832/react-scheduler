import Scheduler from "../../components/scheduler";
import SchedulerSidebar from "../../components/scheduler/scheduler-sidebar";
import SchedulerHeader from "../../components/scheduler/scheduler-header";
import SchedulerGrid from "../../components/scheduler/scheduler-grid";
const SchedulerPage = () => {
  return (
    <>
      <Scheduler>
        <SchedulerSidebar />
        <section className="scheduler__body">
          <SchedulerHeader />
          <SchedulerGrid />
        </section>
      </Scheduler>
    </>
  );
};

export default SchedulerPage;
