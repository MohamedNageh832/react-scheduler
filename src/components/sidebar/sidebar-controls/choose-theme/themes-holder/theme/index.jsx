import { useState } from "react";
import { LocalStorage } from "../../../../../../utils/localStorage";

const Theme = ({ theme }) => {
  const localStorage = LocalStorage();
  const currentTheme = localStorage.get("RS-theme-7263");

  const [activeTheme, setActiveTheme] = useState(currentTheme);

  const handleChange = (e) => {
    const { value } = e.target;

    document.body.setAttribute("class", value);

    localStorage.set("RS-theme-7263", value);
    setActiveTheme(value);
  };

  const inputProps = {
    name: "theme",
    id: theme,
    className: "theme__checkbox",
    type: "radio",
    value: theme,
    checked: activeTheme === theme,
    onChange: handleChange,
  };

  return (
    <div className="theme">
      <section className={`theme__preview theme--${theme}`}>
        <header className="theme__header"></header>
        <span className="theme__sidebar"></span>
        <span className="theme__grid"></span>
      </section>
      <section className="theme__action">
        <input {...inputProps} />
        <label htmlFor={theme}>{theme}</label>
      </section>
    </div>
  );
};

export default Theme;
