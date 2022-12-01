import { useState } from "react";
import useScheduler from "../../../../services/context/schedulerContext";
import { getOffsetInGrid } from "../../../../utils/getOffsetInGrid";
import ChooseColor from "./choose-color";
import ChooseTime from "./choose-time";
import Controls from "./controls";
import EnterTask from "./enter-task";

const EditTask = () => {
  const { state, handleUpdateTasks, deleteTask } = useScheduler();
  const currentTask = state.activeEdit;
  const [values, setValues] = useState({
    name: currentTask.name,
    color: "blue",
    timeStart: currentTask.timeStart,
    timeEnd: currentTask.timeEnd,
  });

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    if (state.creatingTask) deleteTask(state.tasks.length - 1);
    else handleUpdateTasks(state.tasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tasks = state.tasks;
    const task = state.activeEdit;
    const height =
      getOffsetInGrid(values.timeEnd) - getOffsetInGrid(values.timeStart);
    const newTask = { ...state.activeEdit, ...values, height };
    const taskIndex = tasks.indexOf(task);

    tasks[taskIndex] = newTask;

    handleUpdateTasks(tasks);
  };

  return (
    <>
      <div className="overlay" onClick={handleCancel}></div>
      <form onSubmit={handleSubmit} className="modal">
        <EnterTask value={values.name} onChange={onChange} />
        <ChooseTime values={values} setValues={setValues} />
        <ChooseColor values={values} setValues={setValues} />
        <Controls handleCancel={handleCancel} />
      </form>
    </>
  );
};

export default EditTask;
