import { eq } from "drizzle-orm";
import { projects } from "../../../models/projects";
import type { IProjectsRepository } from "../../contracts/iprojects.repository";
import type {
  Project,
  CreateProjectDTO,
  UpdateProjectDTO,
} from "@portfolio/packages";
import { LibSQLDatabase } from "drizzle-orm/libsql";

export class DrizzleProjectsRepository implements IProjectsRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly db: LibSQLDatabase<any>) {}

  async findAll(): Promise<Project[]> {
    return this.db.select().from(projects) as Promise<Project[]>;
  }

  async findById(id: string): Promise<Project | undefined> {
    const [project] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project as Project | undefined;
  }

  async create(data: CreateProjectDTO): Promise<Project> {
    const [newProject] = await this.db
      .insert(projects)
      .values(data)
      .returning();
    return newProject as Project;
  }

  async update(
    id: string,
    data: UpdateProjectDTO,
  ): Promise<Project | undefined> {
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
