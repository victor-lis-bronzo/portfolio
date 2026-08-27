import { describe, expect, it } from "vitest";
import { projects } from "@/core/data/projects";
import type { StoryScriptId } from "@/core/entities";
import { SCENE_WAYPOINTS } from "@/core/entities";
import { IDLE_BOARD_DIAGRAM } from "./idle-board";
import { findStoryScript, STORY_SCRIPTS } from "./index";

// Mirrors the viewBox of WhiteboardCanvas. Duplicated on purpose: the
// dependency direction is features -> core, never the inverse, so a core/data
// test must not import from features/whiteboard.
const VIEW_BOX_WIDTH = 800;
const VIEW_BOX_HEIGHT = 500;

const ALL_SCRIPT_IDS: StoryScriptId[] = [
	"DEV_DESK_GIT_ASSETS",
	"IOT_BENCH_ECO_PLAY",
	"SOLID_ARCHITECTURE",
];

const WAYPOINT_IDS = SCENE_WAYPOINTS.map((waypoint) => waypoint.id);
const PROJECT_IDS = projects.map((project) => project.id);

const ALL_STEPS = STORY_SCRIPTS.flatMap((script) => script.steps);
const ALL_ELEMENTS = ALL_STEPS.flatMap((step) => step.diagramElements ?? []);

describe("STORY_SCRIPTS", () => {
	it("has exactly 3 scripts", () => {
		expect(STORY_SCRIPTS).toHaveLength(3);
	});

	it("contains every StoryScriptId exactly once", () => {
		const ids = STORY_SCRIPTS.map((script) => script.id);

		for (const id of ALL_SCRIPT_IDS) {
			expect(ids.filter((current) => current === id)).toHaveLength(1);
		}
	});

	it("gives every script a title and at least one step", () => {
		for (const script of STORY_SCRIPTS) {
			expect(script.title.length).toBeGreaterThan(0);
			expect(script.steps.length).toBeGreaterThanOrEqual(1);
		}
	});

	it("keeps step ids unique within each script", () => {
		for (const script of STORY_SCRIPTS) {
			const ids = script.steps.map((step) => step.id);

			expect(new Set(ids).size).toBe(ids.length);
		}
	});

	it("gives every step a non-empty speech", () => {
		for (const step of ALL_STEPS) {
			expect(step.speech.trim().length).toBeGreaterThan(0);
		}
	});

	it("only references waypoints declared in SCENE_WAYPOINTS", () => {
		for (const step of ALL_STEPS) {
			expect(WAYPOINT_IDS).toContain(step.waypointId);
		}
	});

	it("only references projects declared in core/data/projects.ts", () => {
		for (const step of ALL_STEPS) {
			if (step.projectId !== undefined) {
				expect(PROJECT_IDS).toContain(step.projectId);
			}
		}
	});

	it("uses a positive durationMs whenever one is set", () => {
		for (const step of ALL_STEPS) {
			if (step.durationMs !== undefined) {
				expect(step.durationMs).toBeGreaterThan(0);
			}
		}
	});

	it("keeps every DiagramElement id unique globally across all scripts", () => {
		const ids = ALL_ELEMENTS.map((element) => element.id);

		expect(new Set(ids).size).toBe(ids.length);
	});

	it("keeps every DiagramElement inside the 800x500 viewBox", () => {
		for (const element of ALL_ELEMENTS) {
			expect(element.x + (element.width ?? 0)).toBeLessThanOrEqual(
				VIEW_BOX_WIDTH,
			);
			expect(element.y + (element.height ?? 0)).toBeLessThanOrEqual(
				VIEW_BOX_HEIGHT,
			);
		}
	});
});

describe("findStoryScript", () => {
	it("resolves every declared script id", () => {
		for (const id of ALL_SCRIPT_IDS) {
			expect(findStoryScript(id)?.id).toBe(id);
		}
	});

	it("returns undefined for an unknown id", () => {
		expect(findStoryScript("NOT_A_SCRIPT" as StoryScriptId)).toBeUndefined();
	});
});

describe("IDLE_BOARD_DIAGRAM", () => {
	it("is not empty", () => {
		expect(IDLE_BOARD_DIAGRAM.length).toBeGreaterThan(0);
	});

	it("keeps every element inside the 800x500 viewBox", () => {
		for (const element of IDLE_BOARD_DIAGRAM) {
			expect(element.x + (element.width ?? 0)).toBeLessThanOrEqual(
				VIEW_BOX_WIDTH,
			);
			expect(element.y + (element.height ?? 0)).toBeLessThanOrEqual(
				VIEW_BOX_HEIGHT,
			);
		}
	});

	it("does not collide with any story script element id", () => {
		const scriptIds = new Set(ALL_ELEMENTS.map((element) => element.id));

		for (const element of IDLE_BOARD_DIAGRAM) {
			expect(scriptIds.has(element.id)).toBe(false);
		}
	});
});
