import { Palette } from "@mui/icons-material";
import useControls from "../../../../services/context/controlsContext";

const ChooseTheme = () => {
  const { openEditTheme } = useControls();

  return (
    <section className="controls__item" data-category="Settings">
      <button className="sidebar__label" onClick={openEditTheme}>
        <Palette />
        Theme
      </button>
    </section>
  );
};

export default ChooseTheme;
