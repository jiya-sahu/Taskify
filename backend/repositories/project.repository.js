import Project from "../models/project.js"

export const createProject = async (projectData) => {
    return await Project.create(projectData);
}

export const getProjectById = async (projectId) => {
    return await Project.findById(projectId);
}

export const updateProjectById = async (projectId, updateData) => {
    return await Project.findByIdAndUpdate(projectId, updateData, { new: true });
}

export const deleteProjectById = async (projectId) => {
    return await Project.findByIdAndDelete(projectId);
}