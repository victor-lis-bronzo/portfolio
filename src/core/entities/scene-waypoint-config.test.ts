import { describe, expect, it } from "vitest";
import type { SceneWaypoint, SceneWaypointId } from "./scene-waypoint";
import { SCENE_WAYPOINTS } from "./scene-waypoint-config";

// Vector maths is duplicated here on purpose: the project's dependency
// direction is features -> core, never the inverse, so a core/entities test
// must not import helpers from features/scene-3d/lib.
const NEAR = 0.1; // mirrors scene-camera-rig.tsx
const ROOM_MIN: [number, number, number] = [-8, 0, -6];
const ROOM_MAX: [number, number, number] = [8, 4.2, 8];

function viewDirection(waypoint: SceneWaypoint) {
	const x = waypoint.target.x - waypoint.position.x;
	const y = waypoint.target.y - waypoint.position.y;
	const z = waypoint.target.z - waypoint.position.z;
	const length = Math.sqrt(x * x + y * y + z * z);

	return { x: x / length, y: y / length, z: z / length };
}

/** Ray/AABB slab test: distance from the camera to the room along the view ray. */
function distanceToRoom(waypoint: SceneWaypoint) {
	const direction = viewDirection(waypoint);
	const origin = [
		waypoint.position.x,
		waypoint.position.y,
		waypoint.position.z,
	];
	const axes = [direction.x, direction.y, direction.z];
	let entry = Number.NEGATIVE_INFINITY;

	for (let axis = 0; axis < 3; axis += 1) {
		const first = (ROOM_MIN[axis] - origin[axis]) / axes[axis];
		const second = (ROOM_MAX[axis] - origin[axis]) / axes[axis];

		entry = Math.max(entry, Math.min(first, second));
	}

	return entry;
}

const ALL_IDS: SceneWaypointId[] = [
	"OVERVIEW",
	"DESK",
	"IOT_BENCH",
	"PRINTER_3D",
	"WHITEBOARD_FOCUS",
	"ETEC_STAGE",
	"ECOPLAY_ARCADE",
	"IFSP_BOARD",
];

describe("SCENE_WAYPOINTS", () => {
	it("has exactly 8 entries", () => {
		expect(SCENE_WAYPOINTS).toHaveLength(8);
	});

	it("contains every SceneWaypointId exactly once", () => {
		const ids = SCENE_WAYPOINTS.map((waypoint) => waypoint.id);

		for (const id of ALL_IDS) {
			expect(ids.filter((current) => current === id)).toHaveLength(1);
		}
	});

	it("has finite position and target coordinates for every entry", () => {
		for (const waypoint of SCENE_WAYPOINTS) {
			expect(Number.isFinite(waypoint.position.x)).toBe(true);
			expect(Number.isFinite(waypoint.position.y)).toBe(true);
			expect(Number.isFinite(waypoint.position.z)).toBe(true);
			expect(Number.isFinite(waypoint.target.x)).toBe(true);
			expect(Number.isFinite(waypoint.target.y)).toBe(true);
			expect(Number.isFinite(waypoint.target.z)).toBe(true);
		}
	});

	it("views every waypoint from above and from the +Z side", () => {
		for (const waypoint of SCENE_WAYPOINTS) {
			expect(waypoint.position.y).toBeGreaterThan(waypoint.target.y);
			expect(waypoint.position.z).toBeGreaterThan(waypoint.target.z);
		}
	});

	it("mixes mirrored and standard camera angles", () => {
		const mirrored = SCENE_WAYPOINTS.filter(
			(waypoint) => waypoint.position.x < waypoint.target.x,
		);
		const standard = SCENE_WAYPOINTS.filter(
			(waypoint) => waypoint.position.x > waypoint.target.x,
		);

		expect(mirrored.length).toBeGreaterThanOrEqual(2);
		expect(standard.length).toBeGreaterThanOrEqual(2);
	});

	// Per-axis bounds, not |value|: the room is no longer symmetric in z
	// (it grew only towards +Z, the back wall stayed at z = -6).
	it("keeps every target inside the walls", () => {
		for (const waypoint of SCENE_WAYPOINTS) {
			expect(waypoint.target.x).toBeGreaterThan(-7.5);
			expect(waypoint.target.x).toBeLessThan(7.5);
			expect(waypoint.target.z).toBeGreaterThan(-5.9);
			expect(waypoint.target.z).toBeLessThan(7.5);
		}
	});

	it("never views a side wall edge-on", () => {
		for (const waypoint of SCENE_WAYPOINTS) {
			const direction = viewDirection(waypoint);

			expect(Math.abs(direction.x)).toBeGreaterThan(0.15);
		}
	});

	it("keeps the camera outside the near clip range of the room", () => {
		for (const waypoint of SCENE_WAYPOINTS) {
			expect(distanceToRoom(waypoint)).toBeGreaterThan(NEAR);
		}
	});
});
