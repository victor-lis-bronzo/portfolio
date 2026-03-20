import type { posts } from "../../models/posts";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Post = InferSelectModel<typeof posts>;
export type InsertPost = InferInsertModel<typeof posts>;

export interface IPostsRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | undefined>;
  create(data: InsertPost): Promise<Post>;
  update(id: string, data: Partial<InsertPost>): Promise<Post | undefined>;
  delete(id: string): Promise<Post | undefined>;
}
