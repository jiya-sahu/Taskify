import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../repositories/auth.repository.js";
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import { verifyRefreshToken } from "../utils/jwt.js";

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

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
    throw error;
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
   
    throw new AppError("Refresh token missing", 401);
  }

  const decoded = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken({
    userId: decoded.userId,
    role: decoded.role,
  });

  return { accessToken };
};

