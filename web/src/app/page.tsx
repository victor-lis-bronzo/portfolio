import { Hero } from "@/modules/hero";
import { Events } from "@/modules/events";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const mockEvents = [
  {
    id: "1",
    title: "Rocketseat Next Level Week",
    date: "Jun 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "React Conf Brasil",
    date: "Out 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "DevFest SP",
    date: "Dez 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Figma Config",
    date: "Fev 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
  },
];

export default async function Home() {
  const processedSvg = await fetch(
    "https://gitassets.victorlisbronzo.me/api/card/cmjhew7bb00032ajvo8q4vzpw",
  )
    .then((res) => res.text())
    .catch(
      (e) =>
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 522 220" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="margin: auto; display: block;"></svg >`,
    );

  // const processedSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 522 220" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="margin: auto; display: block;"></svg >`;

  const responsiveSvg = processedSvg
    .replace(/width="[^"]*"/, 'width="90%"')
    .replace(/height="[^"]*"/, 'height="90%"')
    .replace(
      "<svg",
      '<svg preserveAspectRatio="xMidYMid meet" style="margin: auto;"',
    );

  return (
    <main>
      <Hero.Root>
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
                href="https://github.com/victor-lis/victor-lis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-1 w-fit"
              >
                <Github className="h-5 w-5" />
                <span>Ver GitHub</span>
              </Link>
            </Button>
          </Hero.Actions>
        </Hero.Content>

        <Hero.Visuals className="max-[500px]:hidden">
          <Hero.Card className="w-full h-full">
            <div
              className={cn(
                "w-full h-full flex items-center justify-center pt-6",
              )}
            >
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: responsiveSvg }}
              />
            </div>
          </Hero.Card>
        </Hero.Visuals>
      </Hero.Root>

      {/* <section className="relative z-10 bg-background rounded-t-[3rem] shadow-2xl min-h-screen p-8 lg:p-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Sobre mim</h2>
          <p className="text-gray-400">
            Esta seção desliza sobre o Hero, criando o efeito &quot;Stacking
            Scroll Parallax&quot;. Continue rolando para ver a magia acontecer!
          </p>
          <div className="mt-12 space-y-8">
            <div className="h-64 rounded-2xl bg-white/5 border border-white/10"></div>
            <div className="h-64 rounded-2xl bg-white/5 border border-white/10"></div>
            <div className="h-64 rounded-2xl bg-white/5 border border-white/10"></div>
          </div>
        </div>
      </section> */}

      <div className="relative z-10 bg-background rounded-t-[3rem] shadow-2xl overflow-hidden pt-12">
        <div className="px-8 lg:px-24 w-full max-w-7xl mx-auto mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Eventos & Participações
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Alguns dos principais eventos e conferências que tive o privilégio
            de participar, aprender e compartilhar conhecimento.
          </p>
        </div>

        <Events.Root>
          <Events.List>
            {mockEvents.map((event) => (
              <Events.Card key={event.id}>
                <Events.Image src={event.imageUrl} alt={event.title} />
                <Events.Content>
                  <Events.Date>{event.date}</Events.Date>
                  <Events.Title>{event.title}</Events.Title>
                </Events.Content>
              </Events.Card>
            ))}
          </Events.List>
        </Events.Root>
      </div>
    </main>
  );
}
