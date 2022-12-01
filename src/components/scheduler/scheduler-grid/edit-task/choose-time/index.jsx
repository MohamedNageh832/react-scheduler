const ChooseTime = ({ values, setValues }) => {
  const { timeStart, timeEnd } = values;

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="form-group">
      <label htmlFor="timeStart">Task time</label>
      <section className="form-group form-group--inline">
        <input
          name="timeStart"
          id="timeStart"
          type="time"
          value={timeStart}
          onChange={onChange}
        />
        <span className="horizontal-rule"></span>
        <input name="timeEnd" value={timeEnd} onChange={onChange} type="time" />
      </section>
    </section>
  );
};

export default ChooseTime;
