import { useEffect, useRef, useState } from "react";
import useScheduler from "../../../../services/context/schedulerContext";
import { LocalStorage } from "../../../../utils/localStorage";

const localStorage = LocalStorage();

const EditTask = () => {
  const { state, handleUpdateTasks } = useScheduler();
  const focusMe = useRef();
  const [name, setName] = useState(state.activeEdit.name);

  useEffect(() => {
    focusMe.current.focus();
  });

  const onChange = (e) => {
    setName(e.target.value);
  };

  const handleCancel = () => {
    handleUpdateTasks(state.tasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tasks = state.tasks;
    const task = state.activeEdit;
    const taskIndex = tasks.indexOf(task);
    task.name = name;
    tasks[taskIndex] = task;

    localStorage.set("tasks7263", tasks);
    handleUpdateTasks(tasks);
  };

  return (
    <>
      <div className="overlay" onClick={handleCancel}></div>
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
            onClick={handleCancel}
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
