import useScheduler from "../../../../../services/context/schedulerContext";

const Confirm = ({ setControls, index }) => {
  const { deleteTask } = useScheduler();

  const handleConfirm = () => {
    setControls((prev) => ({ ...prev, confirm: false }));
    deleteTask(index);
  };

  const handleCancel = () => {
    setControls((prev) => ({ ...prev, confirm: false }));
  };

  return (
    <>
      <div className="modal">
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
      <div className="overlay"></div>
    </>
  );
};

export default Confirm;
