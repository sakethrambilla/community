import { AccessType } from "@prisma/client";
import { z } from "zod";
import { baseSchema } from "../baseSchema";
const courseSchema = baseSchema.extend({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  coverImage: z.string().url(),
  categoryId: z.string().min(3).max(255),
  accessType: z.nativeEnum(AccessType),
  published: z.boolean().default(false),
});

const createCourseSchema = courseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
const updateCourseSchema = courseSchema.partial().extend({
  id: z.string().uuid(),
});

export { courseSchema, createCourseSchema, updateCourseSchema };
export type CourseSchema = z.infer<typeof courseSchema>;
export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>;
