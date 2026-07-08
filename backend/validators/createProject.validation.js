import {z} from 'zod';

export const createProjectSchema = z.object(
    {
        name: z.
        string()
        .trim()
        .min(3,"Project name must be atleast 3 characters")
        .max(100, "project name cannot exceed 100 characters"),


        description: z.string()
        .trim()
        .max(1000 , "description cannot exceed 1000 characters")
        .optional(),

        status :z.enum(["PLANNING" , "ACTIVE" , "COMPLETED","ARCHIVED"])
        .optional()

    }
);
 