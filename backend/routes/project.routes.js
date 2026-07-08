import express from 'express'

import {protect} from "../middlewares/authMiddleware.js"
import {validate} from "../middlewares/validate.js"

import {createProjectSchema} from "../validators/createProject.validation.js"
import {createProjectController} from "../controllers/project.controller.js"

const router = express.Router();

router.post("/",
    protect,
    validate(createProjectSchema),
    createProjectController
)

export default router;