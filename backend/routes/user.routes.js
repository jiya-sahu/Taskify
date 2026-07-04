import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import { validate } from "../middlewares/validate.js";
import {authorize} from "../middlewares/authorizeMiddleware.js";

import { updateUserSchema } from "../validators/updateUser.validation.js";
import{changePasswordSchema} from "../validators/changePassword.validation.js";

import { updateProfileController ,changePasswordController , getAllUsersController,} from "../controllers/user.controller.js";

const router = express.Router();

router.patch(
  "/me",
  protect,
  validate(updateUserSchema),
  updateProfileController
);

router.patch(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  changePasswordController
);

router.get(
  "/",
  protect,
  authorize("ADMIN"),
  getAllUsersController
);
export default router;