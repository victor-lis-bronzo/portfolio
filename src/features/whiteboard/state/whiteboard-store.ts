import { create } from "zustand";
import { IDLE_BOARD_DIAGRAM } from "@/core/data/story-scripts";
import type { DiagramElement } from "@/core/entities";
import type { IWhiteboardDriver } from "@/core/interfaces";

/**
 * The first real implementation of `IWhiteboardDriver`.
 *
 * This lives under features/whiteboard/state, not core/state, for the same
 * reason as features/scene-3d/state/scene-focus-store.ts: it is a runtime
 * bridge between a consumer that only exists inside the R3F <Canvas> tree
 * (voxel-whiteboard.tsx) and an external producer outside of it (the
 * storyteller). It is feature-scoped state, not cross-cutting app state,
 * and core/ must stay free of runtime wiring like this.
 *
 * `revision` increments on every render()/clear() so consumers can use it as
 * a React `key` and force a remount of the WhiteboardCanvas — that replays
 * the hand-drawn stroke animation even when element ids repeat between steps.
 *
 * Deliberately no `reset()` (ISP): it would widen IWhiteboardDriver for mere
 * convenience. The storyteller already knows IDLE_BOARD_DIAGRAM and calls
 * `render(IDLE_BOARD_DIAGRAM)` to go back to the idle board.
 */
interface WhiteboardState extends IWhiteboardDriver {
	elements: DiagramElement[];
	revision: number;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
	elements: IDLE_BOARD_DIAGRAM,
	revision: 0,
	render: (elements) =>
		set((state) => ({ elements, revision: state.revision + 1 })),
	clear: () => set((state) => ({ elements: [], revision: state.revision + 1 })),
}));
