import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../repositories/auth.repository.js";
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await createUser({ name, email, password: hashedPassword });
  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

  return { user, accessToken ,refreshToken};
};