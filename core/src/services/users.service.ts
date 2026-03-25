import { usersRepository } from "@portfolio/database";
import type { IUsersRepository } from "@portfolio/database";
import type { User, CreateUserDTO, UpdateUserDTO } from "@portfolio/packages";
import bcrypt from "bcryptjs";

export class UsersService {
  constructor(
    private readonly repository: IUsersRepository = usersRepository,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = await this.repository.create({
      ...data,
      password: data.password ? bcrypt.hashSync(data.password, 10) : undefined,
    });
    return user;
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
