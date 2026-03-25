import type { User, CreateUserDTO, UpdateUserDTO } from "@portfolio/packages";

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByGithubId(githubId: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User | undefined>;
  delete(id: string): Promise<User | undefined>;
}
