import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { events } from './events';

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  fileUrl: varchar('file_url', { length: 1024 }).notNull(),
  projectId: uuid('project_id')
    .references(() => projects.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const filesRelations = relations(files, ({ one }) => ({
  project: one(projects, {
    fields: [files.projectId],
    references: [projects.id],
  }),
  event: one(events, {
    fields: [files.eventId],
    references: [events.id],
  }),
}));

export type FileSelect = typeof files.$inferSelect;
export type FileInsert = typeof files.$inferInsert;
export type FileUpdate = Partial<typeof files.$inferInsert>;
