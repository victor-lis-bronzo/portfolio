import { describe, expect, it } from "vitest";
import type { StoryScript } from "./story-script";
import { buildStoryTimeline } from "./story-timeline";

/** These cases only exercise structure, so both locales carry the same text. */
const both = (text: string) => ({ en: text, pt: text });

const mockScript: StoryScript = {
	chapters: [
		{
			id: "ch-intro",
			title: both("Introdução"),
			stepIds: ["step-1", "step-2"],
		},
		{
			id: "ch-middle",
			title: both("Desenvolvimento"),
			stepIds: ["step-3", "step-draft"],
		},
		{
			id: "ch-draft-only",
			title: both("Apenas Rascunho"),
			stepIds: ["step-draft-2"],
		},
		{
			id: "ch-ending",
			title: both("Encerramento"),
			stepIds: ["step-4"],
		},
	],
	steps: [
		{
			id: "step-1",
			waypoint: "OVERVIEW",
			mascotDialogue: both("Olá, bem-vindo!"),
		},
		{
			id: "step-2",
			waypoint: "DESK",
			mascotDialogue: both("Aqui é onde estudo e programo."),
		},
		{
			id: "step-3",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue: both("Vamos ver um diagrama."),
		},
		{
			id: "step-draft",
			waypoint: "IOT_BENCH",
			mascotDialogue: both("Rascunho de passo."),
			draft: true,
		},
		{
			id: "step-draft-2",
			waypoint: "PRINTER_3D",
			mascotDialogue: both("Outro rascunho."),
			draft: true,
		},
		{
			id: "step-4",
			waypoint: "OVERVIEW",
			mascotDialogue: both("Até a próxima!"),
		},
	],
};

describe("buildStoryTimeline", () => {
	it("filters out draft steps by default", () => {
		const timeline = buildStoryTimeline(mockScript);
		expect(timeline.totalSteps).toBe(4);
		expect(timeline.steps.map((s) => s.id)).toEqual([
			"step-1",
			"step-2",
			"step-3",
			"step-4",
		]);
	});

	it("filters out chapters that have only draft steps when drafts are excluded", () => {
		const timeline = buildStoryTimeline(mockScript);
		expect(timeline.totalChapters).toBe(3);
		expect(timeline.chapters.map((c) => c.id)).toEqual([
			"ch-intro",
			"ch-middle",
			"ch-ending",
		]);
		expect(timeline.getChapter("ch-draft-only")).toBeUndefined();
	});

	it("includes draft steps and chapters when includeDrafts is true", () => {
		const timeline = buildStoryTimeline(mockScript, { includeDrafts: true });
		expect(timeline.totalSteps).toBe(6);
		expect(timeline.totalChapters).toBe(4);
		expect(timeline.getChapter("ch-draft-only")).toBeDefined();
	});

	it("resolves chapters and chapter indices for step indices correctly", () => {
		const timeline = buildStoryTimeline(mockScript);

		expect(timeline.getChapterForStepIndex(0)?.id).toBe("ch-intro");
		expect(timeline.getChapterIndexForStepIndex(0)).toBe(0);

		expect(timeline.getChapterForStepIndex(1)?.id).toBe("ch-intro");
		expect(timeline.getChapterIndexForStepIndex(1)).toBe(0);

		expect(timeline.getChapterForStepIndex(2)?.id).toBe("ch-middle");
		expect(timeline.getChapterIndexForStepIndex(2)).toBe(1);

		expect(timeline.getChapterForStepIndex(3)?.id).toBe("ch-ending");
		expect(timeline.getChapterIndexForStepIndex(3)).toBe(2);

		expect(timeline.getChapterForStepIndex(99)).toBeUndefined();
		expect(timeline.getChapterIndexForStepIndex(99)).toBe(-1);
	});

	it("resolves the first step index of a given chapter", () => {
		const timeline = buildStoryTimeline(mockScript);

		expect(timeline.getFirstStepIndexOfChapter("ch-intro")).toBe(0);
		expect(timeline.getFirstStepIndexOfChapter("ch-middle")).toBe(2);
		expect(timeline.getFirstStepIndexOfChapter("ch-ending")).toBe(3);
		expect(timeline.getFirstStepIndexOfChapter("non-existent")).toBe(-1);
	});

	it("correctly identifies first and last steps", () => {
		const timeline = buildStoryTimeline(mockScript);

		expect(timeline.isFirstStep(0)).toBe(true);
		expect(timeline.isFirstStep(1)).toBe(false);

		expect(timeline.isLastStep(3)).toBe(true);
		expect(timeline.isLastStep(2)).toBe(false);
	});
});
