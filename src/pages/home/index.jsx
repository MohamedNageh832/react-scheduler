import { Outlet } from "react-router-dom";
import { SchedulerProvider } from "../../services/context/schedulerContext";
import useHomeEffect from "./useHomeEffect";

import Navbar from "../../layouts/navbar";
import Sidebar from "../../layouts/sidebar";
import { ControlsProvider } from "../../services/context/controlsContext";
import Controls from "./controls";

const Home = () => {
  useHomeEffect();

  return (
    <SchedulerProvider>
      <ControlsProvider>
        <Navbar />
        <section className="flex">
          <Sidebar />

          <Outlet />
        </section>
        <Controls />
      </ControlsProvider>
    </SchedulerProvider>
  );
};

export default Home;
