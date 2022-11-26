const SchedulerTask = (props) => {
  const { activeResizer, task, ...otherProps } = props || {};

  const startResize = (e) => {
    e.stopPropagation();
    activeResizer.current = e.target;
  };

  return (
    <div
      className="scheduler__task"
      style={{ left: task.left, top: task.top }}
      {...otherProps}
    >
      <h4 className="task__name">{task.name}</h4>
      <p className="task__time">{task.time}</p>
      <span className="task__resizer" onMouseDown={startResize}></span>
    </div>
  );
};

export default SchedulerTask;
