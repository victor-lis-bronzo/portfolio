import { checkIsAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FolderCode, Cpu, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const MODERATION_ACTIONS = [
  {
    title: "Postagens",
    description: "Gerenciar artigos e conteúdos do blog.",
    icon: FileText,
    href: "/cms/posts",
    color: "text-blue-500",
  },
  {
    title: "Projetos",
    description: "Adicionar ou editar projetos do portfólio.",
    icon: FolderCode,
    href: "/cms/projects",
    color: "text-purple-500",
  },
  {
    title: "Tecnologias",
    description: "Gerenciar a lista de stacks e ferramentas.",
    icon: Cpu,
    href: "/cms/techs",
    color: "text-emerald-500",
  },
  {
    title: "Usuários",
    description: "Administrar contas e permissões de acesso.",
    icon: Users,
    href: "/cms/users",
    color: "text-orange-500",
  },
];

export default async function CMS() {
  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo ao CMS. Escolha uma categoria para moderar os conteúdos do
            site.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MODERATION_ACTIONS.map((action) => (
            <Card
              key={action.title}
              className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/50 p-3 transition-colors group-hover:bg-primary/10">
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <CardTitle className="text-xl">{action.title}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link href={action.href}>
                    Acessar moderação
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}