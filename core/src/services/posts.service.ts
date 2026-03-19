import { postsRepository } from "@database";
import type { IPostsRepository, InsertPost, Post } from "@database";

export class PostsService {
  constructor(private readonly repository: IPostsRepository = postsRepository) {}

  async create(data: InsertPost): Promise<Post> {
    return this.repository.create(data);
  }

  async findAll(): Promise<Post[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<InsertPost>): Promise<Post | undefined> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<Post | undefined> {
    return this.repository.delete(id);
  }
}
