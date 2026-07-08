import asyncHandler from "../middlewares/asyncHandler.js"
import {createProjectService} from "../services/project.service.js"

export const createProjectController = asyncHandler(
    async (req,res)=>{
        const project = await createProjectService(
            req.body,
            req.user._id
        );

        res.status(201).json({
            success:true,
            message:"Project created successfully",
            data:project
        })
    }
);