import { create } from "zustand";

export type StorytellerStatus = "IDLE" | "PLAYING" | "PAUSED" | "ENDED";

export interface StorytellerState {
	status: StorytellerStatus;
	currentStepIndex: number;
	totalSteps: number;
	autoAdvance: boolean;

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

	start: (stepIndex = 0) => {
		const { totalSteps } = get();
		const maxIndex = Math.max(0, totalSteps - 1);
		const clamped = Math.max(0, Math.min(stepIndex, maxIndex));
		set({
			status: "PLAYING",
			currentStepIndex: clamped,
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
			set({ status: "PLAYING" });
		} else if (status === "ENDED") {
			set({
				status: "PLAYING",
				currentStepIndex: 0,
			});
		} else if (status === "IDLE") {
			const maxIndex = Math.max(0, totalSteps - 1);
			set({
				status: "PLAYING",
				currentStepIndex: Math.max(0, Math.min(currentStepIndex, maxIndex)),
			});
		}
	},

	stop: () => {
		set({
			status: "IDLE",
			currentStepIndex: 0,
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

	reset: () => {
		set({
			status: "IDLE",
			currentStepIndex: 0,
		});
	},
}));
