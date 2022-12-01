import { useEffect, useRef } from "react";
import { ONE_HOUR_IN_GRID } from "../../services/constants/schedulerConstants";
import useScheduler from "../../services/context/schedulerContext";

const Scheduler = ({ children }) => {
  const schedulerRef = useRef();
  const { state, handleResizing, handleDragging, handleMouseUp } =
    useScheduler();

  useEffect(() => {
    const currentHour = new Date().getHours();
    const scrollY = currentHour * ONE_HOUR_IN_GRID;

    schedulerRef.current.scrollTo(0, scrollY);
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

  return (
    <main ref={schedulerRef} className="scheduler">
      {children}
    </main>
  );
};

export default Scheduler;
