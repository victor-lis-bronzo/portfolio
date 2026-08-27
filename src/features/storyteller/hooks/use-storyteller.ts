"use client";
import { useMemo } from "react";
import { findStoryScript } from "@/core/data/story-scripts";
import type { StoryScript, StoryScriptId, StoryStep } from "@/core/entities";
import { isLastStep as isLastStepOf } from "../lib/story-progression";
import { useStorytellerStore } from "../state/storyteller-store";

interface UseStorytellerResult {
	activeScript: StoryScript | null;
	activeStep: StoryStep | null;
	stepIndex: number;
	totalSteps: number;
	isPlaying: boolean;
	isLastStep: boolean;
	play: (scriptId: StoryScriptId) => Promise<void>;
	next: () => void;
	stop: () => void;
}

/**
 * The storyteller's read/write surface for components.
 *
 * Mirrors shared/hooks/use-mode.ts: components never touch Zustand's raw API
 * (no getState/setState/subscribe leaking out), and every field is either a
 * primitive selected with its own selector or a value derived from those
 * primitives. Selecting one primitive per field — instead of the whole state
 * object — keeps re-renders tied to what actually changed, and deriving the
 * objects here (rather than inside a selector) avoids handing Zustand a new
 * reference on every equality check.
 *
 * The actions come straight off the store: storyteller-store.ts builds them
 * once inside `create`'s initializer, so they are stable by reference and need
 * no useCallback wrapper.
 */
export function useStoryteller(): UseStorytellerResult {
	const activeScriptId = useStorytellerStore((s) => s.activeScriptId);
	const stepIndex = useStorytellerStore((s) => s.stepIndex);
	const status = useStorytellerStore((s) => s.status);
	const play = useStorytellerStore((s) => s.play);
	const next = useStorytellerStore((s) => s.next);
	const stop = useStorytellerStore((s) => s.stop);

	const activeScript = useMemo(
		() => (activeScriptId ? (findStoryScript(activeScriptId) ?? null) : null),
		[activeScriptId],
	);

	const activeStep = useMemo(
		() => activeScript?.steps[stepIndex] ?? null,
		[activeScript, stepIndex],
	);

	const totalSteps = activeScript?.steps.length ?? 0;

	const isLastStep = useMemo(
		() => isLastStepOf(stepIndex, totalSteps),
		[stepIndex, totalSteps],
	);

	return {
		activeScript,
		activeStep,
		stepIndex,
		totalSteps,
		isPlaying: status === "PLAYING",
		isLastStep,
		play,
		next,
		stop,
	};
}
