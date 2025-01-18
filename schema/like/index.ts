import { baseSchema } from "@/schema";
import { z } from "zod";

const likeSchema = baseSchema.extend({
  userId: z.string(),
  postId: z.string().optional(),
  commentId: z.string().optional(),
});

const createLikeSchema = likeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
const updateLikeSchema = likeSchema.partial().extend({ id: z.string() });

export { createLikeSchema, likeSchema, updateLikeSchema };
export type LikeSchema = z.infer<typeof likeSchema>;
export type CreateLikeSchema = z.infer<typeof createLikeSchema>;
export type UpdateLikeSchema = z.infer<typeof updateLikeSchema>;
