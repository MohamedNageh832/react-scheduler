import SidebarLinks from "./sidebar-links";
import SidebarControls from "./sidebar-controls";
import "./style.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <SidebarLinks />
      <SidebarControls />
    </aside>
  );
};

export default Sidebar;
