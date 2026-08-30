import type { Project } from "@/core/entities";

export const projects: Project[] = [
	{
		id: "git-assets",
		title: { en: "Git Assets", pt: "Git Assets" },
		summary: {
			en:
				"Micro-SaaS that turns GitHub profiles into dynamic SVG assets. I rebuilt it " +
				"as a pnpm/Turborepo monorepo with strictly scoped packages — database, core, " +
				"api and web — so Next.js Server Actions call the business logic directly, " +
				"without an HTTP hop in the middle.",
			pt:
				"Micro-SaaS que transforma perfis do GitHub em assets SVG dinâmicos. " +
				"Reconstruí o projeto como monorepo pnpm/Turborepo com pacotes de " +
				"responsabilidade estrita — database, core, api e web — para que as Server " +
				"Actions do Next.js consumam a lógica de negócio direto, sem salto HTTP.",
		},
		impact: {
			en: "Taken from a v1 hypothesis test to a modular v2 architecture",
			pt: "Levado de um teste de hipótese (v1) a uma arquitetura modular (v2)",
		},
		stack: ["Next.js", "TypeScript", "Prisma", "Turborepo", "pnpm workspaces"],
		role: { en: "Author and maintainer", pt: "Autor e mantenedor" },
		href: "https://gitassets.victorlisbronzo.me",
		repoHref: "https://github.com/victor-lis-bronzo/gitassets",
		highlighted: true,
	},
	{
		id: "eco-play",
		title: { en: "Eco-Play", pt: "Eco-Play" },
		summary: {
			en:
				"A gamified bottle-cap collector — scored like an arcade basketball hoop — " +
				"built to make recycling worth doing in schools. ESP32/Arduino count the caps " +
				"in real time and stream to a web dashboard. It was my capstone project and " +
				"the basis of my undergraduate research.",
			pt:
				"Coletor gamificado de tampinhas plásticas — com o placar de uma cesta de " +
				"basquete — feito para tornar a reciclagem atraente nas escolas. ESP32/Arduino " +
				"contam em tempo real e transmitem para um painel web. Foi meu TCC e a base " +
				"da minha iniciação científica.",
		},
		impact: {
			en: "Top capstone grade; field survey of 135 people, 98.5% would recycle through the gamified flow",
			pt: "Nota máxima no TCC; pesquisa de campo com 135 pessoas, 98,5% reciclariam pelo fluxo gamificado",
		},
		stack: ["Next.js", "TypeScript", "ESP32", "Arduino", "MQTT"],
		role: { en: "Creator and developer", pt: "Idealizador e desenvolvedor" },
		href: "https://eco-play.vercel.app",
		repoHref: "https://github.com/victor-lis-bronzo/EcoPlay-Web",
		highlighted: true,
	},
	{
		id: "in-orbit",
		title: { en: "In.Orbit", pt: "In.Orbit" },
		summary: {
			en:
				"Full-stack app for setting and tracking weekly goals, built during " +
				"Rocketseat's Next Level Week (intermediate JavaScript full-stack track).",
			pt:
				"Aplicação full-stack para definir e acompanhar metas semanais, construída " +
				"na Next Level Week da Rocketseat (trilha JavaScript full-stack intermediário).",
		},
		stack: ["Next.js", "TypeScript", "Node.js", "Prisma"],
		role: { en: "Full-stack developer", pt: "Desenvolvedor full-stack" },
		repoHref: "https://github.com/victor-lis-bronzo/In.Orbit-Web",
		highlighted: true,
	},
	{
		id: "langclips",
		title: { en: "LangClips", pt: "LangClips" },
		summary: {
			en:
				"SaaS education platform in a Next.js/NestJS monorepo. Heavy media is " +
				"processed off the request path through Redis-backed BullMQ queues, " +
				"transcription runs on Whisper AI, and IndexedDB keeps the app usable " +
				"when the connection drops.",
			pt:
				"Plataforma educacional SaaS em monorepo Next.js/NestJS. Mídias pesadas são " +
				"processadas fora do request, em filas BullMQ sobre Redis; a transcrição roda " +
				"com Whisper AI; e o IndexedDB mantém a aplicação utilizável quando a conexão " +
				"cai.",
		},
		stack: ["Next.js", "NestJS", "Redis", "BullMQ", "Whisper AI", "IndexedDB"],
		role: { en: "Full-stack developer", pt: "Desenvolvedor full-stack" },
		repoHref: "https://github.com/victor-lis-bronzo/langclips",
	},
	{
		id: "codeup",
		title: { en: "CodeUp", pt: "CodeUp" },
		summary: {
			en:
				"Platform for Python coding challenges. Submissions are graded automatically " +
				"by an isolated PHP validator, with an admin panel for managing challenges " +
				"and test cases.",
			pt:
				"Plataforma de desafios de programação em Python. As submissões são corrigidas " +
				"automaticamente por um validador PHP isolado, com painel administrativo para " +
				"gerir desafios e casos de teste.",
		},
		stack: [
			"Next.js",
			"TypeScript",
			"Fastify",
			"PostgreSQL",
			"Prisma",
			"Docker",
		],
		role: { en: "Full-stack developer", pt: "Desenvolvedor full-stack" },
		repoHref: "https://github.com/victor-lis-bronzo/CodeUp",
	},
	{
		id: "legal-eagle-rag",
		title: { en: "Legal Eagle RAG", pt: "Legal Eagle RAG" },
		summary: {
			en:
				"Retrieval-Augmented Generation app for legal documents, built in a GDG " +
				"workshop on Google Cloud: Cloud Storage plus Firestore as the vector " +
				"database, Cloud Run triggered by Eventarc, and Vertex AI with LangChain " +
				"orchestrating the LLM.",
			pt:
				"Aplicação RAG (Retrieval-Augmented Generation) para documentos jurídicos, " +
				"construída em workshop do GDG sobre Google Cloud: Cloud Storage e Firestore " +
				"como vector database, Cloud Run acionado por Eventarc e Vertex AI com " +
				"LangChain orquestrando o LLM.",
		},
		stack: [
			"GCP",
			"Vertex AI",
			"LangChain",
			"Cloud Run",
			"Firestore",
			"Docker",
		],
		role: { en: "Developer", pt: "Desenvolvedor" },
		repoHref: "https://github.com/victor-lis-bronzo/legal-eagle-rag-review",
	},
];
