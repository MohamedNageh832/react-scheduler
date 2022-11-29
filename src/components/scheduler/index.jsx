import { useEffect } from "react";
import useScheduler from "../../services/context/schedulerContext";

const MIN_Y_STEP = 16;

const Scheduler = ({ children }) => {
  const { state, handleResizing, handleDragging, handleMouseUp } =
    useScheduler();

  useEffect(() => {
    const currentHour = new Date().getHours();
    const scrollY = currentHour * 4 * MIN_Y_STEP;

    window.scrollTo(0, scrollY);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      e.preventDefault();

      if (state.resizerIndex !== -1) handleResizing(e);
      else if (state.currentDraggedIdx !== -1) handleDragging(e);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [state]);

  return <main className="scheduler">{children}</main>;
};

export default Scheduler;
