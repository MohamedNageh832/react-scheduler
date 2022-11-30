import ChooseDate from "./choose-date";
import ChooseTheme from "./choose-theme";

const SidebarControls = () => {
  return (
    <section className="sidebar__controls">
      <ChooseDate />
      <ChooseTheme />
    </section>
  );
};

export default SidebarControls;
