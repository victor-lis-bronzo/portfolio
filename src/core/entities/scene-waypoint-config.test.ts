import { describe, expect, it } from "vitest";
import type { SceneWaypointId } from "./scene-waypoint";
import { SCENE_WAYPOINTS } from "./scene-waypoint-config";

const ALL_IDS: SceneWaypointId[] = [
	"OVERVIEW",
	"DESK",
	"IOT_BENCH",
	"PRINTER_3D",
	"WHITEBOARD_FOCUS",
];

describe("SCENE_WAYPOINTS", () => {
	it("has exactly 5 entries", () => {
		expect(SCENE_WAYPOINTS).toHaveLength(5);
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
});
