import { usersRepository } from "@portfolio/database";
import type { IUsersRepository } from "@portfolio/database";
import type { User } from "@portfolio/packages";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(
    private readonly repository: IUsersRepository = usersRepository,
  ) {}

  async authenticateAdmin(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.repository.findByEmail(email);

    if (!user || user.role !== "ADMIN") {
      return null;
    }

    if (!user.password) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  async authenticateWithGithub(profile: {
    id: string;
    name?: string | null;
    email?: string | null;
  }): Promise<User> {
    const existingByGithubId = await this.repository.findByGithubId(profile.id);
    if (existingByGithubId) {
      return existingByGithubId;
    }

    if (profile.email) {
      const existingByEmail = await this.repository.findByEmail(profile.email);
      if (existingByEmail) {
        const updated = await this.repository.update(existingByEmail.id, {
          githubId: profile.id,
          name: existingByEmail.name ?? profile.name ?? null,
        });
        return updated!;
      }
    }

    const newUser = await this.repository.create({
      email: profile.email!,
      name: profile.name!,
      githubId: profile.id,
      password: null,
      role: "USER",
      isVerified: true,
      receivesUpdates: false,
    });

    return newUser;
  }
}
