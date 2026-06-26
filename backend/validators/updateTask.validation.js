import { z } from "zod";

export const updateTaskSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),

      status: z
        .enum(["todo", "in-progress", "completed"])
        .optional(),

      priority: z
        .enum(["low", "medium", "high"])
        .optional(),

      dueDate: z
        .string()
        .datetime()
        .optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      {
        message: "At least one field is required",
      }
    ),
});