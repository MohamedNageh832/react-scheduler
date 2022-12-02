import { Outlet } from "react-router-dom";
import { SchedulerProvider } from "../../services/context/schedulerContext";
import useHomeEffect from "./useHomeEffect";

import Navbar from "../../layouts/navbar";
import Sidebar from "../../layouts/sidebar";

const Home = () => {
  useHomeEffect();

  return (
    <SchedulerProvider>
      <Navbar />
      <section className="flex">
        <Sidebar />

        <Outlet />
      </section>
    </SchedulerProvider>
  );
};

export default Home;
