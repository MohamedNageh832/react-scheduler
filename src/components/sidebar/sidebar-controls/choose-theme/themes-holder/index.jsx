import Theme from "./theme";

const themes = ["light", "dark", "all-white", "indigo"];

const ThemesHolder = () => {
  return (
    <section className="themes-holder">
      {themes.map((theme, i) => (
        <Theme theme={theme} />
      ))}
    </section>
  );
};

export default ThemesHolder;
