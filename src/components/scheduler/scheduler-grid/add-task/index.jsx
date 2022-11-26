const AddTask = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="scheduler__popup">
      <label className="fs-4">Enter task</label>
      <input className="scheduler__input" type="text" />
      <p className="scheduler__task-time"></p>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddTask;
