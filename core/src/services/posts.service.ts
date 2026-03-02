import { db, posts } from "@database";
import { CreatePostDto, UpdatePostDto, DeletePostDto } from "@packages";
import { eq } from "drizzle-orm";

export class PostsService {
  async create(data: CreatePostDto) {
    const [newPost] = await db.insert(posts).values(data).returning();
    return newPost;
  }

  async findAll() {
    return await db.select().from(posts);
  }

  async findById(id: string) {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async update(id: string, data: UpdatePostDto) {
    const [updatedPost] = await db
      .update(posts)
      .set(data)
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  }

  async delete(id: string) {
    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return deletedPost;
  }
}
