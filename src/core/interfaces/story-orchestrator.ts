import type { StoryScript, StoryScriptId } from "../entities/story-script";
import type { StoryStep } from "../entities/story-step";

export interface IStoryOrchestrator {
	play(scriptId: StoryScriptId): Promise<void>;
	next(): void;
	stop(): void;
	getActiveScript(): StoryScript | null;
	getActiveStep(): StoryStep | null;
	isPlaying(): boolean;
}
