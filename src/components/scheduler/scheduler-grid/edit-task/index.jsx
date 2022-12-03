import ChooseColor from "./choose-color";
import ChooseTime from "./choose-time";
import Controls from "./controls";
import EnterTask from "./enter-task";
import useEditTask from "./useEditTask";

const EditTask = () => {
  const { values, setValues, onChange, handleSubmit, handleCancel } =
    useEditTask();

  return (
    <>
      <div className="overlay" onClick={handleCancel}></div>
      <form onSubmit={handleSubmit} className="modal">
        <EnterTask value={values.name} onChange={onChange} />
        <ChooseTime values={values} setValues={setValues} />
        <ChooseColor values={values} setValues={setValues} />
        <Controls handleCancel={handleCancel} />
      </form>
    </>
  );
};

export default EditTask;
