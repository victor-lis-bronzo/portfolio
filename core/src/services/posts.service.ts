import { postsRepository } from "@portfolio/database";
import type { IPostsRepository } from "@portfolio/database";
import type { Post, CreatePostDTO, UpdatePostDTO } from "@portfolio/packages";


export class PostsService {
  constructor(private readonly repository: IPostsRepository = postsRepository) {}

  async create(data: CreatePostDTO): Promise<Post> {
    return this.repository.create(data);
  }

  async findAll(): Promise<Post[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.repository.findById(id);
  }

  async update(id: string, data: UpdatePostDTO): Promise<Post | undefined> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<Post | undefined> {
    return this.repository.delete(id);
  }
}
