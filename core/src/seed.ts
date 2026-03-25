import {
  usersService,
  postsService,
  projectsService,
  techsService,
} from "./services";

export async function seed() {
  console.log("Seeding database via core services...");

  // getting all actual data
  const users = await usersService.findAll();
  const techs = await techsService.findAll();
  const projects = await projectsService.findAll();
  const posts = await postsService.findAll();

  // Sequential delete to respect foreign key constraints
  console.log("Cleaning up existing data...");
  
  for (const project of projects) {
    await projectsService.delete(project.id);
  }
  
  for (const post of posts) {
    await postsService.delete(post.id);
  }
  
  for (const tech of techs) {
    await techsService.delete(tech.id);
  }
  
  for (const user of users) {
    await usersService.delete(user.id);
  }

  // Insert Users
  console.log("Inserting users...");
  await usersService.create({
    name: "admin",
    email: "admin@example.com",
    password: "admin",
    role: "ADMIN",
    isVerified: true,
  });

  await usersService.create({
    name: "user",
    email: "user@example.com",
    password: "user",
    role: "USER",
    isVerified: false,
  });

  // Insert Techs
  console.log("Inserting techs...");
  const techReact = await techsService.create({ name: "React" });
  const techTS = await techsService.create({ name: "TypeScript" });
  const techDrizzle = await techsService.create({ name: "Drizzle" });
  const techNode = await techsService.create({ name: "Node.js" });
  const techPG = await techsService.create({ name: "PostgreSQL" });

  // Insert Projects
  console.log("Inserting projects...");
  await projectsService.create({
    name: "Portfolio V1",
    description: "Meu primeiro portfólio construído com React e TailwindCSS.",
    links: ["https://github.com/my-user/portfolio-v1"],
  });

  await projectsService.create({
    name: "API de E-Commerce",
    description:
      "Uma API robusta para uma plataforma de e-commerce construída com Node.js e PostgreSQL.",
    links: ["https://github.com/my-user/ecommerce-api"],
  });

  // Insert Posts
  console.log("Inserting posts...");
  await postsService.create({
    title: "Olá Mundo",
    content: "Este é meu primeiro post no meu blog!",
    links: [],
  });

  await postsService.create({
    title: "Como construí este portfólio",
    content:
      "Um mergulho profundo nas tecnologias usadas neste site, como Drizzle ORM e Next.js.",
    links: ["https://orm.drizzle.team", "https://nextjs.org"],
  });
  console.log("Database seeded successfully!");
}

seed()
.then(() => {
  console.log("Seed completed successfully!");
  process.exit(0);
})
.catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
