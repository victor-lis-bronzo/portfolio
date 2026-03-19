import type { users } from "../../models/users.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: InsertUser): Promise<User>;
  update(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  delete(id: string): Promise<User | undefined>;
}
