const SchedulerTask = (props) => {
  const { activeResizer, ...otherProps } = props;

  const startResize = (e) => {
    e.stopPropagation();
    activeResizer.current = e.target;
  };

  return (
    <div className="scheduler__task" {...otherProps}>
      <h4 className="task__name">task</h4>
      <p className="task__time"></p>
      <span className="task__resizer" onMouseDown={startResize}></span>
    </div>
  );
};

export default SchedulerTask;
