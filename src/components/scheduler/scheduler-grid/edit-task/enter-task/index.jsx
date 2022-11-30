import { useEffect, useRef } from "react";

const EnterTask = ({ value, onChange }) => {
  const focusMeRef = useRef();
  const name = value === "no title" ? "" : value;

  useEffect(() => {
    if (!focusMeRef.current) return;
    focusMeRef.current.focus();
  }, [focusMeRef.current]);

  return (
    <section className="form-group">
      <label className="modal__title">Enter task</label>
      <input
        ref={focusMeRef}
        name="name"
        value={name}
        onChange={onChange}
        className="input"
        type="text"
      />
    </section>
  );
};

export default EnterTask;
