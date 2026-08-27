import type { StoryScript, StoryScriptId } from "@/core/entities";
import { DEV_DESK_GIT_ASSETS } from "./dev-desk-git-assets";
import { IOT_BENCH_ECO_PLAY } from "./iot-bench-eco-play";
import { SOLID_ARCHITECTURE } from "./solid-architecture";

export { IDLE_BOARD_DIAGRAM } from "./idle-board";

export const STORY_SCRIPTS: StoryScript[] = [
	DEV_DESK_GIT_ASSETS,
	IOT_BENCH_ECO_PLAY,
	SOLID_ARCHITECTURE,
];

export function findStoryScript(id: StoryScriptId): StoryScript | undefined {
	return STORY_SCRIPTS.find((script) => script.id === id);
}
