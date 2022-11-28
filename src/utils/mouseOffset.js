const mouseOffsetX = (e, parent) => {
  const windowOffsetX = window.scrollX + e.clientX;

  if (parent) {
    const { left } = parent.getBoundingClientRect();
    const mouseParentOffsetX = windowOffsetX - left;
    return mouseParentOffsetX;
  } else return windowOffsetX;
};

const mouseOffsetY = (e, parent) => {
  const windowOffsetY = window.scrollY + e.clientY;

  if (parent) {
    const mouseParentOffsetY = windowOffsetY - parent.offsetTop;
    return mouseParentOffsetY;
  } else return windowOffsetY;
};

export { mouseOffsetX, mouseOffsetY };
