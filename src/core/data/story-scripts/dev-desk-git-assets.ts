import type { StoryScript } from "@/core/entities";

const LAYER_COLOR = "#0ea5e9";

export const DEV_DESK_GIT_ASSETS: StoryScript = {
	id: "DEV_DESK_GIT_ASSETS",
	title: "A mesa do dev",
	subtitle: "Git Assets: de uma hipótese validada a um monorepo modular",
	steps: [
		{
			id: "desk-intro",
			waypointId: "DESK",
			speech:
				"Bem-vindo ao estúdio! Essa é a mesa onde a maior parte do código nasce: " +
				"dois monitores, teclado gasto e um projeto que já passou por uma reescrita " +
				"inteira. Vem comigo que eu te conto essa história.",
			diagramElements: [],
			durationMs: 6500,
		},
		{
			id: "git-assets-pitch",
			waypointId: "DESK",
			speech:
				"O Git Assets é um micro-SaaS que gera assets SVG dinâmicos para deixar " +
				"perfis do GitHub com cara de gente grande. A v1 existiu só para validar a " +
				"hipótese — e validou. O problema é que o código tinha crescido sem " +
				"fronteiras claras, então a v2 começou pela arquitetura, não pela feature.",
			projectId: "git-assets",
			durationMs: 8500,
		},
		{
			id: "monorepo-board",
			waypointId: "WHITEBOARD_FOCUS",
			speech:
				"Olha no quadro: pnpm workspaces com Turborepo orquestrando quatro pacotes " +
				"de responsabilidade estrita. O `web` fala com o `api`, o `api` fala com o " +
				"`core`, e só o `database` toca o Prisma. Como a lógica de negócio vive no " +
				"`core`, as Server Actions do Next.js consomem ela direto — sem uma camada " +
				"de HTTP inventada só para atravessar a própria aplicação.",
			projectId: "git-assets",
			durationMs: 10000,
			diagramElements: [
				{
					id: "dev-desk-git-assets-monorepo-board-web-box",
					type: "box",
					x: 20,
					y: 200,
					width: 140,
					height: 80,
					label: "web",
					delayMs: 0,
				},
				{
					id: "dev-desk-git-assets-monorepo-board-web-arrow",
					type: "arrow",
					x: 165,
					y: 240,
					width: 35,
					height: 0,
					delayMs: 200,
				},
				{
					id: "dev-desk-git-assets-monorepo-board-api-box",
					type: "box",
					x: 205,
					y: 200,
					width: 140,
					height: 80,
					label: "api",
					delayMs: 350,
				},
				{
					id: "dev-desk-git-assets-monorepo-board-api-arrow",
					type: "arrow",
					x: 350,
					y: 240,
					width: 35,
					height: 0,
					delayMs: 550,
				},
				{
					id: "dev-desk-git-assets-monorepo-board-core-box",
					type: "box",
					x: 390,
					y: 200,
					width: 140,
					height: 80,
					label: "core",
					color: LAYER_COLOR,
					delayMs: 700,
				},
				{
					id: "dev-desk-git-assets-monorepo-board-core-arrow",
					type: "arrow",
					x: 535,
					y: 240,
					width: 35,
					height: 0,
					delayMs: 900,
				},
				{
					id: "dev-desk-git-assets-monorepo-board-database-box",
					type: "box",
					x: 575,
					y: 200,
					width: 140,
					height: 80,
					label: "database",
					delayMs: 1050,
				},
			],
		},
		{
			id: "monorepo-payoff",
			waypointId: "WHITEBOARD_FOCUS",
			speech:
				"O ganho prático não é estético: com as fronteiras desenhadas, dá para " +
				"trocar o banco ou publicar um novo tipo de asset mexendo em um pacote só. " +
				"É esse mesmo raciocínio que você está vendo aplicado neste portfólio.",
			projectId: "git-assets",
		},
	],
};
