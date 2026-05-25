import { pgTable, uuid, varchar, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { techs_projects } from './techs_projects';

export const stackEnum = pgEnum('stack_type', ['front-end', 'back-end', 'devOps']);

export const techs = pgTable('techs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  stack: stackEnum('stack').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const techsRelations = relations(techs, ({ many }) => ({
  techs_projects: many(techs_projects),
}));

export type TechnologySelect = typeof techs.$inferSelect;
export type TechnologyInsert = typeof techs.$inferInsert;
