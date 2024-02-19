import "./style.css";
import useSchedulerEffect from "./useSchedulerEffect";

const Scheduler = ({ children }) => {
  const { schedulerRef } = useSchedulerEffect();

  return (
    <main ref={schedulerRef} className="scheduler sidebar-offset">
      {children}
      <div className="tooltip tooltip--auto-hide fixed-center">
        <h5 className="tooltip__title">Hint</h5>
        <span className="tooltip__text">
          Click to add task or Check about page for more info
        </span>
      </div>
    </main>
  );
};

export default Scheduler;
