import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404-page";
import SchedulerPage from "./pages/scheduler-page";

function App() {
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
