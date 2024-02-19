const ChooseTime = ({ values, onChange }) => {
  const { timeStart, timeEnd } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <section className="form-group">
      <label htmlFor="timeStart">Task time</label>
      <section className="form-group form-group--inline">
        <input
          name="timeStart"
          id="timeStart"
          type="time"
          className="form__input--border"
          value={timeStart}
          onChange={handleChange}
        />
        <span className="horizontal-rule"></span>
        <input
          name="timeEnd"
          value={timeEnd}
          onChange={handleChange}
          type="time"
          className="form__input--border"
        />
      </section>
    </section>
  );
};

export default ChooseTime;
