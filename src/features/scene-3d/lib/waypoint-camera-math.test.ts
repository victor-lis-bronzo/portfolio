import { describe, expect, it } from "vitest";
import type { Vector3Tuple } from "@/core/entities/scene-waypoint";
import {
	DEFAULT_SETTLE_EPSILON,
	dampVector3,
	isVector3Settled,
} from "./waypoint-camera-math";

function distance(a: Vector3Tuple, b: Vector3Tuple): number {
	return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

describe("dampVector3", () => {
	it("moves current strictly closer to target after one step", () => {
		const current: Vector3Tuple = { x: 0, y: 0, z: 0 };
		const target: Vector3Tuple = { x: 10, y: 10, z: 10 };

		const next = dampVector3(current, target, 10, 1 / 60);

		expect(distance(next, target)).toBeLessThan(distance(current, target));
	});

	it("converges to within default epsilon after ~60 steps", () => {
		let current: Vector3Tuple = { x: 0, y: 5, z: -8 };
		const target: Vector3Tuple = { x: 10, y: 10, z: 10 };
		const delta = 1 / 60;
		const lambda = 10;

		for (let i = 0; i < 60; i++) {
			current = dampVector3(current, target, lambda, delta);
		}

		expect(isVector3Settled(current, target)).toBe(true);
	});

	it("collapses distance to ~0 under a very large delta (reduced-motion snap)", () => {
		const current: Vector3Tuple = { x: -20, y: 3, z: 7 };
		const target: Vector3Tuple = { x: 5, y: 5, z: 5 };

		const next = dampVector3(current, target, 10, 1000);

		expect(distance(next, target)).toBeLessThan(1e-6);
	});
});

describe("isVector3Settled", () => {
	it("returns false when clearly far apart", () => {
		const current: Vector3Tuple = { x: 0, y: 0, z: 0 };
		const target: Vector3Tuple = { x: 10, y: 10, z: 10 };

		expect(isVector3Settled(current, target)).toBe(false);
	});

	it("returns true when within the default epsilon (boundary case)", () => {
		const target: Vector3Tuple = { x: 1, y: 1, z: 1 };
		const current: Vector3Tuple = {
			x: 1 + DEFAULT_SETTLE_EPSILON,
			y: 1,
			z: 1,
		};

		expect(isVector3Settled(current, target)).toBe(true);
	});

	it("returns true when exactly equal", () => {
		const target: Vector3Tuple = { x: 2, y: -3, z: 4 };
		expect(isVector3Settled({ ...target }, target)).toBe(true);
	});
});
