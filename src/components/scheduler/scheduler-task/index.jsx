import {
  MIN_X_STEP,
  MIN_Y_STEP,
} from "../../../services/constants/schedulerConstants";
import { compareDates } from "../../../utils/compareDates";

const SchedulerTask = (props) => {
  const { onResize, task, activeWeek, index, ...otherProps } = props || {};

  task.left = -MIN_X_STEP;

  const correspondingDate = activeWeek.filter((el) =>
    compareDates(el.date, task.date)
  )[0];

  const horizontalStep = activeWeek.indexOf(correspondingDate);
  task.left = horizontalStep * MIN_X_STEP;

  const startResize = (e) => {
    e.stopPropagation();
    onResize(e, index);
  };

  return (
    <div
      className="scheduler__task"
      style={{
        left: `${task.left}px`,
        top: `${task.top}px`,
        height: `${task.heightSpan * MIN_Y_STEP - 2}px`,
      }}
      {...otherProps}
    >
      <h4 className="task__name">{task.name}</h4>
      <span className="task__time">{task.time}</span>
      <span className="task__resizer" onMouseDown={startResize}></span>
    </div>
  );
};

export default SchedulerTask;
