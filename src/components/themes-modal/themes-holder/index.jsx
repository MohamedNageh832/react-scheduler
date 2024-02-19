import { useState } from "react";
import { LocalStorage } from "../../../utils/localStorage";
import Theme from "./theme";

const themes = ["light", "dark", "all-white", "indigo"];

const ThemesHolder = () => {
  const localStorage = LocalStorage();
  const currentTheme = localStorage.get("RS-theme-7263");

  const [activeTheme, setActiveTheme] = useState(currentTheme);

  const handleChange = (e) => {
    const { value } = e.target;

    document.body.setAttribute("class", value);

    localStorage.set("RS-theme-7263", value);
    setActiveTheme(value);
  };

  return (
    <section className="themes-holder">
      {themes.map((theme, i) => (
        <Theme
          key={i}
          onChange={handleChange}
          theme={theme}
          checked={activeTheme === theme}
        />
      ))}
    </section>
  );
};

export default ThemesHolder;
