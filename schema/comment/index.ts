import { z } from "zod";
import { baseSchema } from "../baseSchema";

const commentSchema = baseSchema.extend({
  content: z
    .string()
    .min(1, { message: "Comment is required" })
    .max(50, { message: "Comment must be less than 50 characters" }),
  postId: z.string(),
  userId: z.string(),
});

const createCommentSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const updateCommentSchema = commentSchema.partial().extend({
  id: z.string(),
});

export { commentSchema, createCommentSchema, updateCommentSchema };
export type CommentSchema = z.infer<typeof commentSchema>;
export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;
