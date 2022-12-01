import { NavLink } from "react-router-dom";

const SidebarLinks = () => {
  return (
    <>
      <NavLink className="sidebar__link" to="/">
        Home
      </NavLink>
      <NavLink className="sidebar__link" to="/about">
        About
      </NavLink>
    </>
  );
};

export default SidebarLinks;
