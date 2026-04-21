import { sqliteTable, primaryKey, text } from "drizzle-orm/sqlite-core";
import { projects } from "./projects";
import { techs } from "./techs";

export const projectsToTechs = sqliteTable(
  "projects_to_techs",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    techId: text("tech_id")
      .notNull()
      .references(() => techs.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.techId] })]
);
