import { db } from "../../app";
import { DrizzleUsersRepository } from "./drizzle-users.repository";
import { DrizzleProjectsRepository } from "./drizzle-projects.repository";
import { DrizzlePostsRepository } from "./drizzle-posts.repository";
import { DrizzleTechsRepository } from "./drizzle-techs.repository";

export const usersRepository = new DrizzleUsersRepository(db);
export const projectsRepository = new DrizzleProjectsRepository(db);
export const postsRepository = new DrizzlePostsRepository(db);
export const techsRepository = new DrizzleTechsRepository(db);

export { DrizzleUsersRepository };
export { DrizzleProjectsRepository };
export { DrizzlePostsRepository };
export { DrizzleTechsRepository };
