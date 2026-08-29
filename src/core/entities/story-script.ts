import type { DiagramElement } from "./diagram-element";
import type { SceneWaypointId } from "./scene-waypoint";

export interface StoryCta {
	label: string;
	href: string;
}

export interface StoryStep {
	id: string;
	waypoint: SceneWaypointId;
	mascotDialogue: string;
	diagramElements?: DiagramElement[];
	cta?: StoryCta;
	draft?: boolean;
	sceneCue?: string;
	cameraDwellMs?: number;
}

export interface StoryChapter {
	id: string;
	title: string;
	description?: string;
	stepIds: string[];
	entryWaypoint?: SceneWaypointId;
}

export interface StoryScript {
	chapters: StoryChapter[];
	steps: StoryStep[];
	version?: string;
}
