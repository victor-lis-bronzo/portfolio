import type { DiagramElement } from "./diagram-element";
import type { SceneWaypointId } from "./scene-waypoint";

export interface StoryStep {
	id: string;
	waypointId: SceneWaypointId;
	speech: string;
	/**
	 * Tri-state board semantics: `undefined` keeps whatever is on the board,
	 * `[]` clears it, and a non-empty array replaces its contents.
	 */
	diagramElements?: DiagramElement[];
	/** When set, the step auto-advances after this delay (autoplay only). */
	durationMs?: number;
	/** Id of a Project in core/data/projects.ts referenced by this step. */
	projectId?: string;
}
