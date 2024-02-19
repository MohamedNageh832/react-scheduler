import useChooseDate from "./useChooseDate";
import ChooseTheme from "./choose-theme";
import FormInput from "../../../components/form/form-input";

const SidebarControls = () => {
  const { inputProps } = useChooseDate();

  return (
    <section className="sidebar__controls">
      <section className="controls__item" data-category="Controls">
        <FormInput {...inputProps} />
      </section>
      <ChooseTheme />
    </section>
  );
};

export default SidebarControls;
