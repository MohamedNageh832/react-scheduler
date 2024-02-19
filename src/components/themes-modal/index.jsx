import { Close } from "@mui/icons-material";
import useControls from "../../services/context/controlsContext";
import Overlay from "../overlay";
import ThemesHolder from "./themes-holder";

const ThemesModal = () => {
  const { state, closeEditTheme } = useControls();
  const menuState = state.editTheme ? " active" : "";

  return (
    <>
      <section className={`modal edit-theme${menuState}`}>
        <button className="modal__close" onClick={closeEditTheme}>
          <Close />
        </button>
        <h3 className="modal__title">Choose theme</h3>
        <ThemesHolder />
      </section>
      {state.editTheme && <Overlay onClick={closeEditTheme} />}
    </>
  );
};

export default ThemesModal;
