import type { Project, CreateProjectDTO, UpdateProjectDTO } from "@packages";

export interface IProjectsRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(data: CreateProjectDTO): Promise<Project>;
  update(id: string, data: UpdateProjectDTO): Promise<Project | undefined>;
  delete(id: string): Promise<Project | undefined>;
}
