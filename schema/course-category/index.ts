import { baseSchema } from "@/schema";
import { z } from "zod";

const courseCategorySchema = baseSchema.extend({
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
});

const createCourseCategorySchema = courseCategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const updateCourseCategorySchema = courseCategorySchema.partial().required({
  id: true,
});

export {
  courseCategorySchema,
  createCourseCategorySchema,
  updateCourseCategorySchema,
};
export type CourseCategorySchema = z.infer<typeof courseCategorySchema>;
export type CreateCourseCategorySchema = z.infer<
  typeof createCourseCategorySchema
>;
export type UpdateCourseCategorySchema = z.infer<
  typeof updateCourseCategorySchema
>;
