import type { techs } from "../../models/techs.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Tech = InferSelectModel<typeof techs>;
export type InsertTech = InferInsertModel<typeof techs>;

export interface ITechsRepository {
  findAll(): Promise<Tech[]>;
  findById(id: string): Promise<Tech | undefined>;
  findByName(name: string): Promise<Tech | undefined>;
  create(data: InsertTech): Promise<Tech>;
  delete(id: string): Promise<Tech | undefined>;
}
