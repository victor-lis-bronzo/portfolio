import type { Localized } from "@/shared/i18n/types";
import type { DiagramElement } from "./diagram-element";
import type { SceneWaypointId } from "./scene-waypoint";

export interface StoryCta {
	label: Localized;
	href: string;
}

export interface StoryStep {
	id: string;
	waypoint: SceneWaypointId;
	mascotDialogue: Localized;
	diagramElements?: DiagramElement[];
	ctas?: StoryCta[];
	draft?: boolean;
	sceneCue?: string;
	cameraDwellMs?: number;
}

export interface StoryChapter {
	id: string;
	title: Localized;
	description?: Localized;
	stepIds: string[];
	entryWaypoint?: SceneWaypointId;
}

export interface StoryScript {
	chapters: StoryChapter[];
	steps: StoryStep[];
	version?: string;
}
