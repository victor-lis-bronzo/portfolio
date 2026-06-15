import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/modules/header";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victor Lis Bronzo | Full-Stack Developer",
  description:
    "Explore o portfolio de Victor Lis Bronzo, um desenvolvedor Full-Stack especializado em desenvolvimento moderno, criando aplicações de alto desempenho e soluções digitais elegantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header.Root>
          <Header.Logo />

          <Header.Nav>
            {/* <Header.Item href="#hero" active>
              Início
            </Header.Item> */}
            {/* <Header.Item href="#techs">Tecnologias</Header.Item>
            <Header.Item href="#projects">Projetos</Header.Item>
            <Header.Item href="#events">Eventos</Header.Item> */}
          </Header.Nav>

          <Header.Actions>
            <div className="hidden sm:flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/victor-lis-bronzo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com/in/victor-lis-bronzo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </Button>
            </div>

            <Header.Account />
            {/* 
            <MagneticButton className="text-sm px-4 py-2 cursor-pointer">
              Entrar em contato
            </MagneticButton> */}
          </Header.Actions>
        </Header.Root>

        {children}
      </body>
    </html>
  );
}
