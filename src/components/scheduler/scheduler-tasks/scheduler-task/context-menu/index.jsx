import useScheduler from "../../../../../services/context/schedulerContext";

const ContextMenu = ({ setControls, index }) => {
  const { state, editTask } = useScheduler();

  const handleEdit = () => {
    const task = state.tasks[index];
    editTask(task);
  };
  const handleDelete = () =>
    setControls((prev) => ({ ...prev, confirm: true }));

  return (
    <section className="task__context-menu">
      <button className="task__btn" onMouseDown={handleEdit}>
        Edit
      </button>
      <button className="task__btn" onMouseDown={handleDelete}>
        Delete
      </button>
    </section>
  );
};

export default ContextMenu;
