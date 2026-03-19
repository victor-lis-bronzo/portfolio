import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { projectsToTechs } from "./projects-to-techs";
import { postsToTechs } from "./posts-to-techs";

export const techs = pgTable("techs", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
});

export const techsRelations = relations(techs, ({ many }) => ({
  projects: many(projectsToTechs),
  posts: many(postsToTechs),
}));