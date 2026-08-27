import type { StoryScript } from "@/core/entities";

const HARDWARE_COLOR = "#f97316";
const HIGHLIGHT_COLOR = "#16a34a";

export const IOT_BENCH_ECO_PLAY: StoryScript = {
	id: "IOT_BENCH_ECO_PLAY",
	title: "A bancada IoT",
	subtitle: "Eco-Play: tampinha, cesta e telemetria em tempo real",
	steps: [
		{
			id: "bench-intro",
			waypointId: "IOT_BENCH",
			speech:
				"Essa bancada é o lado que solda. ESP32, jumpers, protoboard e um sensor " +
				"que aprendeu a contar tampinha de plástico. Deixa eu te mostrar o que " +
				"saiu daqui.",
			diagramElements: [],
			durationMs: 6000,
		},
		{
			id: "eco-play-pitch",
			waypointId: "IOT_BENCH",
			speech:
				"O Eco-Play foi meu TCC e também projeto de iniciação científica: um " +
				"coletor gamificado de tampinhas, inspirado naquelas cestas de basquete de " +
				"fliperama, pensado para escolas. Cada arremesso é contado pelo hardware e " +
				"aparece na hora num painel web.",
			projectId: "eco-play",
			durationMs: 9000,
		},
		{
			id: "pipeline-board",
			waypointId: "WHITEBOARD_FOCUS",
			speech:
				"O caminho do dado é este aqui no quadro. O ESP32 publica o evento de " +
				"arremesso via MQTT, o broker distribui, o servidor empurra por WebSocket e " +
				"o painel em Next.js atualiza sem ninguém apertar F5. Protocolo leve na " +
				"ponta, tempo real no navegador.",
			projectId: "eco-play",
			durationMs: 10000,
			diagramElements: [
				{
					id: "iot-bench-eco-play-pipeline-board-esp32-box",
					type: "box",
					x: 20,
					y: 190,
					width: 140,
					height: 80,
					label: "ESP32",
					color: HARDWARE_COLOR,
					delayMs: 0,
				},
				{
					id: "iot-bench-eco-play-pipeline-board-mqtt-arrow",
					type: "arrow",
					x: 165,
					y: 230,
					width: 35,
					height: 0,
					delayMs: 200,
				},
				{
					id: "iot-bench-eco-play-pipeline-board-broker-box",
					type: "box",
					x: 205,
					y: 190,
					width: 140,
					height: 80,
					label: "Broker MQTT",
					delayMs: 350,
				},
				{
					id: "iot-bench-eco-play-pipeline-board-socket-arrow",
					type: "arrow",
					x: 350,
					y: 230,
					width: 35,
					height: 0,
					delayMs: 550,
				},
				{
					id: "iot-bench-eco-play-pipeline-board-websocket-box",
					type: "box",
					x: 390,
					y: 190,
					width: 140,
					height: 80,
					label: "WebSocket",
					delayMs: 700,
				},
				{
					id: "iot-bench-eco-play-pipeline-board-web-arrow",
					type: "arrow",
					x: 535,
					y: 230,
					width: 35,
					height: 0,
					delayMs: 900,
				},
				{
					id: "iot-bench-eco-play-pipeline-board-nextjs-box",
					type: "box",
					x: 575,
					y: 190,
					width: 140,
					height: 80,
					label: "Next.js",
					delayMs: 1050,
				},
			],
		},
		{
			id: "field-research",
			waypointId: "WHITEBOARD_FOCUS",
			speech:
				"E teve validação de campo, não só demo bonita: numa pesquisa com 135 " +
				"pessoas, 98,5% disseram que participariam da forma gamificada de descarte. " +
				"Esse número é o que justifica o projeto inteiro — hardware sem hipótese " +
				"testada é hobby.",
			projectId: "eco-play",
			durationMs: 9000,
			diagramElements: [
				{
					id: "iot-bench-eco-play-field-research-sample-badge",
					type: "badge",
					x: 120,
					y: 120,
					width: 240,
					height: 90,
					label: "135 pessoas",
					delayMs: 0,
				},
				{
					id: "iot-bench-eco-play-field-research-adoption-badge",
					type: "badge",
					x: 440,
					y: 120,
					width: 240,
					height: 90,
					label: "98,5% adeririam",
					color: HIGHLIGHT_COLOR,
					delayMs: 300,
				},
				{
					id: "iot-bench-eco-play-field-research-conclusion-text",
					type: "text",
					x: 150,
					y: 320,
					label: "Pesquisa de campo antes do protótipo",
					delayMs: 600,
				},
			],
		},
	],
};
