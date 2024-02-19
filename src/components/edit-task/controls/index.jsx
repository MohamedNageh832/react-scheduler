const Controls = ({ handleCancel }) => {
  return (
    <section className="modal__controls">
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
  );
};

export default Controls;
