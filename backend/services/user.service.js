import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  updateUser,
  updatePassword,
    findUserById,
    findAllUsers

} from "../repositories/user.repository.js";

export const updateProfileService = async (
  userId,
  updateData
) => {
  if (updateData.email) {
    const existingUser = await findUserByEmail(
      updateData.email
    );

    if (
      existingUser &&
      existingUser._id.toString() !== userId.toString()
    ) {
      throw new AppError(
        "Email already exists",
        409
      );
    }
  }

  const updatedUser = await updateUser(
    userId,
    updateData
  );

  return updatedUser;
};

export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new AppError(
      "Current password is incorrect",
      401
    );
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await updatePassword(
    userId,
    hashedPassword
  );
};
export const getAllUsersService = async (queryParams) => {
  return await findAllUsers(queryParams);
};