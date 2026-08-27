import { describe, expect, it } from "vitest";
import type { DiagramElement } from "@/core/entities/diagram-element";
import type { StoryStep } from "@/core/entities/story-step";
import {
	getNextStepIndex,
	isLastStep,
	resolveBoardAction,
	shouldAutoAdvance,
} from "./story-progression";

function makeStep(overrides: Partial<StoryStep> = {}): StoryStep {
	return {
		id: "step-1",
		waypointId: "DESK",
		speech: "Hello there.",
		...overrides,
	};
}

describe("resolveBoardAction", () => {
	it("keeps the board when diagramElements is undefined", () => {
		const step = makeStep({ diagramElements: undefined });

		expect(resolveBoardAction(step)).toEqual({ kind: "keep" });
	});

	it("clears the board when diagramElements is an empty array", () => {
		const step = makeStep({ diagramElements: [] });

		expect(resolveBoardAction(step)).toEqual({ kind: "clear" });
	});

	it("renders elements when diagramElements is a non-empty array", () => {
		const elements: DiagramElement[] = [
			{ id: "el-1", type: "box", x: 0, y: 0 },
		];
		const step = makeStep({ diagramElements: elements });

		expect(resolveBoardAction(step)).toEqual({
			kind: "render",
			elements,
		});
	});
});

describe("isLastStep", () => {
	it("returns false for a step in the middle of the script", () => {
		expect(isLastStep(1, 5)).toBe(false);
	});

	it("returns true for the final index", () => {
		expect(isLastStep(4, 5)).toBe(true);
	});

	it("returns true for a single-step script (index 0, total 1)", () => {
		expect(isLastStep(0, 1)).toBe(true);
	});

	it("returns false for an out-of-range or non-positive total", () => {
		expect(isLastStep(-1, 5)).toBe(false);
		expect(isLastStep(0, 0)).toBe(false);
		expect(isLastStep(5, 5)).toBe(false);
	});
});

describe("getNextStepIndex", () => {
	it("returns index + 1 in the middle of the script", () => {
		expect(getNextStepIndex(1, 5)).toBe(2);
	});

	it("returns null when already at the last step", () => {
		expect(getNextStepIndex(4, 5)).toBeNull();
	});

	it("returns null for a single-step script", () => {
		expect(getNextStepIndex(0, 1)).toBeNull();
	});

	it("returns null for an out-of-range index or non-positive total", () => {
		expect(getNextStepIndex(-1, 5)).toBeNull();
		expect(getNextStepIndex(0, 0)).toBeNull();
		expect(getNextStepIndex(5, 5)).toBeNull();
	});
});

describe("shouldAutoAdvance", () => {
	it("returns true when autoAdvance is on and durationMs is a positive number", () => {
		const step = makeStep({ durationMs: 3000 });

		expect(shouldAutoAdvance(step, true)).toBe(true);
	});

	it("returns false when autoAdvance is off, even with a valid durationMs", () => {
		const step = makeStep({ durationMs: 3000 });

		expect(shouldAutoAdvance(step, false)).toBe(false);
	});

	it("returns false when durationMs is undefined", () => {
		const step = makeStep({ durationMs: undefined });

		expect(shouldAutoAdvance(step, true)).toBe(false);
	});

	it("returns false when durationMs is 0", () => {
		const step = makeStep({ durationMs: 0 });

		expect(shouldAutoAdvance(step, true)).toBe(false);
	});

	it("returns false when durationMs is negative", () => {
		const step = makeStep({ durationMs: -100 });

		expect(shouldAutoAdvance(step, true)).toBe(false);
	});
});
