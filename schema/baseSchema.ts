import { z } from "zod";

export const baseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const deleteSchema = z.object({
  id: z.string(),
});

export type BaseSchema = z.infer<typeof baseSchema>;
export type DeleteSchema = z.infer<typeof deleteSchema>;
