import type { StoryScript } from "@/core/entities";

const CORE_COLOR = "#4f46e5";
const INTERFACE_COLOR = "#0f766e";

export const SOLID_ARCHITECTURE: StoryScript = {
	id: "SOLID_ARCHITECTURE",
	title: "O estúdio é a arquitetura",
	subtitle: "Clean Architecture e SOLID aplicados neste próprio portfólio",
	steps: [
		{
			id: "studio-intro",
			waypointId: "OVERVIEW",
			speech:
				"Dá um passo atrás comigo. Esse estúdio inteiro que você está vendo é uma " +
				"Clean Architecture: cada móvel é uma feature, e nenhum deles conhece as " +
				"tripas do outro. Vou desenhar isso no quadro.",
			diagramElements: [],
			durationMs: 6500,
		},
		{
			id: "layers",
			waypointId: "WHITEBOARD_FOCUS",
			speech:
				"Três camadas. No centro, o `core`: entidades, dados estáticos e " +
				"interfaces — zero React, zero DOM, zero Three.js. Em volta, `features` e " +
				"`shared`. E a regra de ouro: seta só aponta para dentro. O `core` nunca " +
				"importa uma feature, então ele continua testável sozinho, num arquivo de " +
				"teste que não precisa de navegador.",
			durationMs: 10000,
			diagramElements: [
				{
					id: "solid-architecture-layers-features-box",
					type: "box",
					x: 120,
					y: 90,
					width: 200,
					height: 70,
					label: "features/",
					delayMs: 0,
				},
				{
					id: "solid-architecture-layers-shared-box",
					type: "box",
					x: 480,
					y: 90,
					width: 200,
					height: 70,
					label: "shared/",
					delayMs: 200,
				},
				{
					id: "solid-architecture-layers-core-box",
					type: "box",
					x: 300,
					y: 320,
					width: 200,
					height: 70,
					label: "core/",
					color: CORE_COLOR,
					delayMs: 400,
				},
				{
					id: "solid-architecture-layers-features-arrow",
					type: "arrow",
					x: 250,
					y: 170,
					width: 130,
					height: 140,
					delayMs: 600,
				},
				{
					id: "solid-architecture-layers-shared-arrow",
					type: "arrow",
					x: 560,
					y: 170,
					width: -130,
					height: 140,
					delayMs: 800,
				},
				{
					id: "solid-architecture-layers-rule-text",
					type: "text",
					x: 180,
					y: 450,
					label: "Dependência sempre para dentro",
					delayMs: 1000,
				},
			],
		},
		{
			id: "dip-interfaces",
			waypointId: "WHITEBOARD_FOCUS",
			speech:
				"E é aqui que o D do SOLID deixa de ser slide. Essas três interfaces vivem " +
				"no `core`. Eu, o mascote, movo a câmera pela `ICameraController` e desenho " +
				"neste quadro pela `IWhiteboardDriver` — sem nunca saber que existe um " +
				"Three.js ou um Rough.js do outro lado. Trocar a implementação não me " +
				"obriga a reescrever nada.",
			durationMs: 11000,
			diagramElements: [
				{
					id: "solid-architecture-dip-interfaces-camera-badge",
					type: "badge",
					x: 180,
					y: 90,
					width: 440,
					height: 60,
					label: "ICameraController",
					color: INTERFACE_COLOR,
					delayMs: 0,
				},
				{
					id: "solid-architecture-dip-interfaces-whiteboard-badge",
					type: "badge",
					x: 180,
					y: 190,
					width: 440,
					height: 60,
					label: "IWhiteboardDriver",
					color: INTERFACE_COLOR,
					delayMs: 250,
				},
				{
					id: "solid-architecture-dip-interfaces-orchestrator-badge",
					type: "badge",
					x: 180,
					y: 290,
					width: 440,
					height: 60,
					label: "IStoryOrchestrator",
					color: INTERFACE_COLOR,
					delayMs: 500,
				},
				{
					id: "solid-architecture-dip-interfaces-dip-text",
					type: "text",
					x: 260,
					y: 430,
					label: "DIP na prática",
					delayMs: 750,
				},
			],
		},
		{
			id: "closing",
			waypointId: "OVERVIEW",
			speech:
				"Fim do tour. Se você quer ver o mesmo rigor em texto — projetos, métricas " +
				"e stack — a aba Recrutador tem tudo em HTML puro, indexável e legível por " +
				"ATS. Foi feita para ser lida por gente com pressa e por robô também.",
		},
	],
};
