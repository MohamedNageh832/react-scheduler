import PublicRoutes from "./public-routes";
import NotFound from "../pages/404-page";
import { Route, Routes } from "react-router-dom";

const RenderRoutes = () => {
  return (
    <Routes>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
};

export default RenderRoutes;
