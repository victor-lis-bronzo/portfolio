import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { posts } from "./posts";
import { techs } from "./techs";

export const postsToTechs = pgTable(
  "posts_to_techs",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id),
    techId: uuid("tech_id")
      .notNull()
      .references(() => techs.id),
  },
  (t) => [
    primaryKey({ columns: [t.postId, t.techId] }),
  ]
);

// apenas para o entendimento do ORM, deixando ele mais inteligente
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
