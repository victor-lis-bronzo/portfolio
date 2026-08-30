import { describe, expect, it } from "vitest";
import { LOCALES } from "@/shared/i18n/types";
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

	it("ensures mascot dialogues are within the 140 character limit in every locale", () => {
		for (const step of BIOGRAPHICAL_STORY_SCRIPT.steps) {
			for (const locale of LOCALES) {
				const phrase = step.mascotDialogue[locale];
				expect(
					phrase.length,
					`Step ${step.id} (${locale}) exceeds 140 chars (${phrase.length} chars)`,
				).toBeLessThanOrEqual(140);
			}
		}
	});

	it("ensures every chapter is authored in both locales", () => {
		for (const chapter of BIOGRAPHICAL_STORY_SCRIPT.chapters) {
			for (const locale of LOCALES) {
				expect(
					chapter.title[locale].length,
					`Chapter ${chapter.id} has no ${locale} title`,
				).toBeGreaterThan(0);
				if (chapter.description) {
					expect(
						chapter.description[locale].length,
						`Chapter ${chapter.id} has no ${locale} description`,
					).toBeGreaterThan(0);
				}
			}
		}
	});

	it("ensures every declared cta list is non-empty and fully filled in", () => {
		for (const step of BIOGRAPHICAL_STORY_SCRIPT.steps) {
			if (!step.ctas) continue;
			expect(
				step.ctas.length,
				`Step ${step.id} declares an empty ctas array`,
			).toBeGreaterThan(0);
			for (const cta of step.ctas) {
				for (const locale of LOCALES) {
					expect(
						cta.label[locale].length,
						`Step ${step.id} has an empty ${locale} cta label`,
					).toBeGreaterThan(0);
				}
				expect(cta.href.length).toBeGreaterThan(0);
			}
			const hrefs = step.ctas.map((cta) => cta.href);
			expect(
				new Set(hrefs).size,
				`Step ${step.id} has duplicated cta hrefs`,
			).toBe(hrefs.length);
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
