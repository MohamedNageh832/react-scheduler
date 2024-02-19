const Overlay = ({ transparent, onClick }) => {
  const className = `overlay${transparent ? " overlay--transparent" : ""}`;
  return <div className={className} onClick={onClick}></div>;
};

export default Overlay;
