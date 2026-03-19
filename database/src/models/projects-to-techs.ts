import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { techs } from "./techs";

export const projectsToTechs = pgTable(
  "projects_to_techs",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id),
    techId: uuid("tech_id")
      .notNull()
      .references(() => techs.id),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.techId] })],
);

// apenas para o entendimento do ORM, deixando ele mais inteligente
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
