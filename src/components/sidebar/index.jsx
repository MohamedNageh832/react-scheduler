import { useEffect } from "react";
import { LocalStorage } from "../../utils/localStorage";

const Sidebar = ({ children }) => {
  const localStorage = LocalStorage();

  useEffect(() => {
    const chosenTheme = localStorage.get("RS-theme-7263");
    if (chosenTheme) return;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme = prefersDark ? "dark" : "light";

    localStorage.set("RS-theme-7263", theme);
  }, []);

  return <aside className="sidebar">{children}</aside>;
};

export default Sidebar;
