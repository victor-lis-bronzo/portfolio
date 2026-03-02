import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { projects } from "@database";
import { z } from "zod";

export const createProjectDto = createInsertSchema(projects)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    links: z.array(z.string()),
  });

export const selectProjectDto = createSelectSchema(projects);

export const updateProjectDto = createInsertSchema(projects)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    links: z.array(z.string()),
  })
  .partial();

export const deleteProjectDto = createSelectSchema(projects).pick({
  id: true,
});

export type CreateProjectDto = z.infer<typeof createProjectDto>;
export type SelectProjectDto = z.infer<typeof selectProjectDto>;
export type UpdateProjectDto = z.infer<typeof updateProjectDto>;
export type DeleteProjectDto = z.infer<typeof deleteProjectDto>;
