import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { techs } from "../../models/techs.js";
import type { ITechsRepository } from "../contracts/itechs.repository.js";
import type { Tech, CreateTechDTO } from "@packages";

export class DrizzleTechsRepository implements ITechsRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<Tech[]> {
    return this.db.select().from(techs) as Promise<Tech[]>;
  }

  async findById(id: string): Promise<Tech | undefined> {
    const [tech] = await this.db.select().from(techs).where(eq(techs.id, id));
    return tech as Tech | undefined;
  }

  async findByName(name: string): Promise<Tech | undefined> {
    const [tech] = await this.db.select().from(techs).where(eq(techs.name, name));
    return tech as Tech | undefined;
  }

  async create(data: CreateTechDTO): Promise<Tech> {
    const [newTech] = await this.db.insert(techs).values(data).returning();
    return newTech as Tech;
  }

  async delete(id: string): Promise<Tech | undefined> {
    const [deleted] = await this.db
      .delete(techs)
      .where(eq(techs.id, id))
      .returning();
    return deleted as Tech | undefined;
  }
}
