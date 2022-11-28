import { useEffect, useRef } from "react";

const EnterTask = ({ value, onChange }) => {
  const focusMeRef = useRef();

  useEffect(() => {
    if (!focusMeRef.current) return;
    focusMeRef.current.focus();
  }, [focusMeRef.current]);

  return (
    <section className="edit-task__group">
      <label className="edit-task__title">Enter task</label>
      <input
        ref={focusMeRef}
        name="name"
        value={value}
        onChange={onChange}
        className="scheduler__input"
        type="text"
      />
    </section>
  );
};

export default EnterTask;
