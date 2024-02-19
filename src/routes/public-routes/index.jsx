import Home from "../../pages/home";
import SchedulerPage from "../../pages/scheduler-page";
import AboutPage from "../../pages/about-page";
import { Navigate, Route, Routes } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<SchedulerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
