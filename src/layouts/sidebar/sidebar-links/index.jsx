import { NavLink } from "react-router-dom";

const links = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
];

const SidebarLinks = () => {
  return links.map((link, i) => (
    <NavLink key={i} to={link.path} className="sidebar__link">
      {link.text}
    </NavLink>
  ));
};

export default SidebarLinks;
