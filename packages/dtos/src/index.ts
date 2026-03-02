import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { posts, projects } from "@database";

export const insertPostDto = createInsertSchema(posts);
export const selectPostDto = createSelectSchema(posts);

export const insertProjectDto = createInsertSchema(projects);
export const selectProjectDto = createSelectSchema(projects);
