import { relations } from "drizzle-orm";
import { posts } from "./posts";
import { projects } from "./projects";
import { techs } from "./techs";
import { postsToTechs } from "./posts-to-techs";
import { projectsToTechs } from "./projects-to-techs";

// apenas para o entendimento do ORM, deixando ele mais inteligente
export const postsRelations = relations(posts, ({ many }) => ({
  techs: many(postsToTechs),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  techs: many(projectsToTechs),
}));

export const techsRelations = relations(techs, ({ many }) => ({
  posts: many(postsToTechs),
  projects: many(projectsToTechs),
}));

export const postsToTechsRelations = relations(postsToTechs, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTechs.postId],
    references: [posts.id],
  }),
  tech: one(techs, {
    fields: [postsToTechs.techId],
    references: [techs.id],
  }),
}));

export const projectsToTechsRelations = relations(
  projectsToTechs,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectsToTechs.projectId],
      references: [projects.id],
    }),
    tech: one(techs, {
      fields: [projectsToTechs.techId],
      references: [techs.id],
    }),
  }),
);
