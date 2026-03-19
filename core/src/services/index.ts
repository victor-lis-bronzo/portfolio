import { PostsService } from "./posts.service.js";
import { ProjectsService } from "./projects.service.js";

export const postsService = new PostsService();
export const projectsService = new ProjectsService();

export * from "./posts.service.js";
export * from "./projects.service.js";
