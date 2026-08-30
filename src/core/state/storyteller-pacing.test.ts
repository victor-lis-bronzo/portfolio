import { describe, expect, it } from "vitest";
import type { StoryStep } from "../entities/story-script";
import {
	BASE_DWELL_MS,
	calculateStepDwellMs,
	DIAGRAM_EXTRA_DWELL_MS,
	MAX_STEP_DWELL_MS,
	MIN_STEP_DWELL_MS,
	MS_PER_CHAR,
} from "./storyteller-pacing";

/** Same phrase in both locales unless a case is specifically about length. */
const both = (text: string) => ({ en: text, pt: text });

describe("calculateStepDwellMs", () => {
	it("respects explicit cameraDwellMs if provided", () => {
		const step: StoryStep = {
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: both("Texto qualquer"),
			cameraDwellMs: 7000,
		};
		expect(calculateStepDwellMs(step)).toBe(7000);
	});

	it("calculates dwell based on dialogue length", () => {
		const text = "Olá! Seja bem-vindo ao meu portfólio interativo 3D.";
		const step: StoryStep = {
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: both(text),
		};

		const expected = BASE_DWELL_MS + text.length * MS_PER_CHAR;
		expect(calculateStepDwellMs(step)).toBe(expected);
	});

	it("adds extra dwell time when step has diagrams and reduced motion is false", () => {
		const text = "Veja este diagrama de arquitetura.";
		const step: StoryStep = {
			id: "s1",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue: both(text),
			diagramElements: [
				{ id: "box1", type: "box", x: 10, y: 10, label: "Node" },
			],
		};

		const expected =
			BASE_DWELL_MS + text.length * MS_PER_CHAR + DIAGRAM_EXTRA_DWELL_MS;
		expect(calculateStepDwellMs(step, { prefersReducedMotion: false })).toBe(
			expected,
		);
	});

	it("does not add extra diagram animation time when reduced motion is true", () => {
		const text = "Veja este diagrama de arquitetura.";
		const step: StoryStep = {
			id: "s1",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue: both(text),
			diagramElements: [
				{ id: "box1", type: "box", x: 10, y: 10, label: "Node" },
			],
		};

		const expected = BASE_DWELL_MS + text.length * MS_PER_CHAR;
		expect(calculateStepDwellMs(step, { prefersReducedMotion: true })).toBe(
			expected,
		);
	});

	it("paces on the phrase of the requested locale, defaulting to English", () => {
		const en = "Short line.";
		const pt = "Uma frase consideravelmente mais longa nesta outra língua.";
		const step: StoryStep = {
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: { en, pt },
		};

		expect(calculateStepDwellMs(step, { locale: "en" })).toBe(
			BASE_DWELL_MS + en.length * MS_PER_CHAR,
		);
		expect(calculateStepDwellMs(step, { locale: "pt" })).toBe(
			BASE_DWELL_MS + pt.length * MS_PER_CHAR,
		);
		// No locale given → the site default.
		expect(calculateStepDwellMs(step)).toBe(
			calculateStepDwellMs(step, { locale: "en" }),
		);
	});

	it("clamps values to min and max boundaries", () => {
		const shortStep: StoryStep = {
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: both(""),
		};
		expect(calculateStepDwellMs(shortStep)).toBeGreaterThanOrEqual(
			MIN_STEP_DWELL_MS,
		);

		const hugeText = "A".repeat(1000);
		const hugeStep: StoryStep = {
			id: "s2",
			waypoint: "OVERVIEW",
			mascotDialogue: both(hugeText),
		};
		expect(calculateStepDwellMs(hugeStep)).toBe(MAX_STEP_DWELL_MS);
	});
});
