import { Hero } from "@/modules/hero";
import { Techs } from "@/modules/techs";
import { Projects } from "@/modules/projects";
import { Events } from "@/modules/events";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, PenTool } from "lucide-react";
import Link from "next/link";
import { mockEvents } from "@/constants/home/events";
import { mockProjects } from "@/constants/home/projects";

export default async function Home() {
  return (
    <main>
      <Hero.Root className="my-8 lg:my-4">
        <Hero.Content>
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Bem vindo!
          </div>

          <Hero.Title className="text-5xl text-white">
            Prazer, <br />
            <span className="text-primary">Victor Lis Bronzo.</span>
          </Hero.Title>

          <Hero.Description>
            Conheça um pouco sobre mim, minha trajetória, minhas paixões e o que
            eu gosto de fazer.
          </Hero.Description>

          <Hero.Actions>
            <Button className="bg-primary text-black text-lg h-12 px-8">
              <Link
                href="https://www.linkedin.com/in/victor-lis-bronzo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-1 w-fit"
              >
                <Linkedin className="h-5 w-5" />
                <span>Ver LinkedIn</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white text-lg h-12 w-fit"
            >
              <Link
                href="https://github.com/victor-lis-bronzo/victor-lis-bronzo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-1 w-fit"
              >
                <Github className="h-5 w-5" />
                <span>Ver GitHub</span>
              </Link>
            </Button>
            <Button className="bg-[#f8f9fa] text-gray-800 hover:bg-gray-200 text-lg h-12 px-8">
              <Link
                href="/drawmylife"
                className="flex items-center gap-2 px-1 w-fit"
              >
                <PenTool className="h-5 w-5" />
                <span>Perguntar para IA</span>
              </Link>
            </Button>
          </Hero.Actions>
        </Hero.Content>

        <Hero.Visuals className="max-[500px]:hidden">
          <Hero.Card className="w-full h-full max-w-2xl">
            <iframe src="/drawmylife" className="min-w-full min-h-full" />
          </Hero.Card>
        </Hero.Visuals>
      </Hero.Root>

      <Techs.Root className="pb-10 pb:pb-16">
        <Techs.Title className="flex flex-col text-white">
          <span className="text-5xl">Techs e Ferramentas</span>
          <span className="text-sm tracking-wider opacity-80">
            que eu trabalho
          </span>
        </Techs.Title>
        <div className="flex flex-col gap-4 lg:gap-8 mt-12 w-full transform -rotate-2">
          <Techs.Marquee speed={0.15} direction="left">
            <Techs.Item id="t1" name="React" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t2" name="Next.js" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t3" name="TypeScript" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t4" name="Tailwind CSS" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t5" name="Framer Motion" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t6" name="Node.js" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
          </Techs.Marquee>

          <Techs.Marquee speed={0.15} direction="right">
            <Techs.Item id="t7" name="PostgreSQL" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t8" name="Drizzle" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t9" name="Docker" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t10" name="Turborepo" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t11" name="VPS Config" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
            <Techs.Item id="t12" name="Git" />
            <span className="text-4xl md:text-6xl text-white/20">✦</span>
          </Techs.Marquee>
        </div>
      </Techs.Root>

      <Projects.Root className="pt-20 md:pt-32 pb-6 md:pb-12">
        <Projects.Header>Projetos</Projects.Header>
        <Projects.Grid>
          {mockProjects.map((project, index) => (
            <Projects.Card key={project.id} project={project} index={index} />
          ))}
        </Projects.Grid>
      </Projects.Root>

      <Events.Root className="relative z-10 bg-background rounded-t-[3rem] shadow-2xl overflow-hidden pt-24 md:pt-32 pb-32 md:pb-40">
        <Events.Header>
          <Events.Title>Eventos & Participações</Events.Title>
          <Events.Description>
            Alguns dos principais eventos e conferências que tive o privilégio
            de participar, aprender e absorver conhecimento.
          </Events.Description>
        </Events.Header>
        <Events.List>
          {mockEvents.map((event) => (
            <Events.Card key={event.id}>
              <Events.Image src={event.imageUrl} alt={event.title} />
              <Events.Content>
                <Events.Date>{event.date}</Events.Date>
                <Events.CardTitle className="group-hover:text-white">
                  {event.title}
                </Events.CardTitle>
              </Events.Content>
            </Events.Card>
          ))}
        </Events.List>
      </Events.Root>
    </main>
  );
}
