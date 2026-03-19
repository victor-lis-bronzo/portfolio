import { db } from "./app";
import {
  posts,
  projects,
  users,
  techs,
  projectsToTechs,
  postsToTechs,
} from "./models";

async function main() {
  console.log("Seeding database...");

  // Clean up order (junction tables first)
  await db.delete(projectsToTechs);
  await db.delete(postsToTechs);
  await db.delete(posts);
  await db.delete(projects);
  await db.delete(users);
  await db.delete(techs);

  console.log("Cleared existing data.");

  // Insert Users
  await db.insert(users).values([
    {
      name: "admin",
      email: "admin@example.com",
      password: "hashed_password_here",
      role: "admin",
      isVerified: true,
    },
    {
      name: "user",
      email: "user@example.com",
      password: "hashed_password_here",
      role: "user",
      isVerified: false,
    },
  ]);

  // Insert Techs and get IDs
  const insertedTechs = await db
    .insert(techs)
    .values([
      { name: "React" },
      { name: "TypeScript" },
      { name: "Drizzle" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
    ])
    .returning();

  const techMap = Object.fromEntries(insertedTechs.map((t) => [t.name, t.id]));

  // Insert Projects and get IDs
  const insertedProjects = await db
    .insert(projects)
    .values([
      {
        name: "Portfolio V1",
        description:
          "Meu primeiro portfólio construído com React e TailwindCSS.",
        links: ["https://github.com/my-user/portfolio-v1"],
      },
      {
        name: "API de E-Commerce",
        description:
          "Uma API robusta para uma plataforma de e-commerce construída com Node.js e PostgreSQL.",
        links: ["https://github.com/my-user/ecommerce-api"],
      },
    ])
    .returning();

  // Insert Posts and get IDs
  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        title: "Olá Mundo",
        content: "Este é meu primeiro post no meu novo blog!",
        links: [],
      },
      {
        title: "Como construí este portfólio",
        content:
          "Um mergulho profundo nas tecnologias usadas neste site, como Drizzle ORM e Next.js.",
        links: ["https://orm.drizzle.team", "https://nextjs.org"],
      },
    ])
    .returning();

  // Relate Techs to Projects
  await db.insert(projectsToTechs).values([
    { projectId: insertedProjects[0].id, techId: techMap["React"] },
    { projectId: insertedProjects[0].id, techId: techMap["TypeScript"] },
    { projectId: insertedProjects[1].id, techId: techMap["Node.js"] },
    { projectId: insertedProjects[1].id, techId: techMap["PostgreSQL"] },
  ]);

  // Relate Techs to Posts
  await db.insert(postsToTechs).values([
    { postId: insertedPosts[1].id, techId: techMap["Drizzle"] },
    { postId: insertedPosts[1].id, techId: techMap["TypeScript"] },
    { postId: insertedPosts[1].id, techId: techMap["PostgreSQL"] },
  ]);

  console.log("Database seeded successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
