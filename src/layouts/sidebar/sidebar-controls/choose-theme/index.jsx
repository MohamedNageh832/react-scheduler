import { useState } from "react";
import ThemesHolder from "./themes-holder";

const ChooseTheme = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section className="controls__item" data-category="Settings">
      <button className="sidebar__label" onClick={handleOpen}>
        Theme
      </button>
      {isOpen && (
        <>
          <section className="modal edit-theme">
            <button className="modal__close" onClick={handleClose}>
              +
            </button>
            <h3 className="modal__title">Choose theme</h3>
            <ThemesHolder />
          </section>
          <div className="overlay" onClick={handleClose}></div>
        </>
      )}
    </section>
  );
};

export default ChooseTheme;
