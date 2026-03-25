import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { projects } from "../../models/projects.js";
import type { IProjectsRepository } from "../contracts/iprojects.repository.js";
import type { Project, CreateProjectDTO, UpdateProjectDTO } from "@portfolio/packages";

export class DrizzleProjectsRepository implements IProjectsRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<Project[]> {
    return this.db.select().from(projects) as Promise<Project[]>;
  }

  async findById(id: string): Promise<Project | undefined> {
    const [project] = await this.db.select().from(projects).where(eq(projects.id, id));
    return project as Project | undefined;
  }

  async create(data: CreateProjectDTO): Promise<Project> {
    const [newProject] = await this.db.insert(projects).values(data).returning();
    return newProject as Project;
  }

  async update(id: string, data: UpdateProjectDTO): Promise<Project | undefined> {
    const [updated] = await this.db
      .update(projects)
      .set(data)
      .where(eq(projects.id, id))
      .returning();
    return updated as Project | undefined;
  }

  async delete(id: string): Promise<Project | undefined> {
    const [deleted] = await this.db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return deleted as Project | undefined;
  }
}
