import { sqliteTable, primaryKey, text } from "drizzle-orm/sqlite-core";
import { posts } from "./posts";
import { techs } from "./techs";

export const postsToTechs = sqliteTable(
  "posts_to_techs",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    techId: text("tech_id")
      .notNull()
      .references(() => techs.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.postId, t.techId] })]
);
