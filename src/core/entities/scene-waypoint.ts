export type SceneWaypointId =
	| "OVERVIEW"
	| "DESK"
	| "IOT_BENCH"
	| "PRINTER_3D"
	| "WHITEBOARD_FOCUS";

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
	label?: string;
}
