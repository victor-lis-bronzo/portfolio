import type { StoryStep } from "./story-step";

export type StoryScriptId =
	| "DEV_DESK_GIT_ASSETS"
	| "IOT_BENCH_ECO_PLAY"
	| "SOLID_ARCHITECTURE";

export interface StoryScript {
	id: StoryScriptId;
	title: string;
	subtitle?: string;
	steps: StoryStep[];
}
