import { MIN_X_STEP } from "../services/constants/schedulerConstants";

const tasksCollide = (task1, task2) => {
  const task1Right = task1.left + MIN_X_STEP;
  const task1Bottom = task1.top + task1.height;
  const task2Right = task2.left + MIN_X_STEP;
  const task2Bottom = task2.top + task2.height;

  return (
    task1.left < task2Right &&
    task1Right > task2.left &&
    task1.top < task2Bottom &&
    task1Bottom > task2.top
  );
};

const handleTaskCollisions = ({ mouseX, task, tasks }) => {
  let collisionDetected = false;

  for (let i = 0; i < tasks.length; i++) {
    const taskObj = tasks[i];
    if (taskObj === task) continue;

    const taskCollide = tasksCollide(task, taskObj);

    if (taskCollide) {
      collisionDetected = true;
      taskObj.collide = true;
      task.collide = true;

      const mousePosInColumn = mouseX % MIN_X_STEP;

      if (mousePosInColumn <= 60) {
        task.collideOffset = 0;
        taskObj.collideOffset = 60;
      } else if (mousePosInColumn > 60) {
        task.collideOffset = 60;
        taskObj.collideOffset = 0;
      }

      continue;
    }

    taskObj.collide = false;
    taskObj.collideOffset = 0;
  }

  if (!collisionDetected) {
    task.collideOffset = 0;
    task.collide = false;
  }

  return { tasks };
};

export { handleTaskCollisions };
