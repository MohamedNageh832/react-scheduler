import { LocalStorage } from "../../utils/localStorage";

function getPreferedTheme() {
  const localStorage = LocalStorage();
  const chosenTheme = localStorage.get("RS-theme-7263");
  if (chosenTheme) return chosenTheme;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDark ? "dark" : "light";

  return theme;
}

export { getPreferedTheme };
