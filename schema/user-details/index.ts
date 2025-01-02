import { z } from "zod";
import { baseSchema } from "../baseSchema";

const userDetailSchema = baseSchema.extend({
  userId: z.string().uuid(),
  phoneNumber: z.string().min(10).max(10),
  profession: z.string().min(3).max(20),
  resume: z.string().url(),
  linkedin: z.string().url(),
  github: z.string().url(),
  twitter: z.string().url(),
  youtube: z.string().url(),
});

const createUserDetailSchema = userDetailSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
const updateUserDetailSchema = userDetailSchema.partial().extend({
  id: z.string().uuid(),
});

export { createUserDetailSchema, updateUserDetailSchema };
export type UserDetailSchema = z.infer<typeof userDetailSchema>;
export type CreateUserDetailSchema = z.infer<typeof createUserDetailSchema>;
export type UpdateUserDetailSchema = z.infer<typeof updateUserDetailSchema>;
