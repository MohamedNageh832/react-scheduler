import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import useControls from "../../services/context/controlsContext";
import useScheduler from "../../services/context/schedulerContext";
import Overlay from "../overlay";

const TaskContextMenu = () => {
  const { state, editTask } = useScheduler();
  const {
    state: controlsState,
    closeTaskContextMenu,
    confirmDeleteTask,
  } = useControls();
  const taskId = controlsState.taskContextMenu;
  const menuState = taskId !== null ? " active" : "";

  const handleEdit = () => {
    const task = state.tasks[taskId];

    editTask(task);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.classList.contains("task-context-menu"))
        closeTaskContextMenu(e);
    };

    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const handleDelete = () => confirmDeleteTask(taskId);

  return (
    <>
      <section className={`modal task-context-menu${menuState}`}>
        <button className="task__btn" onMouseDown={handleEdit}>
          <EditOutlined />
          Edit
        </button>
        <button className="task__btn" onMouseDown={handleDelete}>
          <DeleteOutline />
          Delete
        </button>
      </section>
      {taskId !== null && (
        <Overlay onClick={closeTaskContextMenu} transparent />
      )}
    </>
  );
};

export default TaskContextMenu;
