import { useEffect, useState } from "react";

const useSidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);

  const toggle = (e) => {
    e.stopPropagation();
    setExpandSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (!expandSidebar) return;

    const collapseSidebar = (e) => {
      if (!e.target.classList.contains("sidebar")) toggle(e);
    };

    window.addEventListener("click", collapseSidebar);
    return () => window.removeEventListener("click", collapseSidebar);
  }, [expandSidebar]);

  return { expandSidebar, toggle };
};

export default useSidebar;
