import getSchedulerHeader from "../../../utils/getSchedulerHeader";

const SidebarControls = ({ onWeekChange }) => {
  const updateSchedulerHeader = (value) => {
    const newHeader = getSchedulerHeader(value);

    console.log(newHeader);

    onWeekChange(newHeader);
  };

  const onChange = (e) => {
    updateSchedulerHeader(e.target.value);
  };

  return (
    <section className="sidebar__controls">
      <section>
        <label className="sidebar__label" htmlFor="start-date">
          start from
        </label>
        <input onChange={onChange} id="start-date" type="date" />
      </section>
    </section>
  );
};

export default SidebarControls;
