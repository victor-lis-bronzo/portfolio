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

describe("calculateStepDwellMs", () => {
	it("respects explicit cameraDwellMs if provided", () => {
		const step: StoryStep = {
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: "Texto qualquer",
			cameraDwellMs: 7000,
		};
		expect(calculateStepDwellMs(step)).toBe(7000);
	});

	it("calculates dwell based on dialogue length", () => {
		const text = "Olá! Seja bem-vindo ao meu portfólio interativo 3D.";
		const step: StoryStep = {
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: text,
		};

		const expected = BASE_DWELL_MS + text.length * MS_PER_CHAR;
		expect(calculateStepDwellMs(step)).toBe(expected);
	});

	it("adds extra dwell time when step has diagrams and reduced motion is false", () => {
		const text = "Veja este diagrama de arquitetura.";
		const step: StoryStep = {
			id: "s1",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue: text,
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
			mascotDialogue: text,
			diagramElements: [
				{ id: "box1", type: "box", x: 10, y: 10, label: "Node" },
			],
		};

		const expected = BASE_DWELL_MS + text.length * MS_PER_CHAR;
		expect(calculateStepDwellMs(step, { prefersReducedMotion: true })).toBe(
			expected,
		);
	});

	it("clamps values to min and max boundaries", () => {
		const shortStep: StoryStep = {
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: "",
		};
		expect(calculateStepDwellMs(shortStep)).toBeGreaterThanOrEqual(
			MIN_STEP_DWELL_MS,
		);

		const hugeText = "A".repeat(1000);
		const hugeStep: StoryStep = {
			id: "s2",
			waypoint: "OVERVIEW",
			mascotDialogue: hugeText,
		};
		expect(calculateStepDwellMs(hugeStep)).toBe(MAX_STEP_DWELL_MS);
	});
});
