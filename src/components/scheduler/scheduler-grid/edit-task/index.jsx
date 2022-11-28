import { useEffect, useRef, useState } from "react";

const EditTask = ({ onSubmit, onCancel }) => {
  const focusMe = useRef();
  const [name, setName] = useState("");

  useEffect(() => {
    focusMe.current.focus();
  });

  const onChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ name });
  };

  return (
    <>
      <div className="overlay"></div>
      <form onSubmit={handleSubmit} className="scheduler__popup">
        <label className="scheduler__label">Enter task</label>
        <input
          ref={focusMe}
          value={name}
          onChange={onChange}
          className="scheduler__input"
          type="text"
        />
        <p className="scheduler__task-time"></p>
        <section className="popup__controls">
          <button className="btn btn--blue" type="submit">
            Save
          </button>
          <button
            onClick={onCancel}
            className="btn btn--secondary"
            type="button"
          >
            Cancel
          </button>
        </section>
      </form>
    </>
  );
};

export default EditTask;
