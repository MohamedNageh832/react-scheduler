import { useEffect, useRef } from "react";

const EnterTask = ({ value, onChange }) => {
  const focusMeRef = useRef();

  useEffect(() => {
    if (!focusMeRef.current || value === "") return;
    focusMeRef.current.focus();

    if (value !== "no title") return;
    focusMeRef.current.select();
  }, [value]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <section className="form__group">
      <label className="modal__title">Enter task</label>
      <input
        ref={focusMeRef}
        className="form__input"
        name="name"
        value={value}
        onChange={handleChange}
        type="text"
      />
    </section>
  );
};

export default EnterTask;
