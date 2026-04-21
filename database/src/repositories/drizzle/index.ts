import { db } from "../../app";
import { DrizzleUsersRepository } from "./turso/users.repository";
import { DrizzleProjectsRepository } from "./turso/projects.repository";
import { DrizzlePostsRepository } from "./turso/posts.repository";
import { DrizzleTechsRepository } from "./turso/techs.repository";

export const usersRepository = new DrizzleUsersRepository(db);
export const projectsRepository = new DrizzleProjectsRepository(db);
export const postsRepository = new DrizzlePostsRepository(db);
export const techsRepository = new DrizzleTechsRepository(db);

export { DrizzleUsersRepository };
export { DrizzleProjectsRepository };
export { DrizzlePostsRepository };
export { DrizzleTechsRepository };
