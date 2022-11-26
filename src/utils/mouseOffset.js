const mouseOffsetX = (e, parent) => {
  const windowOffsetX = window.scrollX + e.clientX;
  const mouseParentOffsetX = windowOffsetX - parent.offsetLeft;

  if (parent) return mouseParentOffsetX;
  else return windowOffsetX;
};

const mouseOffsetY = (e, parent) => {
  const windowOffsetY = window.scrollY + e.clientY;
  const mouseParentOffsetY = windowOffsetY - parent.offsetTop;

  if (parent) return mouseParentOffsetY;
  else return windowOffsetY;
};

export { mouseOffsetX, mouseOffsetY };
