import { useState } from "react";
import useScheduler from "../../../../services/context/schedulerContext";
import { LocalStorage } from "../../../../utils/localStorage";
import ChooseColor from "./choose-color";
import Controls from "./controls";
import EnterTask from "./enter-task";

const localStorage = LocalStorage();

const EditTask = () => {
  const { state, handleUpdateTasks, cancelCreateTask } = useScheduler();
  const [values, setValues] = useState({
    name: state.activeEdit.name,
    color: "#0D6EFD",
  });

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    if (state.creatingTask) cancelCreateTask();
    else handleUpdateTasks(state.tasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tasks = state.tasks;
    const task = state.activeEdit;
    const taskIndex = tasks.indexOf(task);
    task.name = values.name;
    task.color = values.color;

    tasks[taskIndex] = task;

    localStorage.set("tasks7263", tasks);
    handleUpdateTasks(tasks);
  };

  return (
    <>
      <div className="overlay" onClick={handleCancel}></div>
      <form onSubmit={handleSubmit} className="scheduler__edit-task">
        <EnterTask value={values.name} onChange={onChange} />
        <ChooseColor values={values} setValues={setValues} />
        <p className="scheduler__task-time"></p>
        <Controls handleCancel={handleCancel} />
      </form>
    </>
  );
};

export default EditTask;
