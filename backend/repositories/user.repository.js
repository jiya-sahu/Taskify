import User from "../models/User.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const findUserById = async (userId) => {
  return await User.findById(userId);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const updatePassword = async (
  userId,
  hashedPassword
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
    },
    {
      new: true,
    }
  );
};

export const findAllUsers = async (queryParams) => {
  const features = new ApiFeatures(
    User.find().select("-password"),
    queryParams
  )
    .search(["name", "email"])
    .filter(["role"])
    .sort()
    .paginate();

  const users = await features.query;

  const total = await User.countDocuments();

  return {
    users,
    pagination: {
      page: features.page,
      limit: features.limit,
      total,
      totalPages: Math.ceil(total / features.limit),
    },
  };
};