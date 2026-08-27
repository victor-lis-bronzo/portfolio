import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { findStoryScript } from "@/core/data/story-scripts";
import { useStorytellerStore } from "../state/storyteller-store";
import { useStoryteller } from "./use-storyteller";

const SCRIPT_ID = "DEV_DESK_GIT_ASSETS" as const;

const script = findStoryScript(SCRIPT_ID);
if (!script) {
	throw new Error("DEV_DESK_GIT_ASSETS script is missing from STORY_SCRIPTS");
}

describe("useStoryteller", () => {
	beforeEach(() => {
		useStorytellerStore.setState({
			activeScriptId: null,
			stepIndex: 0,
			status: "IDLE",
			// Autoplay off: this hook's job is projection, and a live timer would
			// advance steps out from under the assertions.
			autoAdvance: false,
		});
	});

	afterEach(() => {
		useStorytellerStore.getState().stop();
	});

	it("reports an empty projection while idle", () => {
		const { result } = renderHook(() => useStoryteller());

		expect(result.current.activeScript).toBeNull();
		expect(result.current.activeStep).toBeNull();
		expect(result.current.stepIndex).toBe(0);
		expect(result.current.totalSteps).toBe(0);
		expect(result.current.isPlaying).toBe(false);
		expect(result.current.isLastStep).toBe(false);
	});

	it("derives script, step and progress from the store once playing", async () => {
		const { result } = renderHook(() => useStoryteller());

		await act(async () => {
			await result.current.play(SCRIPT_ID);
		});

		expect(result.current.activeScript).toBe(script);
		expect(result.current.activeStep).toBe(script.steps[0]);
		expect(result.current.stepIndex).toBe(0);
		expect(result.current.totalSteps).toBe(script.steps.length);
		expect(result.current.isPlaying).toBe(true);
		expect(result.current.isLastStep).toBe(script.steps.length === 1);
	});

	it("advances with next() and flags the last step", async () => {
		const { result } = renderHook(() => useStoryteller());

		await act(async () => {
			await result.current.play(SCRIPT_ID);
		});

		for (let i = 1; i < script.steps.length; i += 1) {
			await act(async () => {
				result.current.next();
			});
			expect(result.current.stepIndex).toBe(i);
			expect(result.current.activeStep).toBe(script.steps[i]);
		}

		expect(result.current.isLastStep).toBe(true);
	});

	it("returns to the idle projection after stop()", async () => {
		const { result } = renderHook(() => useStoryteller());

		await act(async () => {
			await result.current.play(SCRIPT_ID);
		});
		act(() => {
			result.current.stop();
		});

		expect(result.current.isPlaying).toBe(false);
		expect(result.current.activeScript).toBeNull();
		expect(result.current.activeStep).toBeNull();
	});
});
