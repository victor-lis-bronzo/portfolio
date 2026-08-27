import type { DiagramElement } from "@/core/entities";

/**
 * The diagram shown on the in-scene whiteboard while no script is playing.
 * Ids are prefixed with `idle-` so they never collide with story script ids.
 */
export const IDLE_BOARD_DIAGRAM: DiagramElement[] = [
	{
		id: "idle-frontend-box",
		type: "box",
		x: 60,
		y: 80,
		width: 160,
		height: 70,
		label: "Frontend",
		delayMs: 0,
	},
	{
		id: "idle-backend-box",
		type: "box",
		x: 420,
		y: 80,
		width: 160,
		height: 70,
		label: "Backend",
		delayMs: 200,
	},
	{
		id: "idle-connector-arrow",
		type: "arrow",
		x: 220,
		y: 115,
		width: 200,
		height: 0,
		delayMs: 400,
	},
	{
		id: "idle-solid-badge",
		type: "badge",
		x: 260,
		y: 220,
		width: 100,
		height: 36,
		label: "SOLID",
		color: "#4f46e5",
		delayMs: 600,
	},
	{
		id: "idle-architecture-label",
		type: "text",
		x: 200,
		y: 320,
		label: "Arquitetura Limpa",
		delayMs: 800,
	},
];
