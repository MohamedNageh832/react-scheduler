import { useState } from "react";
import ThemesHolder from "./themes-holder";

const ChooseTheme = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <section className="controls__item" data-category="Settings">
      <button className="sidebar__label" onClick={handleClick}>
        Theme
      </button>
      {isOpen && (
        <>
          <form className="modal edit-theme">
            <h3 className="modal__title">Edit theme</h3>
            <ThemesHolder />
          </form>
          <div className="overlay"></div>
        </>
      )}
    </section>
  );
};

export default ChooseTheme;
