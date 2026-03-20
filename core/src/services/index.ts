import { PostsService } from "./posts.service";
import { ProjectsService } from "./projects.service";

export const postsService = new PostsService();
export const projectsService = new ProjectsService();

export * from "./posts.service";
export * from "./projects.service";
