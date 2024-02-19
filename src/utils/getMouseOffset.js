const getMouseOffset = (e, parent) => {
  const { left, top } = parent.getBoundingClientRect();

  const x = e.clientX + parent.scrollLeft - left;
  const y = e.clientY + parent.scrollTop - top;

  return { x, y };
};

export { getMouseOffset };
