import Confirm from "./confirm";
import ContextMenu from "./context-menu";
import useSchedulerTask from "./useSchedulerTask";

const SchedulerTask = ({ task, index }) => {
  const { taskProps, controls, setControls, startResize, time } =
    useSchedulerTask(task, index);

  return (
    <>
      <div {...taskProps}>
        <h4 className="task__name">{task.name}</h4>
        <span className="task__time">{time}</span>
        <span className="task__resizer" onMouseDown={startResize}></span>
        {controls.openContextMenu && (
          <ContextMenu setControls={setControls} index={index} />
        )}
      </div>
      {controls.confirm && <Confirm setControls={setControls} index={index} />}
      {controls.openContextMenu && (
        <div className="overlay overlay--transparent"></div>
      )}
    </>
  );
};

export default SchedulerTask;
