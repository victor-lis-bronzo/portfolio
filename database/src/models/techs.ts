import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import crypto from "node:crypto";

export const techs = sqliteTable("techs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
});