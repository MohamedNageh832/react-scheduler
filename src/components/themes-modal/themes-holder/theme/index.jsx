const Theme = ({ theme, onChange, checked }) => {
  const inputProps = {
    name: "theme",
    id: theme,
    className: "theme__checkbox",
    type: "radio",
    value: theme,
    checked,
    onChange: onChange,
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
