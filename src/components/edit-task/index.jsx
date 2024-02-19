import Overlay from "../overlay";
import ChooseColor from "./choose-color";
import ChooseTime from "./choose-time";
import Controls from "./controls";
import EnterTask from "./enter-task";
import useEditTask from "./useEditTask";

const EditTask = () => {
  const { taskToEdit, values, onChange, handleSubmit, handleCancel } =
    useEditTask();

  return (
    <>
      {taskToEdit && <Overlay onClick={handleCancel} />}
      <form
        onSubmit={handleSubmit}
        className={`modal edit-task ${taskToEdit ? " active" : ""}`}
      >
        <EnterTask value={values.name} onChange={onChange} />
        <ChooseTime values={values} onChange={onChange} />
        <ChooseColor values={values} onChange={onChange} />
        <Controls handleCancel={handleCancel} />
      </form>
    </>
  );
};

export default EditTask;
