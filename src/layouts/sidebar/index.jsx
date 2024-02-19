import SidebarLinks from "./sidebar-links";
import SidebarControls from "./sidebar-controls";
import Overlay from "../../components/overlay";
import ExpandBtn from "./expand-btn";
import "./style.css";
import useSidebar from "./useSidebar";

const Sidebar = () => {
  const { expandSidebar, toggle } = useSidebar();

  return (
    <>
      <aside className={`sidebar${expandSidebar ? " expand" : ""}`}>
        <SidebarLinks />
        <ExpandBtn onClick={toggle} />
        <SidebarControls />
      </aside>
      {expandSidebar && <Overlay onClick={toggle} transparent />}
    </>
  );
};

export default Sidebar;
