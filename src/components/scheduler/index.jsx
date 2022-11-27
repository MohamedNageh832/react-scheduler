import { useEffect } from "react";

const MIN_Y_STEP = 16;

const Scheduler = ({ children }) => {
  useEffect(() => {
    const currentHour = new Date().getHours();
    const scrollY = currentHour * 4 * MIN_Y_STEP;

    window.scrollTo(0, scrollY);
  }, []);

  return <main className="scheduler">{children}</main>;
};

export default Scheduler;
