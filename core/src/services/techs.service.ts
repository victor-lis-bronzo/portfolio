import { techsRepository } from "@database";
import type { ITechsRepository } from "@database";
import type { Tech, CreateTechDTO } from "@packages";


export class TechsService {
  constructor(private readonly repository: ITechsRepository = techsRepository) {}

  async create(data: CreateTechDTO): Promise<Tech> {
    return this.repository.create(data);
  }

  async findAll(): Promise<Tech[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Tech | undefined> {
    return this.repository.findById(id);
  }

  async findByName(name: string): Promise<Tech | undefined> {
    return this.repository.findByName(name);
  }

  async delete(id: string): Promise<Tech | undefined> {
    return this.repository.delete(id);
  }
}
