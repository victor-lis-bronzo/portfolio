import { beforeEach, describe, expect, it } from "vitest";
import { useStorytellerStore } from "./storyteller-store";

describe("useStorytellerStore", () => {
	beforeEach(() => {
		useStorytellerStore.getState().reset();
		useStorytellerStore.getState().setTotalSteps(5);
		useStorytellerStore.getState().setAutoAdvance(true);
	});

	it("initializes with IDLE status and step 0", () => {
		const state = useStorytellerStore.getState();
		expect(state.status).toBe("IDLE");
		expect(state.currentStepIndex).toBe(0);
		expect(state.totalSteps).toBe(5);
		expect(state.autoAdvance).toBe(true);
		expect(state.hasStarted).toBe(false);
	});

	it("transitions to PLAYING on start()", () => {
		useStorytellerStore.getState().start();
		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(0);
	});

	it("flags hasStarted on start()", () => {
		expect(useStorytellerStore.getState().hasStarted).toBe(false);
		useStorytellerStore.getState().start();
		expect(useStorytellerStore.getState().hasStarted).toBe(true);
	});

	it("supports starting at a specific step index", () => {
		useStorytellerStore.getState().start(2);
		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(2);
	});

	it("clamps start index to valid bounds", () => {
		useStorytellerStore.getState().start(99);
		expect(useStorytellerStore.getState().currentStepIndex).toBe(4);
	});

	it("pauses and resumes correctly", () => {
		useStorytellerStore.getState().start(1);
		useStorytellerStore.getState().pause();
		expect(useStorytellerStore.getState().status).toBe("PAUSED");

		useStorytellerStore.getState().resume();
		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(1);
	});

	it("advances with next() and ends when reaching the last step", () => {
		useStorytellerStore.getState().start(3);
		expect(useStorytellerStore.getState().currentStepIndex).toBe(3);

		useStorytellerStore.getState().next();
		expect(useStorytellerStore.getState().currentStepIndex).toBe(4);
		expect(useStorytellerStore.getState().status).toBe("PLAYING");

		useStorytellerStore.getState().next();
		expect(useStorytellerStore.getState().status).toBe("ENDED");
	});

	it("steps backwards with prev() and does not go below 0", () => {
		useStorytellerStore.getState().start(2);
		useStorytellerStore.getState().prev();
		expect(useStorytellerStore.getState().currentStepIndex).toBe(1);

		useStorytellerStore.getState().prev();
		expect(useStorytellerStore.getState().currentStepIndex).toBe(0);

		useStorytellerStore.getState().prev();
		expect(useStorytellerStore.getState().currentStepIndex).toBe(0);
	});

	it("jumps to step directly with jumpToStep()", () => {
		useStorytellerStore.getState().start();
		useStorytellerStore.getState().jumpToStep(3);
		expect(useStorytellerStore.getState().currentStepIndex).toBe(3);

		useStorytellerStore.getState().jumpToStep(100);
		expect(useStorytellerStore.getState().currentStepIndex).toBe(4);
	});

	it("allows toggling autoAdvance", () => {
		useStorytellerStore.getState().setAutoAdvance(false);
		expect(useStorytellerStore.getState().autoAdvance).toBe(false);

		useStorytellerStore.getState().setAutoAdvance(true);
		expect(useStorytellerStore.getState().autoAdvance).toBe(true);
	});

	it("goes back to IDLE on stop() while preserving progress", () => {
		useStorytellerStore.getState().start(3);
		useStorytellerStore.getState().stop();
		expect(useStorytellerStore.getState().status).toBe("IDLE");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(3);
		expect(useStorytellerStore.getState().hasStarted).toBe(true);
	});

	it("resumes from the preserved step after stop()", () => {
		useStorytellerStore.getState().start(2);
		useStorytellerStore.getState().stop();

		useStorytellerStore.getState().resume();
		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(2);
	});

	it("keeps the preserved step in bounds when the timeline shrinks", () => {
		useStorytellerStore.getState().start(4);
		useStorytellerStore.getState().stop();
		useStorytellerStore.getState().setTotalSteps(2);

		useStorytellerStore.getState().resume();
		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(1);
	});

	it("rewinds to the pristine state on reset()", () => {
		useStorytellerStore.getState().start(3);
		useStorytellerStore.getState().stop();

		useStorytellerStore.getState().reset();
		expect(useStorytellerStore.getState().status).toBe("IDLE");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(0);
		expect(useStorytellerStore.getState().hasStarted).toBe(false);
	});
});
