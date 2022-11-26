import { NavLink } from "react-router-dom";
import SidebarControls from "./sidebar-controls";

const Sidebar = ({ updateScheduler }) => {
  return (
    <aside className="sidebar">
      <NavLink className="sidebar__link" to="/">
        Home
      </NavLink>
      <NavLink className="sidebar__link" to="/about-us">
        About us
      </NavLink>
      <SidebarControls onWeekChange={updateScheduler} />
    </aside>
  );
};

export default Sidebar;
