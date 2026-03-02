import { db, projects } from "@database";
import {
  CreateProjectDto,
  UpdateProjectDto,
  DeleteProjectDto,
} from "@packages";
import { eq } from "drizzle-orm";

export class ProjectsService {
  async create(data: CreateProjectDto) {
    const [newProject] = await db.insert(projects).values(data).returning();
    return newProject;
  }

  async findAll() {
    return await db.select().from(projects);
  }

  async findById(id: string) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project;
  }

  async update(id: string, data: UpdateProjectDto) {
    const [updatedProject] = await db
      .update(projects)
      .set(data)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async delete(id: string) {
    const [deletedProject] = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return deletedProject;
  }
}
