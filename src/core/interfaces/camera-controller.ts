import type { SceneWaypointId } from "../entities/scene-waypoint";

export interface ICameraController {
	// Resolves when the transition ends, or instantly under reduced motion.
	focusWaypoint(waypointId: SceneWaypointId): Promise<void>;
	// Returns the target/active waypoint, updated the moment a focus is
	// requested (i.e. on click) - not necessarily where the camera has
	// physically settled yet. Use isTransitioning() to know when the
	// camera has finished moving there.
	getCurrentWaypoint(): SceneWaypointId;
	isTransitioning(): boolean;
}
