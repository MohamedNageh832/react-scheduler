import { useEffect, useMemo, useState } from "react";
import useScheduler from "../../services/context/schedulerContext";
import { getOffsetInGrid } from "../../utils/getOffsetInGrid";
// import useControls from "../../services/context/controlsContext";

const intialStates = { name: "", color: "", timeStart: "", timeEnd: "" };

const useEditTask = () => {
  const { state, handleUpdateTasks, deleteTask } = useScheduler();
  const taskToEdit = state.activeEdit;
  const [values, setValues] = useState(intialStates);

  useEffect(() => {
    if (state.activeEdit) setValues(state.activeEdit);
    else setValues(intialStates);
  }, [state.activeEdit]);

  const onChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    if (state.creatingTask) deleteTask(state.tasks.length - 1);
    else handleUpdateTasks(state.tasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.name === "") values.name = "no title";

    const tasks = state.tasks;
    const task = state.activeEdit;
    const height = Math.abs(
      Math.floor(
        getOffsetInGrid(values.timeEnd) - getOffsetInGrid(values.timeStart)
      ) - 1
    );

    const newTask = { ...state.activeEdit, ...values, height };
    const taskIndex = tasks.indexOf(task);

    tasks[taskIndex] = newTask;

    handleUpdateTasks(tasks);
  };

  return {
    taskToEdit,
    values,
    onChange,
    handleSubmit,
    handleCancel,
  };
};

export default useEditTask;
