import type { projects } from "../../models/projects";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Project = InferSelectModel<typeof projects>;
export type InsertProject = InferInsertModel<typeof projects>;

export interface IProjectsRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(data: InsertProject): Promise<Project>;
  update(id: string, data: Partial<InsertProject>): Promise<Project | undefined>;
  delete(id: string): Promise<Project | undefined>;
}
