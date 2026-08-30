import type { Localized } from "@/shared/i18n/types";

export type SceneWaypointId =
	| "OVERVIEW"
	| "DESK"
	| "IOT_BENCH"
	| "PRINTER_3D"
	| "WHITEBOARD_FOCUS"
	| "ETEC_STAGE"
	| "ECOPLAY_ARCADE"
	| "IFSP_BOARD"
	| "EVENTS_BOARD";

export interface Vector3Tuple {
	x: number;
	y: number;
	z: number;
}

export interface SceneWaypoint {
	id: SceneWaypointId;
	position: Vector3Tuple;
	target: Vector3Tuple;
	zoom?: number;
	/** Reader-facing name of the waypoint, authored in both site languages. */
	label?: Localized;
}
