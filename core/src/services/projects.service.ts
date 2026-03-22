import { projectsRepository } from "@database";
import type { IProjectsRepository } from "@database";
import type { Project, CreateProjectDTO, UpdateProjectDTO } from "@packages";


export class ProjectsService {
  constructor(private readonly repository: IProjectsRepository = projectsRepository) {}

  async create(data: CreateProjectDTO): Promise<Project> {
    return this.repository.create(data);
  }

  async findAll(): Promise<Project[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Project | undefined> {
    return this.repository.findById(id);
  }

  async update(id: string, data: UpdateProjectDTO): Promise<Project | undefined> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<Project | undefined> {
    return this.repository.delete(id);
  }
}
