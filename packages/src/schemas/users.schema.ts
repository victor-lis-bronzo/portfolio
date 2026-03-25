import { z } from "zod";

export const UserRole = z.enum(["ADMIN", "USER"]);
export type UserRole = z.infer<typeof UserRole>;

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  password: z.string().min(8).nullable(),
  githubId: z.string().nullable(),
  role: UserRole.default("USER"),
  isVerified: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().min(8).nullable().optional(),
  githubId: z.string().nullable().optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userIdSchema = userSchema.pick({ id: true });

export type User = z.infer<typeof userSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

