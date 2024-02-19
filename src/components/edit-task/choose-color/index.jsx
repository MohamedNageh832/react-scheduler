const colors = [
  "blue",
  "red",
  "light-red",
  "green",
  "dark-green",
  "light-blue",
  "dark-blue",
  "light-purple",
  "purple",
  "dark",
];

const ChooseColor = ({ values, onChange }) => {
  const handleClick = (color) => {
    onChange("color", color);
  };

  return (
    <section className="form-group">
      <label className="label">Choose color</label>
      <section className="edit-task__colors-holder">
        {colors.map((color, i) => (
          <p
            key={i}
            onClick={() => handleClick(color)}
            className={`edit-task__color ${
              values.color === color ? "active" : ""
            }`}
            style={{ backgroundColor: `var(--${color})` }}
          ></p>
        ))}
      </section>
    </section>
  );
};

export default ChooseColor;
