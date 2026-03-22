import type { Tech, CreateTechDTO } from "@packages";

export interface ITechsRepository {
  findAll(): Promise<Tech[]>;
  findById(id: string): Promise<Tech | undefined>;
  findByName(name: string): Promise<Tech | undefined>;
  create(data: CreateTechDTO): Promise<Tech>;
  delete(id: string): Promise<Tech | undefined>;
}
