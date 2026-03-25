import { usersRepository } from "@database";
import type { IUsersRepository } from "@database";
import type { User } from "@packages";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(
    private readonly repository: IUsersRepository = usersRepository,
  ) {}

  async authenticateAdmin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const user = await this.repository.findByEmail(email);

    if (!user || user.role !== "admin") {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }
}
