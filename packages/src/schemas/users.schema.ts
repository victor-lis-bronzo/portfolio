import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@database/models";
import { z } from "zod";

export const userSelectSchema = createSelectSchema(users);

export const userInsertSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["admin", "user"]).default("user"),
  });

export const userUpdateSchema = userInsertSchema.partial();

export const userIdSchema = userSelectSchema.pick({ id: true });

export type User = z.infer<typeof userSelectSchema>;
export type CreateUser = z.infer<typeof userInsertSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
