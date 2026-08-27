import { create } from "zustand";
import { findStoryScript, IDLE_BOARD_DIAGRAM } from "@/core/data/story-scripts";
import type { StoryScriptId } from "@/core/entities";
import type {
	ICameraController,
	IStoryOrchestrator,
	IWhiteboardDriver,
} from "@/core/interfaces";
// Deep imports on purpose: the feature barrels also export React components
// (VoxelStudioLoader, WhiteboardCanvas + roughjs), and this store must stay a
// plain, DOM-free state module.
import { useSceneFocusStore } from "@/features/scene-3d/state/scene-focus-store";
import { useWhiteboardStore } from "@/features/whiteboard/state/whiteboard-store";
import {
	getNextStepIndex,
	resolveBoardAction,
	shouldAutoAdvance,
} from "../lib/story-progression";

/**
 * The story engine's state machine.
 *
 * Lives under features/storyteller/state, not core/state, for the same reason
 * as scene-focus-store.ts and whiteboard-store.ts: it is runtime wiring
 * between features, and core/ stays free of it.
 *
 * It never imports three/R3F or any DOM API. Both collaborators are reached
 * through the narrowest port that core/interfaces offers (DIP + ISP): the
 * camera is only ever used to focus a waypoint, so the port is
 * `Pick<ICameraController, "focusWaypoint">` rather than the whole controller.
 */
interface StorytellerState {
	activeScriptId: StoryScriptId | null;
	stepIndex: number;
	status: "IDLE" | "PLAYING";
	autoAdvance: boolean;
	play: (scriptId: StoryScriptId) => Promise<void>;
	next: () => void;
	stop: () => void;
	_setAutoAdvance: (enabled: boolean) => void;
}

/**
 * Module-scoped, deliberately non-reactive state — the same spirit as the
 * refs in scene-3d/hooks/use-camera-controller.ts. No consumer should ever
 * re-render because of a timer handle or a run counter.
 *
 * `runId` is the staleness guard: every step application takes a snapshot of
 * it and bails out after awaiting the camera if the counter has moved on,
 * which happens whenever play/next/stop is called mid-flight. Without it, a
 * camera promise resolving late would schedule a duplicate auto-advance timer
 * (skipping a step) after the user already clicked "next" or closed the tour.
 */
let pendingTimer: ReturnType<typeof setTimeout> | null = null;
let runId = 0;

function cancelPendingTimer(): void {
	if (pendingTimer) {
		clearTimeout(pendingTimer);
		pendingTimer = null;
	}
}

function board(): IWhiteboardDriver {
	return useWhiteboardStore.getState();
}

function cameraFocus(): Pick<ICameraController, "focusWaypoint"> {
	return useSceneFocusStore.getState();
}

export const useStorytellerStore = create<StorytellerState>((set, get) => {
	/**
	 * Private action. It is intentionally NOT part of StorytellerState: only
	 * play/next drive it, so exposing it on the store shape would widen the
	 * public surface (ISP) and invite consumers to jump to an arbitrary step
	 * without going through the state machine. A closure over set/get is the
	 * idiomatic Zustand way to keep an action private.
	 */
	const applyStep = async (index: number): Promise<void> => {
		cancelPendingTimer();
		const myRun = ++runId;

		// Speech and progress must appear immediately, without waiting for the
		// camera flight to finish.
		set({ stepIndex: index, status: "PLAYING" });

		const activeScriptId = get().activeScriptId;
		const step = activeScriptId
			? findStoryScript(activeScriptId)?.steps[index]
			: undefined;
		// Defensive guard: a missing script/step means nothing left to apply.
		if (!step) {
			return;
		}

		// The board action lands before the await so the diagram is born
		// together with the speech, not after the camera settles.
		const action = resolveBoardAction(step);
		if (action.kind === "clear") {
			board().clear();
		} else if (action.kind === "render") {
			board().render(action.elements);
		}

		await cameraFocus().focusWaypoint(step.waypointId);

		// Staleness guard: another play/next/stop superseded this run while the
		// camera was flying, so give up before touching timers.
		if (myRun !== runId) {
			return;
		}

		if (shouldAutoAdvance(step, get().autoAdvance)) {
			pendingTimer = setTimeout(() => get().next(), step.durationMs);
		}
	};

	return {
		activeScriptId: null,
		stepIndex: 0,
		status: "IDLE",
		autoAdvance: true,

		play: async (scriptId) => {
			cancelPendingTimer();
			runId += 1;

			const previousScriptId = get().activeScriptId;
			// Switching scripts must not let the previous diagram bleed into the
			// new one (a first step may legitimately keep the board).
			if (previousScriptId !== null && previousScriptId !== scriptId) {
				board().clear();
			}

			const script = findStoryScript(scriptId);
			// Silent no-op on unknown/empty scripts. Validating the script data
			// is story-scripts.test.ts's job, not a runtime error path.
			if (!script || script.steps.length === 0) {
				return;
			}

			set({ activeScriptId: scriptId });
			// Always restarts at step 0, both on a first play and when the same
			// script is clicked again.
			await applyStep(0);
		},

		next: () => {
			const { status, activeScriptId, stepIndex } = get();
			if (status === "IDLE" || activeScriptId === null) {
				return;
			}

			const total = findStoryScript(activeScriptId)?.steps.length ?? 0;
			const nextIndex = getNextStepIndex(stepIndex, total);

			if (nextIndex === null) {
				get().stop();
				return;
			}

			// Fire and forget: callers (a click handler, an autoplay timer) have
			// nothing to await.
			void applyStep(nextIndex);
		},

		stop: () => {
			cancelPendingTimer();
			// Invalidates any applyStep still awaiting its camera promise.
			runId += 1;

			// Back to the idle board, not an empty one: the scene's whiteboard is
			// always meant to show something.
			board().render(IDLE_BOARD_DIAGRAM);
			// Not awaited — closing the tour UI must feel instant.
			void cameraFocus().focusWaypoint("OVERVIEW");

			set({ activeScriptId: null, stepIndex: 0, status: "IDLE" });
		},

		_setAutoAdvance: (enabled) => set({ autoAdvance: enabled }),
	};
});

/**
 * Thin adapter exposing the store as an IStoryOrchestrator: a React-free
 * handle over the same state machine, reusable by non-component callers
 * (e.g. the future chat endpoint) without leaking Zustand's API.
 */
export function getStoryOrchestrator(): IStoryOrchestrator {
	return {
		play: (scriptId) => useStorytellerStore.getState().play(scriptId),
		next: () => useStorytellerStore.getState().next(),
		stop: () => useStorytellerStore.getState().stop(),
		getActiveScript: () => {
			const { activeScriptId } = useStorytellerStore.getState();
			return activeScriptId ? (findStoryScript(activeScriptId) ?? null) : null;
		},
		getActiveStep: () => {
			const { activeScriptId, stepIndex } = useStorytellerStore.getState();
			const script = activeScriptId
				? findStoryScript(activeScriptId)
				: undefined;
			return script?.steps[stepIndex] ?? null;
		},
		isPlaying: () => useStorytellerStore.getState().status === "PLAYING",
	};
}
