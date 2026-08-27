import type { DiagramElement } from "@/core/entities/diagram-element";
import type { StoryStep } from "@/core/entities/story-step";

export type BoardAction =
	| { kind: "keep" }
	| { kind: "clear" }
	| { kind: "render"; elements: DiagramElement[] };

// Mirrors the tri-state semantics documented on StoryStep.diagramElements:
// undefined keeps the board, [] clears it, a non-empty array replaces it.
export function resolveBoardAction(step: StoryStep): BoardAction {
	if (step.diagramElements === undefined) {
		return { kind: "keep" };
	}

	if (step.diagramElements.length === 0) {
		return { kind: "clear" };
	}

	return { kind: "render", elements: step.diagramElements };
}

export function isLastStep(index: number, total: number): boolean {
	// A non-positive total or an out-of-range index has no "last step" to be.
	if (total <= 0 || index < 0 || index >= total) {
		return false;
	}

	return index === total - 1;
}

export function getNextStepIndex(index: number, total: number): number | null {
	if (total <= 0 || index < 0 || index >= total) {
		return null;
	}

	const next = index + 1;
	return next < total ? next : null;
}

export function shouldAutoAdvance(
	step: StoryStep,
	autoAdvance: boolean,
): boolean {
	if (!autoAdvance) {
		return false;
	}

	return typeof step.durationMs === "number" && step.durationMs > 0;
}
