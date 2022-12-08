import { useState } from "react";
import SidebarLinks from "./sidebar-links";
import SidebarControls from "./sidebar-controls";
import "./style.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "active" : ""}`}>
        <button
          className={`sidebar__toggler ${isOpen ? "active" : ""}`}
          onClick={handleToggle}
        ></button>
        <SidebarLinks setIsOpen={setIsOpen} />
        <SidebarControls />
      </aside>
      {isOpen && <div className="overlay" onClick={handleToggle}></div>}
    </>
  );
};

export default Sidebar;
