import { useCallback } from "react";
import { Home, InfoOutlined, TaskAlt } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const links = [
  { path: "/", text: "Home", icon: <Home className="link__icon" /> },
  {
    path: "/todo",
    text: "To Do",
    icon: <TaskAlt className="link__icon" />,
    disabled: true,
  },
  {
    path: "/about",
    text: "About",
    icon: <InfoOutlined className="link__icon" />,
  },
];

const SidebarLinks = () => {
  const renderLinks = useCallback((link, i) => {
    if (link.disabled) {
      return (
        <div key={i} to={link.path} className="sidebar__link disabled">
          {link.icon}
          <span className="link__text">{link.text}</span>
        </div>
      );
    }

    return (
      <NavLink key={i} to={link.path} className="sidebar__link">
        {link.icon}
        <span className="link__text">{link.text}</span>
      </NavLink>
    );
  });

  return <>{links.map(renderLinks)}</>;
};

export default SidebarLinks;
