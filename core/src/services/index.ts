import { PostsService } from "./posts.service";
import { ProjectsService } from "./projects.service";
import { UsersService } from "./users.service";
import { TechsService } from "./techs.service";

export const postsService = new PostsService();
export const projectsService = new ProjectsService();
export const usersService = new UsersService();
export const techsService = new TechsService();

export * from "./posts.service";
export * from "./projects.service";
export * from "./users.service";
export * from "./techs.service";
