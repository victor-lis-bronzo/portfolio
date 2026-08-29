import { fireEvent, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useStorytellerStore } from "@/core/state/storyteller-store";
import { useStoryKeyboardShortcuts } from "./use-story-keyboard-shortcuts";

describe("useStoryKeyboardShortcuts", () => {
	beforeEach(() => {
		useStorytellerStore.getState().reset();
		useStorytellerStore.getState().setTotalSteps(5);
		useStorytellerStore.getState().setAutoAdvance(true);
	});

	afterEach(() => {
		document.getElementById("story-transcript-panel")?.remove();
	});

	it("closes the story on Escape when the transcript panel is not open", () => {
		useStorytellerStore.getState().start(2);
		renderHook(() => useStoryKeyboardShortcuts());

		fireEvent.keyDown(window, { key: "Escape" });

		expect(useStorytellerStore.getState().status).toBe("IDLE");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(2);
	});

	it("does not change the store status on Escape while the transcript panel is open", () => {
		useStorytellerStore.getState().start(2);
		renderHook(() => useStoryKeyboardShortcuts());

		const panel = document.createElement("div");
		panel.id = "story-transcript-panel";
		document.body.appendChild(panel);

		fireEvent.keyDown(window, { key: "Escape" });

		expect(useStorytellerStore.getState().status).toBe("PLAYING");
	});

	it("keeps every playback shortcut inert while the transcript panel is open", () => {
		useStorytellerStore.getState().start(2);
		renderHook(() => useStoryKeyboardShortcuts());

		const panel = document.createElement("div");
		panel.id = "story-transcript-panel";
		document.body.appendChild(panel);

		fireEvent.keyDown(window, { key: "ArrowRight" });
		fireEvent.keyDown(window, { key: "ArrowLeft" });
		fireEvent.keyDown(window, { key: " " });

		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(2);
	});

	it("keeps every shortcut inert in free-navigation mode (IDLE with hasStarted)", () => {
		useStorytellerStore.getState().start(1);
		useStorytellerStore.getState().stop();
		renderHook(() => useStoryKeyboardShortcuts());

		fireEvent.keyDown(window, { key: "ArrowRight" });
		fireEvent.keyDown(window, { key: " " });
		fireEvent.keyDown(window, { key: "Escape" });

		const state = useStorytellerStore.getState();
		expect(state.status).toBe("IDLE");
		expect(state.currentStepIndex).toBe(1);
		expect(state.hasStarted).toBe(true);
	});
});
