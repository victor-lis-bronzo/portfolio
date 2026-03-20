import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { posts } from "../../models/posts";
import type { IPostsRepository, InsertPost, Post } from "../contracts/iposts.repository";

export class DrizzlePostsRepository implements IPostsRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<Post[]> {
    return this.db.select().from(posts);
  }

  async findById(id: string): Promise<Post | undefined> {
    const [post] = await this.db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async create(data: InsertPost): Promise<Post> {
    const [newPost] = await this.db.insert(posts).values(data).returning();
    return newPost;
  }

  async update(id: string, data: Partial<InsertPost>): Promise<Post | undefined> {
    const [updated] = await this.db
      .update(posts)
      .set(data)
      .where(eq(posts.id, id))
      .returning();
    return updated;
  }

  async delete(id: string): Promise<Post | undefined> {
    const [deleted] = await this.db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return deleted;
  }
}
