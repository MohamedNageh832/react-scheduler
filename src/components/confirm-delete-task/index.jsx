import useScheduler from "../../services/context/schedulerContext";
import useControls from "../../services/context/controlsContext";
import Overlay from "../overlay";

const ConfirmDeleteTask = () => {
  const { state, closeConfirmDelete } = useControls();
  const { deleteTask } = useScheduler();
  const menuState = state.deleteTask !== null ? " active" : "";

  const handleConfirm = () => {
    deleteTask(state.taskContextMenu);
    closeConfirmDelete();
  };

  const handleCancel = () => closeConfirmDelete();

  return (
    <>
      <div className={`modal${menuState}`}>
        <h3 className="modal__title">Confirm delete task?</h3>
        <p className="modal__text">Are you sure you want to delete this task</p>
        <section className="modal__controls">
          <button className="btn btn--blue" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="btn btn--secondary" onClick={handleCancel}>
            Cancel
          </button>
        </section>
      </div>
      {state.deleteTask !== null && <Overlay onClick={handleCancel} />}
    </>
  );
};

export default ConfirmDeleteTask;
