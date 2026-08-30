import type { SceneWaypoint } from "./scene-waypoint";

export const SCENE_WAYPOINTS: SceneWaypoint[] = [
	{
		id: "OVERVIEW",
		position: { x: 12, y: 12, z: 12 },
		target: { x: 0, y: 0.8, z: 0.8 },
		zoom: 46,
		label: { en: "Overview", pt: "Visão Geral" },
	},
	{
		id: "DESK",
		position: { x: -9.2, y: 11.1, z: 6.4 },
		target: { x: -1.2, y: 1.1, z: -2.2 },
		zoom: 95,
		label: { en: "Developer Desk", pt: "Mesa do Desenvolvedor" },
	},
	{
		id: "IOT_BENCH",
		position: { x: 8, y: 6, z: 7 },
		target: { x: 3, y: 0.9, z: 2 },
		zoom: 95,
		label: { en: "IoT Bench", pt: "Bancada IoT" },
	},
	{
		id: "PRINTER_3D",
		position: { x: -5, y: 11.1, z: 6.4 },
		target: { x: 3, y: 1.1, z: -2.2 },
		zoom: 95,
		label: { en: "3D Printer", pt: "Impressora 3D" },
	},
	{
		// The board carries an embedded DOM panel (voxel-whiteboard.tsx), so this
		// waypoint is not just a framing choice: under an orthographic camera the
		// panel's on-screen size is `zoom * WHITEBOARD_PANEL_SCALE` CSS pixels per
		// authored pixel. Anything much below ~250 renders its controls at a few
		// pixels tall - unreadable and impossible to hit with a mouse.
		id: "WHITEBOARD_FOCUS",
		position: { x: 1.2, y: 5.2, z: 6.2 },
		target: { x: -2.5, y: 1.45, z: 2.2 },
		zoom: 280,
		label: { en: "Whiteboard", pt: "Quadro Branco" },
	},
	{
		id: "ETEC_STAGE",
		position: { x: 1.4, y: 7.6, z: 8.6 },
		target: { x: -5.7, y: 1.15, z: 1.2 },
		zoom: 90,
		label: { en: "Etec Graduation", pt: "Formatura Etec" },
	},
	{
		id: "ECOPLAY_ARCADE",
		position: { x: -1.6, y: 7.2, z: 8.4 },
		target: { x: 5.7, y: 1.1, z: 0.2 },
		zoom: 95,
		label: { en: "Eco-Play Machine", pt: "Máquina Eco-Play" },
	},
	{
		id: "IFSP_BOARD",
		position: { x: 0.6, y: 6.4, z: 3.4 },
		target: { x: -5.2, y: 2.25, z: -5.2 },
		zoom: 130,
		label: { en: "IFSP & Research", pt: "IFSP & Pesquisa" },
	},
	{
		id: "EVENTS_BOARD",
		position: { x: 0, y: 4.8, z: 4.0 },
		target: { x: -7.8, y: 1.8, z: 4.0 },
		zoom: 100,
		label: "Eventos Tech",
	},
];
