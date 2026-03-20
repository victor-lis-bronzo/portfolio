import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { posts } from "@database/models";
import { z } from "zod";

export const postSelectSchema = createSelectSchema(posts);

export const postInsertSchema = createInsertSchema(posts)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({ links: z.array(z.string().url()) });

export const postUpdateSchema = postInsertSchema.partial();

export const postIdSchema = postSelectSchema.pick({ id: true });

export type Post = z.infer<typeof postSelectSchema>;
export type CreatePost = z.infer<typeof postInsertSchema>;
export type UpdatePost = z.infer<typeof postUpdateSchema>;
