import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { techs } from "../../models/techs.js";
import type { ITechsRepository, InsertTech, Tech } from "../contracts/itechs.repository.js";

export class DrizzleTechsRepository implements ITechsRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<Tech[]> {
    return this.db.select().from(techs);
  }

  async findById(id: string): Promise<Tech | undefined> {
    const [tech] = await this.db.select().from(techs).where(eq(techs.id, id));
    return tech;
  }

  async findByName(name: string): Promise<Tech | undefined> {
    const [tech] = await this.db.select().from(techs).where(eq(techs.name, name));
    return tech;
  }

  async create(data: InsertTech): Promise<Tech> {
    const [newTech] = await this.db.insert(techs).values(data).returning();
    return newTech;
  }

  async delete(id: string): Promise<Tech | undefined> {
    const [deleted] = await this.db
      .delete(techs)
      .where(eq(techs.id, id))
      .returning();
    return deleted;
  }
}
