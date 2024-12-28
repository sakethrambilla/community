import { z } from "zod";
import { baseSchema } from "../baseSchema";

const commentSchema = baseSchema.extend({
  content: z.string(),
  postId: z.string(),
  userId: z.string(),
  likes: z.number().optional(),
});

const createCommentSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// const updateCommentSchema = commentSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type CommentSchema = z.infer<typeof commentSchema>;
export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
// export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;
