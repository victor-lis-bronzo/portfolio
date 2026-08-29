import { describe, expect, it } from "vitest";
import { SCENE_WAYPOINTS } from "../../entities/scene-waypoint-config";
import { BIOGRAPHICAL_STORY_SCRIPT } from "./script";

describe("BIOGRAPHICAL_STORY_SCRIPT Contract", () => {
	const validWaypointIds = new Set(SCENE_WAYPOINTS.map((w) => w.id));

	it("has unique chapter IDs", () => {
		const chapterIds = BIOGRAPHICAL_STORY_SCRIPT.chapters.map((c) => c.id);
		const uniqueIds = new Set(chapterIds);
		expect(uniqueIds.size).toBe(chapterIds.length);
	});

	it("has unique step IDs", () => {
		const stepIds = BIOGRAPHICAL_STORY_SCRIPT.steps.map((s) => s.id);
		const uniqueIds = new Set(stepIds);
		expect(uniqueIds.size).toBe(stepIds.length);
	});

	it("ensures all chapter stepIds exist in steps list", () => {
		const stepIdSet = new Set(BIOGRAPHICAL_STORY_SCRIPT.steps.map((s) => s.id));
		for (const chapter of BIOGRAPHICAL_STORY_SCRIPT.chapters) {
			for (const stepId of chapter.stepIds) {
				expect(stepIdSet.has(stepId)).toBe(true);
			}
		}
	});

	it("ensures every step points to a valid waypoint in SCENE_WAYPOINTS", () => {
		for (const step of BIOGRAPHICAL_STORY_SCRIPT.steps) {
			expect(
				validWaypointIds.has(step.waypoint),
				`Step ${step.id} has unknown waypoint "${step.waypoint}"`,
			).toBe(true);
		}
	});

	it("ensures mascot dialogues are within the 140 character limit", () => {
		for (const step of BIOGRAPHICAL_STORY_SCRIPT.steps) {
			expect(
				step.mascotDialogue.length,
				`Step ${step.id} exceeds 140 chars (${step.mascotDialogue.length} chars)`,
			).toBeLessThanOrEqual(140);
		}
	});

	it("ensures steps with diagrams have <= 12 elements and are focused on the WHITEBOARD_FOCUS waypoint", () => {
		for (const step of BIOGRAPHICAL_STORY_SCRIPT.steps) {
			if (step.diagramElements && step.diagramElements.length > 0) {
				expect(step.diagramElements.length).toBeLessThanOrEqual(12);
				expect(step.waypoint).toBe("WHITEBOARD_FOCUS");
			}
		}
	});
});
