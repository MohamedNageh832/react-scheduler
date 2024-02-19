import ConfirmDeleteTask from "../../../components/confirm-delete-task";
import EditTask from "../../../components/edit-task";
import TaskContextMenu from "../../../components/task-context-menu";
import ThemesModal from "../../../components/themes-modal";

const Controls = () => {
  return (
    <>
      <ThemesModal />
      <TaskContextMenu />
      <EditTask />
      <ConfirmDeleteTask />
    </>
  );
};

export default Controls;
