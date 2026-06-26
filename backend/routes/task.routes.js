import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import {validate} from "../middlewares/validate.js";

import {
  createTaskSchema,
} from "../validators/createTask.validation.js";

import {
  updateTaskSchema,
} from "../validators/updateTask.validation.js";

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  validate(createTaskSchema),
  createTaskController
);

router.get(
  "/",
  getTasksController
);

router.get(
  "/:id",
  getTaskController
);

router.patch(
  "/:id",
  validate(updateTaskSchema),
  updateTaskController
);

router.delete(
  "/:id",
  deleteTaskController
);

export default router;