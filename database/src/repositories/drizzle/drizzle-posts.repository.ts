import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { posts } from "../../models/posts.js";
import type { IPostsRepository } from "../contracts/iposts.repository.js";
import type { Post, CreatePostDTO, UpdatePostDTO } from "@packages";

export class DrizzlePostsRepository implements IPostsRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findAll(): Promise<Post[]> {
    return this.db.select().from(posts) as Promise<Post[]>;
  }

  async findById(id: string): Promise<Post | undefined> {
    const [post] = await this.db.select().from(posts).where(eq(posts.id, id));
    return post as Post | undefined;
  }

  async create(data: CreatePostDTO): Promise<Post> {
    const [newPost] = await this.db.insert(posts).values(data).returning();
    return newPost as Post;
  }

  async update(id: string, data: UpdatePostDTO): Promise<Post | undefined> {
    const [updated] = await this.db
      .update(posts)
      .set(data)
      .where(eq(posts.id, id))
      .returning();
    return updated as Post | undefined;
  }

  async delete(id: string): Promise<Post | undefined> {
    const [deleted] = await this.db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return deleted as Post | undefined;
  }
}
