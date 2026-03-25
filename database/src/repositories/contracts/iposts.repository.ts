import type { Post, CreatePostDTO, UpdatePostDTO } from "@portfolio/packages";

export interface IPostsRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | undefined>;
  create(data: CreatePostDTO): Promise<Post>;
  update(id: string, data: UpdatePostDTO): Promise<Post | undefined>;
  delete(id: string): Promise<Post | undefined>;
}
