import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { users } from "../../models/users.js";
import type { IUsersRepository } from "../contracts/iusers.repository.js";
import type { User, CreateUserDTO, UpdateUserDTO } from "@packages";

export class DrizzleUsersRepository implements IUsersRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<User[]> {
    return this.db.select().from(users) as Promise<User[]>;
  }

  async findById(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user as User | undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return user as User | undefined;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const [newUser] = await this.db.insert(users).values(data).returning();
    return newUser as User;
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | undefined> {
    const [updated] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return updated as User | undefined;
  }

  async delete(id: string): Promise<User | undefined> {
    const [deleted] = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return deleted as User | undefined;
  }
}
