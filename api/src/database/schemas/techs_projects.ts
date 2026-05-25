import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { techs } from './techs';

export const techs_projects = pgTable(
  'techs_projects',
  {
    projectId: uuid('project_id')
      .references(() => projects.id, { onDelete: 'cascade' })
      .notNull(),
    techId: uuid('technology_id')
      .references(() => techs.id, { onDelete: 'cascade' })
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
  tech: one(techs, {
    fields: [techs_projects.technologyId],
    references: [techs.id],
  }),
}));

export type TechSelect = typeof techs_projects.$inferSelect;
export type TechInsert = typeof techs_projects.$inferInsert;
