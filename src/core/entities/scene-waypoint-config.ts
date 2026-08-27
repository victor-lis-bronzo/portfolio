import type { SceneWaypoint } from "./scene-waypoint";

export const SCENE_WAYPOINTS: SceneWaypoint[] = [
	{
		id: "OVERVIEW",
		position: { x: 10, y: 10, z: 10 },
		target: { x: 0, y: 0, z: 0 },
		zoom: 65,
		label: "Visão Geral",
	},
	{
		id: "DESK",
		position: { x: -6, y: 6, z: 6 },
		target: { x: -3, y: 0, z: 0 },
		zoom: 95,
		label: "Mesa do Desenvolvedor",
	},
	{
		id: "IOT_BENCH",
		position: { x: 6, y: 6, z: 6 },
		target: { x: 3, y: 0, z: 0 },
		zoom: 95,
		label: "Bancada IoT",
	},
	{
		id: "PRINTER_3D",
		position: { x: 3, y: 6, z: -6 },
		target: { x: 0, y: 0, z: -3 },
		zoom: 95,
		label: "Impressora 3D",
	},
	{
		id: "WHITEBOARD_FOCUS",
		position: { x: 3, y: 6, z: 6 },
		target: { x: 0, y: 0, z: 3 },
		zoom: 95,
		label: "Quadro Branco",
	},
];
