import { z } from "zod";
import { baseSchema } from "../baseSchema";

const postSchema = baseSchema.extend({
  title: z
    .string()
    .min(15, "Title must be at least 15 characters")
    .max(200, "Title must be at most 200 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 100 characters")
    .max(1000, "Content must be at most 1000 characters"),
  image: z.string({ message: "Image is required" }),
  categoryId: z.string({ message: "Category is required" }),
  likes: z.number().optional(),
  userId: z.string({ message: "User ID is required" }),
});

const createPostSchema = postSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export { postSchema, createPostSchema };
export type PostSchema = z.infer<typeof postSchema>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;