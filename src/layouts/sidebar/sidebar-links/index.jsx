import { NavLink } from "react-router-dom";

const links = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
];

const SidebarLinks = ({ setIsOpen }) => {
  const handleClick = () => setIsOpen(false);

  return links.map((link, i) => (
    <NavLink
      key={i}
      onClick={handleClick}
      to={link.path}
      className="sidebar__link"
    >
      {link.text}
    </NavLink>
  ));
};

export default SidebarLinks;
