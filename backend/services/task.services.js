import AppError from "../utils/AppError.js";

import {
  createTask,
  findTasksByUserId,
  findTaskByIdAndOwner,
  updateTaskByIdAndOwner,
  deleteTaskByIdAndOwner,
} from "../repositories/task.repository.js";

export const createTaskService = async (
  taskData
) => {
  return createTask(
    taskData
  
  );
};

export const getTasksService = async (
  userId
) => {
  return findTasksByUserId(userId);
};

export const getTaskByIdService = async (
  taskId,
  userId
) => {
  const task = await findTaskByIdAndOwner(
    taskId,
    userId
  );

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  return task;
};

export const updateTaskService = async (
  taskId,
  userId,
  updateData
) => {
  const updatedTask =
    await updateTaskByIdAndOwner(
      taskId,
      userId,
      updateData
    );

  if (!updatedTask) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  return updatedTask;
};

export const deleteTaskService = async (
  taskId,
  userId
) => {
  const deletedTask =
    await deleteTaskByIdAndOwner(
      taskId,
      userId
    );

  if (!deletedTask) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  return deletedTask;
};