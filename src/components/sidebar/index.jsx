import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavLink className="sidebar__link" to="/">
        Home
      </NavLink>
      <NavLink className="sidebar__link" to="/about-us">
        About us
      </NavLink>
    </aside>
  );
};

export default Sidebar;
