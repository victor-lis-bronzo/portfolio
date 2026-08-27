import type { Vector3Tuple } from "@/core/entities/scene-waypoint";

export const DEFAULT_SETTLE_EPSILON = 0.001;

// Exponential damping toward a target value, frame-rate independent
// (same shape as maath's damp / drei's easing.damp).
export function dampVector3(
	current: Vector3Tuple,
	target: Vector3Tuple,
	lambda: number,
	delta: number,
): Vector3Tuple {
	const factor = Math.exp(-lambda * delta);

	return {
		x: target.x + (current.x - target.x) * factor,
		y: target.y + (current.y - target.y) * factor,
		z: target.z + (current.z - target.z) * factor,
	};
}

export function isVector3Settled(
	current: Vector3Tuple,
	target: Vector3Tuple,
	epsilon: number = DEFAULT_SETTLE_EPSILON,
): boolean {
	return (
		Math.abs(current.x - target.x) <= epsilon &&
		Math.abs(current.y - target.y) <= epsilon &&
		Math.abs(current.z - target.z) <= epsilon
	);
}
