import { pgTable, uuid, varchar, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { techs } from './techs';

export const stackEnum = pgEnum('stack_type', ['front-end', 'back-end', 'devOps']);

export const technologies = pgTable('technologies', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  stack: stackEnum('stack').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const technologiesRelations = relations(technologies, ({ many }) => ({
  techs: many(techs),
}));

export type TechnologySelect = typeof technologies.$inferSelect;
export type TechnologyInsert = typeof technologies.$inferInsert;
