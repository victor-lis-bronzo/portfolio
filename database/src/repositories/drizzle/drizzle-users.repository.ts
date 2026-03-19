import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { users } from "../../models/users.js";
import type { IUsersRepository, InsertUser, User } from "../contracts/iusers.repository.js";

export class DrizzleUsersRepository implements IUsersRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<User[]> {
    return this.db.select().from(users);
  }

  async findById(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async create(data: InsertUser): Promise<User> {
    const [newUser] = await this.db.insert(users).values(data).returning();
    return newUser;
  }

  async update(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [updated] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  async delete(id: string): Promise<User | undefined> {
    const [deleted] = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return deleted;
  }
}
