import { z } from "zod";

export const postSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string(),
  links: z.array(z.string().url()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createPostSchema = postSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updatePostSchema = createPostSchema.partial();

export const postIdSchema = postSchema.pick({ id: true });

export type Post = z.infer<typeof postSchema>;
export type CreatePostDTO = z.infer<typeof createPostSchema>;
export type UpdatePostDTO = z.infer<typeof updatePostSchema>;
