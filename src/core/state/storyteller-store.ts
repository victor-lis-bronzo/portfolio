import { create } from "zustand";

export type StorytellerStatus = "IDLE" | "PLAYING" | "PAUSED" | "ENDED";

export interface StorytellerState {
	status: StorytellerStatus;
	currentStepIndex: number;
	totalSteps: number;
	autoAdvance: boolean;
	/**
	 * Whether the narration was ever started in this session.
	 *
	 * Distinguishes "never started" (first visit -> show the intro card) from
	 * "closed mid-story" (free-navigation mode -> show the resume affordance),
	 * since both share `status === "IDLE"`. Only `reset()` clears it.
	 */
	hasStarted: boolean;

	start: (stepIndex?: number) => void;
	pause: () => void;
	resume: () => void;
	stop: () => void;
	next: () => void;
	prev: () => void;
	jumpToStep: (stepIndex: number) => void;
	setAutoAdvance: (enabled: boolean) => void;
	setTotalSteps: (total: number) => void;
	reset: () => void;
}

export const useStorytellerStore = create<StorytellerState>((set, get) => ({
	status: "IDLE",
	currentStepIndex: 0,
	totalSteps: 0,
	autoAdvance: true,
	hasStarted: false,

	start: (stepIndex = 0) => {
		const { totalSteps } = get();
		const maxIndex = Math.max(0, totalSteps - 1);
		const clamped = Math.max(0, Math.min(stepIndex, maxIndex));
		set({
			status: "PLAYING",
			currentStepIndex: clamped,
			hasStarted: true,
		});
	},

	pause: () => {
		const { status } = get();
		if (status === "PLAYING") {
			set({ status: "PAUSED" });
		}
	},

	resume: () => {
		const { status, currentStepIndex, totalSteps } = get();
		if (status === "PAUSED") {
			set({ status: "PLAYING", hasStarted: true });
		} else if (status === "ENDED") {
			set({
				status: "PLAYING",
				currentStepIndex: 0,
				hasStarted: true,
			});
		} else if (status === "IDLE") {
			// Picks the story back up where it was closed (see `stop`), which is
			// what the resume affordance of the free-navigation mode relies on.
			const maxIndex = Math.max(0, totalSteps - 1);
			set({
				status: "PLAYING",
				currentStepIndex: Math.max(0, Math.min(currentStepIndex, maxIndex)),
				hasStarted: true,
			});
		}
	},

	/**
	 * Closes the narration while preserving progress, so the scene becomes
	 * freely navigable and the story can be resumed from the same step.
	 * Use `reset()` to actually rewind to the beginning.
	 */
	stop: () => {
		set({
			status: "IDLE",
		});
	},

	next: () => {
		const { currentStepIndex, totalSteps } = get();
		if (totalSteps <= 0) {
			set({ status: "ENDED" });
			return;
		}
		if (currentStepIndex + 1 < totalSteps) {
			set({
				currentStepIndex: currentStepIndex + 1,
			});
		} else {
			set({
				status: "ENDED",
			});
		}
	},

	prev: () => {
		const { currentStepIndex, status } = get();
		const newIndex = Math.max(0, currentStepIndex - 1);
		set({
			currentStepIndex: newIndex,
			status: status === "ENDED" ? "PLAYING" : status,
		});
	},

	jumpToStep: (stepIndex: number) => {
		const { totalSteps, status } = get();
		const maxIndex = Math.max(0, totalSteps - 1);
		const clamped = Math.max(0, Math.min(stepIndex, maxIndex));
		set({
			currentStepIndex: clamped,
			status: status === "ENDED" ? "PLAYING" : status,
		});
	},

	setAutoAdvance: (enabled: boolean) => {
		set({ autoAdvance: enabled });
	},

	setTotalSteps: (total: number) => {
		const clampedTotal = Math.max(0, total);
		const { currentStepIndex } = get();
		const maxIndex = Math.max(0, clampedTotal - 1);
		set({
			totalSteps: clampedTotal,
			currentStepIndex: Math.min(currentStepIndex, maxIndex),
		});
	},

	/**
	 * Full rewind to the pristine, never-started state: the intro card shows
	 * again as if this were a first visit.
	 */
	reset: () => {
		set({
			status: "IDLE",
			currentStepIndex: 0,
			hasStarted: false,
		});
	},
}));
