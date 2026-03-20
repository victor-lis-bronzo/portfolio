import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { projects } from "@database/models";
import { z } from "zod";

export const projectSelectSchema = createSelectSchema(projects);

export const projectInsertSchema = createInsertSchema(projects)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({ links: z.array(z.string().url()) });

export const projectUpdateSchema = projectInsertSchema.partial();

export const projectIdSchema = projectSelectSchema.pick({ id: true });

export type Project = z.infer<typeof projectSelectSchema>;
export type CreateProject = z.infer<typeof projectInsertSchema>;
export type UpdateProject = z.infer<typeof projectUpdateSchema>;
