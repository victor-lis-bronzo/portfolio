import { usersRepository } from "@database";
import type { IUsersRepository } from "@database";
import type { User, CreateUserDTO, UpdateUserDTO } from "@packages";


export class UsersService {
  constructor(private readonly repository: IUsersRepository = usersRepository) {}

  async create(data: CreateUserDTO): Promise<User> {
    return this.repository.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findByEmail(email);
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | undefined> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<User | undefined> {
    return this.repository.delete(id);
  }
}
