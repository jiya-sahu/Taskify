import project from "../models/project.js";
import {createProject} from "../repositories/project.repository.js"

export const createProjectService = async (
    projectData,
    ownerId
) => {
    return await createProject({
        ...projectData,
         owner: ownerId,
        members: [ownerId],
    })
}