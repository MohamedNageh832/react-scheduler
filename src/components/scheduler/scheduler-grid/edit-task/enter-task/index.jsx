import { useEffect, useRef } from "react";

const EnterTask = ({ value, onChange }) => {
  const focusMeRef = useRef();

  useEffect(() => {
    if (!focusMeRef.current) return;
    focusMeRef.current.focus();

    if (value !== "no title") return;
    focusMeRef.current.select();
  }, [focusMeRef.current]);

  return (
    <section className="form-group">
      <label className="modal__title">Enter task</label>
      <input
        ref={focusMeRef}
        name="name"
        value={value}
        onChange={onChange}
        className="input"
        type="text"
      />
    </section>
  );
};

export default EnterTask;
