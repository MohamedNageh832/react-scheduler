const SchedulerTask = (props) => {
  const { activeResizer, task, index, ...otherProps } = props || {};

  const startResize = (e) => {
    e.stopPropagation();
    activeResizer.current = index;
  };

  return (
    <div
      className="scheduler__task"
      style={{
        left: `${task.left}px`,
        top: `${task.top}px`,
        height: `${task.heightSpan * 16 - 2}px`,
      }}
      {...otherProps}
    >
      <h4 className="task__name">{task.name}</h4>
      <p className="task__time">{task.time}</p>
      <span className="task__resizer" onMouseDown={startResize}></span>
    </div>
  );
};

export default SchedulerTask;
