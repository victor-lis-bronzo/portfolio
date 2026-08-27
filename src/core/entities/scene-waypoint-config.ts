import type { SceneWaypoint } from "./scene-waypoint";

export const SCENE_WAYPOINTS: SceneWaypoint[] = [
	{
		id: "OVERVIEW",
		position: { x: 12, y: 12, z: 12 },
		target: { x: 0, y: 0.8, z: 0 },
		zoom: 55,
		label: "Visão Geral",
	},
	{
		id: "DESK",
		position: { x: 2.8, y: 6.1, z: 2.0 },
		target: { x: -1.2, y: 1.1, z: -2.2 },
		zoom: 95,
		label: "Mesa do Desenvolvedor",
	},
	{
		id: "IOT_BENCH",
		position: { x: 8, y: 6, z: 7 },
		target: { x: 3, y: 0.9, z: 2 },
		zoom: 95,
		label: "Bancada IoT",
	},
	{
		id: "PRINTER_3D",
		position: { x: 7, y: 6, z: 2 },
		target: { x: 3, y: 1.1, z: -2.2 },
		zoom: 95,
		label: "Impressora 3D",
	},
	{
		id: "WHITEBOARD_FOCUS",
		position: { x: 1.2, y: 5.2, z: 6.2 },
		target: { x: -2.5, y: 1.45, z: 2.2 },
		zoom: 90,
		label: "Quadro Branco",
	},
];
