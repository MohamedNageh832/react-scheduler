import SchedulerGrid from "./scheduler-grid";
import SchedulerHeader from "./scheduler-header";
import SchedulerSidebar from "./scheduler-sidebar";

const Scheduler = () => {
  return (
    <main className="scheduler">
      <SchedulerSidebar />
      <section className="scheduler__body">
        <SchedulerHeader />
        <SchedulerGrid />
      </section>
    </main>
  );
};

export default Scheduler;
