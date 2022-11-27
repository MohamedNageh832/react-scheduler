const mouseOffsetX = (e, parent) => {
  const windowOffsetX = window.scrollX + e.clientX;
  const mouseParentOffsetX = windowOffsetX - parent.offsetLeft;

  if (parent) return mouseParentOffsetX;
  else return windowOffsetX;
};

const mouseOffsetY = (e, parent) => {
  const windowOffsetY = window.scrollY + e.clientY;

  if (parent) {
    const mouseParentOffsetY = windowOffsetY - parent.offsetTop;
    return mouseParentOffsetY;
  } else return windowOffsetY;
};

export { mouseOffsetX, mouseOffsetY };
