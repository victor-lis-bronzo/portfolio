import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { findStoryScript, IDLE_BOARD_DIAGRAM } from "@/core/data/story-scripts";
import type { DiagramElement, SceneWaypointId } from "@/core/entities";
import { useSceneFocusStore } from "@/features/scene-3d/state/scene-focus-store";
import { useWhiteboardStore } from "@/features/whiteboard/state/whiteboard-store";
import { getStoryOrchestrator, useStorytellerStore } from "./storyteller-store";

const DEV_DESK = "DEV_DESK_GIT_ASSETS" as const;
const SOLID = "SOLID_ARCHITECTURE" as const;
const IOT = "IOT_BENCH_ECO_PLAY" as const;

const devDeskScript = findStoryScript(DEV_DESK);
if (!devDeskScript) {
	throw new Error("DEV_DESK_GIT_ASSETS script is missing from STORY_SCRIPTS");
}

const SENTINEL_ELEMENTS: DiagramElement[] = [
	{
		id: "sentinel-box",
		type: "box",
		x: 10,
		y: 10,
		width: 40,
		height: 20,
		label: "sentinel",
	},
];

/** Ordered log of every board call, to assert sequencing (e.g. clear-then-render). */
let boardCalls: Array<"render" | "clear"> = [];
let focusWaypoint: Mock<(id: SceneWaypointId) => Promise<void>>;

function store() {
	return useStorytellerStore.getState();
}

function resetWhiteboard(): void {
	useWhiteboardStore.setState({
		elements: IDLE_BOARD_DIAGRAM,
		revision: 0,
		render: (elements) => {
			boardCalls.push("render");
			useWhiteboardStore.setState((state) => ({
				elements,
				revision: state.revision + 1,
			}));
		},
		clear: () => {
			boardCalls.push("clear");
			useWhiteboardStore.setState((state) => ({
				elements: [],
				revision: state.revision + 1,
			}));
		},
	});
}

describe("useStorytellerStore", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		boardCalls = [];

		useStorytellerStore.setState({
			activeScriptId: null,
			stepIndex: 0,
			status: "IDLE",
			autoAdvance: true,
		});

		focusWaypoint = vi
			.fn<(id: SceneWaypointId) => Promise<void>>()
			.mockResolvedValue(undefined);
		useSceneFocusStore.setState({ focusWaypoint });
		resetWhiteboard();
	});

	afterEach(() => {
		// Any timer scheduled by an unfinished tour must not leak into the next test.
		useStorytellerStore.getState().stop();
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("play activates the script, applies step 0 and focuses its waypoint", async () => {
		await store().play(DEV_DESK);

		const step0 = devDeskScript.steps[0];
		const state = store();
		expect(state.activeScriptId).toBe(DEV_DESK);
		expect(state.stepIndex).toBe(0);
		expect(state.status).toBe("PLAYING");
		expect(focusWaypoint).toHaveBeenCalledWith(step0.waypointId);
		// Step 0 carries `diagramElements: []`, i.e. a "clear" board action.
		expect(boardCalls).toEqual(["clear"]);
		expect(useWhiteboardStore.getState().elements).toEqual([]);
	});

	it("next advances the step and reapplies camera and board", async () => {
		await store().play(SOLID);
		boardCalls = [];
		focusWaypoint.mockClear();

		const script = findStoryScript(SOLID);
		const step1 = script?.steps[1];
		if (!step1?.diagramElements) {
			throw new Error("SOLID_ARCHITECTURE step 1 should render a diagram");
		}

		store().next();
		await vi.advanceTimersByTimeAsync(0);

		expect(store().stepIndex).toBe(1);
		expect(store().status).toBe("PLAYING");
		expect(focusWaypoint).toHaveBeenCalledWith(step1.waypointId);
		expect(boardCalls).toEqual(["render"]);
		expect(useWhiteboardStore.getState().elements).toEqual(
			step1.diagramElements,
		);
	});

	it("keeps the board on an undefined diagram and clears it on an empty array", async () => {
		// Step 0 of DEV_DESK has `diagramElements: []` -> clear.
		await store().play(DEV_DESK);
		expect(boardCalls).toEqual(["clear"]);
		expect(useWhiteboardStore.getState().elements).toEqual([]);

		// Step 1 has no `diagramElements` at all -> keep whatever is on the board.
		useWhiteboardStore.setState({ elements: SENTINEL_ELEMENTS });
		const revisionBefore = useWhiteboardStore.getState().revision;
		boardCalls = [];

		store().next();
		await vi.advanceTimersByTimeAsync(0);

		expect(store().stepIndex).toBe(1);
		expect(boardCalls).toEqual([]);
		expect(useWhiteboardStore.getState().elements).toEqual(SENTINEL_ELEMENTS);
		expect(useWhiteboardStore.getState().revision).toBe(revisionBefore);
	});

	it("auto-advances after durationMs when autoAdvance is on", async () => {
		await store().play(DEV_DESK);

		const step0Duration = devDeskScript.steps[0].durationMs;
		expect(step0Duration).toBeTypeOf("number");
		expect(vi.getTimerCount()).toBe(1);

		await vi.advanceTimersByTimeAsync(step0Duration as number);

		expect(store().stepIndex).toBe(1);
		expect(focusWaypoint).toHaveBeenLastCalledWith(
			devDeskScript.steps[1].waypointId,
		);
	});

	it("never schedules an auto-advance when autoAdvance is off", async () => {
		store()._setAutoAdvance(false);
		await store().play(DEV_DESK);

		expect(vi.getTimerCount()).toBe(0);

		await vi.advanceTimersByTimeAsync(60_000);

		expect(store().stepIndex).toBe(0);
		expect(store().status).toBe("PLAYING");
	});

	it("clears the board before rendering when switching to another script", async () => {
		await store().play(DEV_DESK);
		boardCalls = [];

		await store().play(SOLID);

		expect(store().activeScriptId).toBe(SOLID);
		expect(store().stepIndex).toBe(0);
		// First clear = the script switch, second = step 0's own board action.
		expect(boardCalls[0]).toBe("clear");
		expect(useWhiteboardStore.getState().elements).toEqual([]);
	});

	it("restarts at step 0 when the already active script is played again", async () => {
		await store().play(DEV_DESK);
		store().next();
		await vi.advanceTimersByTimeAsync(0);
		expect(store().stepIndex).toBe(1);

		boardCalls = [];
		await store().play(DEV_DESK);

		expect(store().activeScriptId).toBe(DEV_DESK);
		expect(store().stepIndex).toBe(0);
		// No switch-clear: same script, so only step 0's own action ran.
		expect(boardCalls).toEqual(["clear"]);
	});

	it("stop cancels pending timers, restores the idle board and goes back to IDLE", async () => {
		await store().play(DEV_DESK);
		expect(vi.getTimerCount()).toBe(1);
		focusWaypoint.mockClear();
		boardCalls = [];

		store().stop();

		expect(vi.getTimerCount()).toBe(0);
		expect(boardCalls).toEqual(["render"]);
		expect(useWhiteboardStore.getState().elements).toEqual(IDLE_BOARD_DIAGRAM);
		expect(focusWaypoint).toHaveBeenCalledWith("OVERVIEW");

		const state = store();
		expect(state.status).toBe("IDLE");
		expect(state.activeScriptId).toBeNull();
		expect(state.stepIndex).toBe(0);

		// The cancelled timer must stay cancelled.
		await vi.advanceTimersByTimeAsync(60_000);
		expect(store().status).toBe("IDLE");
	});

	it("next on the last step behaves like stop", async () => {
		await store().play(IOT);
		const total = findStoryScript(IOT)?.steps.length ?? 0;
		expect(total).toBeGreaterThan(1);

		useStorytellerStore.setState({ stepIndex: total - 1 });
		focusWaypoint.mockClear();
		boardCalls = [];

		store().next();
		await vi.advanceTimersByTimeAsync(0);

		expect(store().status).toBe("IDLE");
		expect(store().activeScriptId).toBeNull();
		expect(store().stepIndex).toBe(0);
		expect(focusWaypoint).toHaveBeenCalledWith("OVERVIEW");
		expect(boardCalls).toEqual(["render"]);
		expect(useWhiteboardStore.getState().elements).toEqual(IDLE_BOARD_DIAGRAM);
	});

	it("next is a no-op while IDLE", async () => {
		store().next();
		await vi.advanceTimersByTimeAsync(0);

		expect(store().status).toBe("IDLE");
		expect(focusWaypoint).not.toHaveBeenCalled();
	});

	describe("staleness guard", () => {
		// A hand-controlled camera promise per call: resolving one lets us replay
		// exactly the race the runId counter exists for.
		let resolvers: Array<() => void>;

		beforeEach(() => {
			resolvers = [];
			focusWaypoint = vi.fn<(id: SceneWaypointId) => Promise<void>>(
				() =>
					new Promise<void>((resolve) => {
						resolvers.push(resolve);
					}),
			);
			useSceneFocusStore.setState({ focusWaypoint });
		});

		it("a stale step application schedules no timer and does not skip a step", async () => {
			// Step 0 starts; its camera promise stays pending.
			void store().play(DEV_DESK);
			await vi.advanceTimersByTimeAsync(0);
			expect(store().stepIndex).toBe(0);
			expect(resolvers).toHaveLength(1);
			expect(vi.getTimerCount()).toBe(0);

			// The user clicks "next" mid-flight: run 2 starts, run 1 is now stale.
			store().next();
			await vi.advanceTimersByTimeAsync(0);
			expect(store().stepIndex).toBe(1);
			expect(resolvers).toHaveLength(2);

			// The late step-0 camera promise resolves *after* run 2 took over.
			resolvers[0]();
			await vi.advanceTimersByTimeAsync(0);

			// Nothing was rescheduled and no step was skipped by the stale run.
			expect(store().stepIndex).toBe(1);
			expect(vi.getTimerCount()).toBe(0);

			// Only the current run gets to schedule its own auto-advance, once.
			resolvers[1]();
			await vi.advanceTimersByTimeAsync(0);
			expect(vi.getTimerCount()).toBe(1);

			await vi.advanceTimersByTimeAsync(
				devDeskScript.steps[1].durationMs as number,
			);
			expect(store().stepIndex).toBe(2);
		});

		it("a step application interrupted by stop stays stopped when its camera resolves", async () => {
			void store().play(DEV_DESK);
			await vi.advanceTimersByTimeAsync(0);
			expect(resolvers).toHaveLength(1);

			store().stop();
			expect(store().status).toBe("IDLE");

			// The in-flight run resolves only now; it must not resurrect the tour.
			resolvers[0]();
			await vi.advanceTimersByTimeAsync(0);

			expect(store().status).toBe("IDLE");
			expect(store().activeScriptId).toBeNull();
			expect(store().stepIndex).toBe(0);
			expect(vi.getTimerCount()).toBe(0);
		});
	});

	describe("getStoryOrchestrator", () => {
		it("mirrors the store state after a play", async () => {
			const orchestrator = getStoryOrchestrator();

			expect(orchestrator.isPlaying()).toBe(false);
			expect(orchestrator.getActiveScript()).toBeNull();
			expect(orchestrator.getActiveStep()).toBeNull();

			await orchestrator.play(DEV_DESK);

			expect(orchestrator.isPlaying()).toBe(true);
			expect(orchestrator.getActiveScript()).toEqual(devDeskScript);
			expect(orchestrator.getActiveStep()).toEqual(devDeskScript.steps[0]);

			orchestrator.next();
			await vi.advanceTimersByTimeAsync(0);
			expect(orchestrator.getActiveStep()).toEqual(devDeskScript.steps[1]);

			orchestrator.stop();
			expect(orchestrator.isPlaying()).toBe(false);
			expect(orchestrator.getActiveScript()).toBeNull();
			expect(orchestrator.getActiveStep()).toBeNull();
		});
	});
});
