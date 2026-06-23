import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required"),
});