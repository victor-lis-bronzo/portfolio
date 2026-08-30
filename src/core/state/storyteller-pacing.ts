import type { Locale } from "@/shared/i18n/types";
import type { StoryStep } from "../entities/story-script";

export const BASE_DWELL_MS = 4500;
export const MS_PER_CHAR = 35;
export const DIAGRAM_EXTRA_DWELL_MS = 4500;
export const MIN_STEP_DWELL_MS = 3500;
export const MAX_STEP_DWELL_MS = 18000;

export interface PacingOptions {
	prefersReducedMotion?: boolean;
	/**
	 * Reading time is proportional to the phrase actually on screen, and the two
	 * languages differ in length. Defaults to the site default locale.
	 */
	locale?: Locale;
}

export function calculateStepDwellMs(
	step: StoryStep,
	options: PacingOptions = {},
): number {
	if (typeof step.cameraDwellMs === "number" && step.cameraDwellMs > 0) {
		return step.cameraDwellMs;
	}

	const phrase = step.mascotDialogue?.[options.locale ?? "en"];
	const charCount = phrase ? phrase.length : 0;
	let dwell = BASE_DWELL_MS + charCount * MS_PER_CHAR;

	const hasDiagram = Boolean(
		step.diagramElements && step.diagramElements.length > 0,
	);

	if (hasDiagram && !options.prefersReducedMotion) {
		dwell += DIAGRAM_EXTRA_DWELL_MS;
	}

	if (dwell < MIN_STEP_DWELL_MS) {
		return MIN_STEP_DWELL_MS;
	}

	if (dwell > MAX_STEP_DWELL_MS) {
		return MAX_STEP_DWELL_MS;
	}

	return dwell;
}
