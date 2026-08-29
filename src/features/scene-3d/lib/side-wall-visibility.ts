export type SideWallSide = "LEFT" | "RIGHT";

/**
 * Picks which of the two mutually exclusive side walls stays visible for a
 * given camera view direction.
 *
 * The room only has a left wall (x = -8) and a right wall (x = +8); the one
 * the camera looks *through* would sit in front of the scene, so it is hidden
 * (the classic isometric cutaway). The function is TOTAL: every input maps to
 * exactly one side, so the studio is never left with both laterals hidden.
 * `0` and `-0` resolve to "RIGHT" by definition, not to a third state.
 *
 * No hysteresis is needed around the `directionX === 0` singularity because
 * `use-camera-controller.ts` damps the camera position and the lookAt target
 * with the SAME lambda and the same delta every frame. That makes
 * `directionX(t)` a monotonic exponential between the old and the new pose, so
 * it crosses zero at most once per transition and cannot oscillate.
 * If position and lookAt ever start using different (or per-axis) lambdas,
 * that monotonicity assumption breaks and this needs a dead band.
 */
export function resolveSideWall(directionX: number): SideWallSide {
	return directionX < 0 ? "LEFT" : "RIGHT";
}
