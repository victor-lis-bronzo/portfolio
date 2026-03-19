import { projectsRepository } from "@database";
import type { IProjectsRepository, InsertProject, Project } from "@database";

export class ProjectsService {
  constructor(private readonly repository: IProjectsRepository = projectsRepository) {}

  async create(data: InsertProject): Promise<Project> {
    return this.repository.create(data);
  }

  async findAll(): Promise<Project[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Project | undefined> {
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<Project | undefined> {
    return this.repository.delete(id);
  }
}
