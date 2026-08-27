import type { SceneWaypointId } from "../entities/scene-waypoint";

export interface ICameraController {
	// Resolves when the transition ends, or instantly under reduced motion.
	focusWaypoint(waypointId: SceneWaypointId): Promise<void>;
	getCurrentWaypoint(): SceneWaypointId;
	isTransitioning(): boolean;
}
