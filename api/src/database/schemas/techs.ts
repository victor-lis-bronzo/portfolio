import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { technologies } from './technologies';

export const techs_projects = pgTable(
  'techs_projects',
  {
    projectId: uuid('project_id')
      .references(() => projects.id, { onDelete: 'cascade' })
      .notNull(),
    technologyId: uuid('technology_id')
      .references(() => technologies.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.technologyId] }),
  })
);

export const techsProjectsRelations = relations(techs_projects, ({ one }) => ({
  project: one(projects, {
    fields: [techs_projects.projectId],
    references: [projects.id],
  }),
  technology: one(technologies, {
    fields: [techs_projects.technologyId],
    references: [technologies.id],
  }),
}));

export type TechSelect = typeof techs_projects.$inferSelect;
export type TechInsert = typeof techs_projects.$inferInsert;
