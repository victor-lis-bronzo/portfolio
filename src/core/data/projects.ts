import type { Project } from "@/core/entities";

export const projects: Project[] = [
	{
		id: "git-assets",
		title: "Git Assets",
		summary:
			"Micro-SaaS para personalização de perfis GitHub com assets SVG dinâmicos. " +
			"Reestruturado como monorepo (pnpm workspaces + Turborepo) com pacotes de " +
			"responsabilidade estrita — database, core, api e web — para maximizar o uso " +
			"de Server Actions do Next.js consumindo a lógica de negócio diretamente.",
		impact:
			"Evoluído da v1 (validação de hipótese) para uma arquitetura modular v2",
		stack: ["Next.js", "TypeScript", "Prisma", "Turborepo", "pnpm workspaces"],
		role: "Autor e mantenedor",
		href: "https://gitassets.victorlisbronzo.me",
		repoHref: "https://github.com/victor-lis-bronzo/gitassets",
		highlighted: true,
	},
	{
		id: "eco-play",
		title: "Eco-Play",
		summary:
			"TCC e projeto de iniciação científica: um coletor gamificado de tampinhas " +
			"plásticas (inspirado em jogos de basquete) para incentivar reciclagem em " +
			"escolas, com contagem em tempo real via ESP32/Arduino e painel web de " +
			"monitoramento.",
		impact:
			"Pesquisa de campo com 135 pessoas: 98,5% participariam da forma gamificada de descarte",
		stack: ["Next.js", "TypeScript", "ESP32", "Arduino", "MQTT"],
		role: "Idealizador e desenvolvedor",
		href: "https://eco-play.vercel.app",
		repoHref: "https://github.com/victor-lis-bronzo/EcoPlay-Web",
		highlighted: true,
	},
	{
		id: "in-orbit",
		title: "In.Orbit",
		summary:
			"Aplicação full-stack para organização e acompanhamento de metas semanais, " +
			"construída durante a Next Level Week da Rocketseat (trilha JavaScript " +
			"Full-Stack Intermediário).",
		stack: ["Next.js", "TypeScript", "Node.js", "Prisma"],
		role: "Full-stack Developer",
		repoHref: "https://github.com/victor-lis-bronzo/In.Orbit-Web",
		highlighted: true,
	},
	{
		id: "langclips",
		title: "LangClips",
		summary:
			"Plataforma educacional SaaS em monorepo (Next.js/NestJS), com processamento " +
			"assíncrono de mídias pesadas via Redis (BullMQ), transcrição automática com " +
			"Whisper AI e resiliência offline-first usando IndexedDB.",
		stack: ["Next.js", "NestJS", "Redis", "BullMQ", "Whisper AI", "IndexedDB"],
		role: "Full-stack Developer",
		repoHref: "https://github.com/victor-lis-bronzo/langclips",
	},
	{
		id: "codeup",
		title: "CodeUp",
		summary:
			"Plataforma para resolução de desafios de programação em Python, com " +
			"validação automática de submissões através de um validador isolado em PHP e " +
			"painel administrativo para gestão de desafios e casos de teste.",
		stack: [
			"Next.js",
			"TypeScript",
			"Fastify",
			"PostgreSQL",
			"Prisma",
			"Docker",
		],
		role: "Full-stack Developer",
		repoHref: "https://github.com/victor-lis-bronzo/CodeUp",
	},
	{
		id: "legal-eagle-rag",
		title: "Legal Eagle RAG",
		summary:
			"Aplicação RAG (Retrieval-Augmented Generation) para documentos legais, " +
			"construída em workshop do GDG sobre Google Cloud Platform: Cloud Storage e " +
			"Firestore como vector database, Cloud Run acionado via Eventarc, e Vertex " +
			"AI/LangChain orquestrando o LLM.",
		stack: [
			"GCP",
			"Vertex AI",
			"LangChain",
			"Cloud Run",
			"Firestore",
			"Docker",
		],
		role: "Desenvolvedor",
		repoHref: "https://github.com/victor-lis-bronzo/legal-eagle-rag-review",
	},
];
