import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404-page";
import SchedulerPage from "./pages/scheduler-page";
import { LocalStorage } from "./utils/localStorage";

function App() {
  const localStorage = LocalStorage();

  useEffect(() => {
    const theme = localStorage.get("RS-theme-7263");

    document.body.classList.add(theme);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SchedulerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
