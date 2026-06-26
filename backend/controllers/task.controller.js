import asyncHandler from "../middlewares/asyncHandler.js";

import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService
} from "../services/task.services.js";

export const createTaskController =
  asyncHandler(async (req, res) => {
    const task =
      await createTaskService({
  ...req.body,
  createdBy: req.user._id,
});

    res.status(201).json({
      success: true,
      data: task,
    });
  });

  export const getTasksController =
  asyncHandler(async (req, res) => {
    const tasks =
      await getTasksService(
        req.user._id
      );

    res.status(200).json({
      success: true,
      results: tasks.length,
      data: tasks,
    });
  });

export const getTaskController =
  asyncHandler(async (req, res) => {
    const task =
      await getTaskByIdService(
        req.params.id,
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: task,
    });
  });

  export const updateTaskController =
  asyncHandler(async (req, res) => {
    const task =
      await updateTaskService(
        req.params.id,
        req.user._id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: task,
    });
  });

  export const deleteTaskController =
  asyncHandler(async (req, res) => {
    await deleteTaskService(
      req.params.id,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message:
        "Task deleted successfully",
    });
  });