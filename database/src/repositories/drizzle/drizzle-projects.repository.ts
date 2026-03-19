import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { projects } from "../../models/projects.js";
import type { IProjectsRepository, InsertProject, Project } from "../contracts/iprojects.repository.js";

export class DrizzleProjectsRepository implements IProjectsRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<Project[]> {
    return this.db.select().from(projects);
  }

  async findById(id: string): Promise<Project | undefined> {
    const [project] = await this.db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async create(data: InsertProject): Promise<Project> {
    const [newProject] = await this.db.insert(projects).values(data).returning();
    return newProject;
  }

  async update(id: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await this.db
      .update(projects)
      .set(data)
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }

  async delete(id: string): Promise<Project | undefined> {
    const [deleted] = await this.db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return deleted;
  }
}
