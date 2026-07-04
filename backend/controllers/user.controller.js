import asyncHandler from "../middlewares/asyncHandler.js";

import { updateProfileService ,changePasswordService, getAllUsersService} from "../services/user.service.js";

export const updateProfileController =
  asyncHandler(async (req, res) => {
    const updatedUser =
      await updateProfileService(
        req.user._id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  });

export const changePasswordController =
  asyncHandler(async (req, res) => {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    await changePasswordService(
      req.user._id,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });
  });

export const getAllUsersController = asyncHandler(
  async (req, res) => {
    const result = await getAllUsersService(req.query);

    res.status(200).json({
      success: true,
      data: result.users,
      pagination: result.pagination,
    });
  }
);