import { eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { posts } from "../../../models";
import type { IPostsRepository } from "../../contracts/iposts.repository";
import type { Post, CreatePostDTO, UpdatePostDTO } from "@portfolio/packages";

export class DrizzlePostsRepository implements IPostsRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly db: LibSQLDatabase<any>) {}

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
