import { verifyAccessToken } from "../utils/jwt.js";
import { findUserById } from "../repositories/auth.repository.js";
import asyncHandler from "./asyncHandler.js";
export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    const error = new Error("Access token is required");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  const user = await findUserById(decoded.userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  req.user = user;

  next();
});