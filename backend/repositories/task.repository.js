import taskModel from '../models/task.js';

export const createTask = async(taskData)=>{
    return await taskModel.create(taskData);
}

export const findTasksByUserId = async(userId)=>{
    return await taskModel.find({createdBy: userId}).sort({createdAt: -1});
}

export const findTaskByIdAndOwner = async (
  taskId,
  userId
) => {
  return taskModel.findOne({
    _id: taskId,
    createdBy: userId,
  });
};

export const updateTaskByIdAndOwner = async (
  taskId,
  userId,
  updateData
) => {
  return taskModel.findOneAndUpdate(
    {
      _id: taskId,
      createdBy: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteTaskByIdAndOwner = async (
  taskId,
  userId
) => {
  return taskModel.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
  });
};