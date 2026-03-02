"use client";

import { Hero } from "@/modules/hero";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

export default async function Home() {
  const processedSvg = await fetch(
    "https://gitassets.victorlisbronzo.me/api/card/cmjhew7bb00032ajvo8q4vzpw",
  )
    .then((res) => res.text())
    .catch((e) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 522 220" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="margin: auto; display: block;"></svg >`);

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

          <Hero.Title>
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
                <span>Ver no LinkedIn</span>
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
                <span>Ver no GitHub</span>
              </Link>
            </Button>
          </Hero.Actions>
        </Hero.Content>

        <Hero.Visuals className="max-[500px]:hidden">
          <Hero.Card>
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

      <HorizontalScroll.Root className="mt-24 md:mt-32">
        <HorizontalScroll.Header>
          <HorizontalScroll.Title>
            Meus Projetos
          </HorizontalScroll.Title>
          <HorizontalScroll.Description>
            Aqui estão alguns dos projetos aos quais me dediquei recentemente.
            Role a página para explorar um pouco mais sobre cada um.
          </HorizontalScroll.Description>
        </HorizontalScroll.Header>

        <HorizontalScroll.Content>
          {[1, 2, 3, 4, 5].map((i) => (
            <HorizontalScroll.Card key={i}>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Projeto {i}</h3>
                  <p className="text-gray-300/80 leading-relaxed">
                    Uma breve descrição do projeto, destacando os desafios técnicos resolvidos e o impacto focado na experiência do usuário.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap mt-6">
                  <span className="text-xs font-medium px-3 py-1 bg-white/10 text-white rounded-full border border-white/5">React</span>
                  <span className="text-xs font-medium px-3 py-1 bg-white/10 text-white rounded-full border border-white/5">Next.js</span>
                  <span className="text-xs font-medium px-3 py-1 bg-white/10 text-white rounded-full border border-white/5">Tailwind</span>
                </div>
              </div>
            </HorizontalScroll.Card>
          ))}
        </HorizontalScroll.Content>
      </HorizontalScroll.Root>
    </main>
  );
}
