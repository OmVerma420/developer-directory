import { z } from "zod";

export const developerCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),

  role: z.enum(["Frontend", "Backend", "Full-Stack"], {
    message: "Invalid role selected",
  }),

  techStack: z
    .union([
      z.string().transform((str) =>
        str
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      ),
      z.array(z.string()),
    ])
    .default([]),

  experience: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((num) => num >= 0, "Experience must be a valid positive number"),

  description: z.string().optional().default(""),

  joiningDate: z
    .string()
    .optional()
    .transform((date) => (date ? new Date(date) : new Date())),

  photoURL: z.string().optional(),
});

export const developerUpdateSchema = developerCreateSchema.partial();
