import type { Skill } from "@/core/entities";

export const skills: Skill[] = [
	{ id: "typescript", name: "TypeScript", category: "language" },
	{ id: "javascript", name: "JavaScript", category: "language" },
	{ id: "c", name: "C", category: "language" },
	{ id: "python", name: "Python", category: "language" },

	{ id: "react", name: "React.js", category: "frontend" },
	{ id: "nextjs", name: "Next.js", category: "frontend" },
	{ id: "tailwind", name: "Tailwind CSS", category: "frontend" },
	{ id: "shadcn", name: "shadcn/ui", category: "frontend" },
	{ id: "react-hook-form", name: "React Hook Form", category: "frontend" },
	{ id: "zod", name: "Zod", category: "frontend" },

	{ id: "nodejs", name: "Node.js", category: "backend" },
	{ id: "fastify", name: "Fastify", category: "backend" },
	{ id: "clean-architecture", name: "Clean Architecture", category: "backend" },
	{ id: "solid", name: "S.O.L.I.D.", category: "backend" },
	{ id: "rest-apis", name: "APIs REST", category: "backend" },

	{ id: "postgresql", name: "PostgreSQL", category: "database" },
	{ id: "prisma", name: "Prisma ORM", category: "database" },
	{ id: "drizzle", name: "Drizzle ORM", category: "database" },
	{ id: "mongodb", name: "MongoDB", category: "database" },

	{ id: "docker", name: "Docker", category: "devops" },
	{ id: "ci-cd", name: "CI/CD", category: "devops" },
	{ id: "nginx", name: "Nginx", category: "devops" },
	{ id: "turborepo", name: "Turborepo", category: "devops" },

	{ id: "iot", name: "Internet das Coisas", category: "iot" },
	{ id: "embedded-systems", name: "Sistemas Embarcados", category: "iot" },
	{ id: "esp32", name: "ESP32", category: "iot" },
];
