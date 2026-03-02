import { db } from "./app";
import { posts } from "./models/posts";
import { projects } from "./models/projects";

async function main() {
  console.log("Seeding database...");

  await db.delete(posts);
  await db.delete(projects);

  console.log("Cleared existing data.");

  await db.insert(projects).values([
    {
      name: "Portfolio V1",
      description: "Meu primeiro portfólio construído com React e TailwindCSS.",
      links: ["https://github.com/my-user/portfolio-v1"],
    },
    {
      name: "API de E-Commerce",
      description:
        "Uma API robusta para uma plataforma de e-commerce construída com Node.js e PostgreSQL.",
      links: ["https://github.com/my-user/ecommerce-api"],
    },
  ]);

  await db.insert(posts).values([
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
  ]);

  console.log("Database seeded successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
