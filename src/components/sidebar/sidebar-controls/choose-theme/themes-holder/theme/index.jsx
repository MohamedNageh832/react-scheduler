const Theme = ({ theme }) => {
  return (
    <div className={`theme theme--${theme}`}>
      <header className="theme__header"></header>
      <span className="theme__sidebar"></span>
      <span className="theme__grid"></span>
    </div>
  );
};

export default Theme;
