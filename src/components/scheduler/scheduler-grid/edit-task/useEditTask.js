import { useState } from "react";
import useScheduler from "../../../../services/context/schedulerContext";
import { getOffsetInGrid } from "../../../../utils/getOffsetInGrid";

const useEditTask = () => {
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
      Math.floor(
        getOffsetInGrid(values.timeEnd) - getOffsetInGrid(values.timeStart)
      ) - 1;
    const newTask = { ...state.activeEdit, ...values, height };
    const taskIndex = tasks.indexOf(task);

    tasks[taskIndex] = newTask;

    handleUpdateTasks(tasks);
  };

  return { values, setValues, onChange, handleSubmit, handleCancel };
};

export default useEditTask;
