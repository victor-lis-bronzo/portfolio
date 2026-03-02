import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { posts } from "@database";
import { z } from "zod";

export const createPostDto = createInsertSchema(posts)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    links: z.array(z.string()),
  });

export const selectPostDto = createSelectSchema(posts);

export const updatePostDto = createInsertSchema(posts)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    links: z.array(z.string()),
  })
  .partial();

export const deletePostDto = createSelectSchema(posts).pick({
  id: true,
});

export type CreatePostDto = z.infer<typeof createPostDto>;
export type SelectPostDto = z.infer<typeof selectPostDto>;
export type UpdatePostDto = z.infer<typeof updatePostDto>;
export type DeletePostDto = z.infer<typeof deletePostDto>;
