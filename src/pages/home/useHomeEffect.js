import { useEffect } from "react";
import { LocalStorage } from "../../utils/localStorage";
import { getPreferedTheme } from "./getPreferedTheme";

const useHomeEffect = () => {
  const localStorage = LocalStorage();

  useEffect(() => {
    const theme = getPreferedTheme();

    localStorage.set("RS-theme-7263", theme);
    document.body.classList.add(theme);
  }, []);
};

export default useHomeEffect;
