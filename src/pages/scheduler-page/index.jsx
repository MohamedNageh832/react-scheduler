import Navbar from "../../components/navbar";
import Scheduler from "../../components/scheduler";
import Sidebar from "../../components/sidebar";

const SchedulerPage = () => {
  return (
    <>
      <Navbar />
      <section className="flex">
        <Sidebar />
        <Scheduler />
      </section>
    </>
  );
};

export default SchedulerPage;
