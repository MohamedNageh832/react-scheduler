const colors = [
  "#0D6EFD",
  "#D50000",
  "#E67C73",
  "#33B679",
  "#0B8043",
  "#039BE5",
  "#3F51B5",
  "#7986CB",
  "#8E24AA",
  "#616161",
];

const ChooseColor = ({ values, setValues }) => {
  const handleClick = (color) => {
    setValues({ ...values, color });
  };

  return (
    <section className="edit-task__group">
      <label className="edit-task__label">Choose color</label>
      <section className="edit-task__colors-holder">
        {colors.map((color, i) => (
          <p
            key={i}
            onClick={() => handleClick(color)}
            className={`edit-task__color ${
              values.color === color ? "active" : ""
            }`}
            style={{ backgroundColor: color }}
          ></p>
        ))}
      </section>
    </section>
  );
};

export default ChooseColor;
