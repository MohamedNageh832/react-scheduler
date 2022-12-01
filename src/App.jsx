import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import SidebarControls from "./components/sidebar/sidebar-controls";
import SidebarLinks from "./components/sidebar/sidebar-links";
import NotFound from "./pages/404-page";
import AboutPage from "./pages/about-page";
import SchedulerPage from "./pages/scheduler-page";
import { SchedulerProvider } from "./services/context/schedulerContext";
import { LocalStorage } from "./utils/localStorage";

function App() {
  const localStorage = LocalStorage();

  useEffect(() => {
    const theme = localStorage.get("RS-theme-7263");

    document.body.classList.add(theme);
  }, []);

  return (
    <div className="App">
      <SchedulerProvider>
        <Navbar />
        <section className="flex">
          <Sidebar>
            <SidebarLinks />
            <SidebarControls />
          </Sidebar>
          <Routes>
            <Route path="/" element={<SchedulerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </SchedulerProvider>
    </div>
  );
}

export default App;
