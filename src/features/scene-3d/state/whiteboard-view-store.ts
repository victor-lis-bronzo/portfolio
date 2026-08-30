import { create } from "zustand";

/** Which face of the embedded whiteboard panel is currently showing. */
export type BoardView = "diagram" | "assistant";

/**
 * Bridge between the whiteboard panel — which lives inside the R3F <Canvas>
 * tree, embedded in a drei <Html> — and DOM controls rendered outside of it
 * (the global "ask me" launcher in the app chrome).
 *
 * Same rationale as scene-focus-store.ts: this is scoped to the 3D feature and
 * has no meaning outside of it, so it lives under features/scene-3d/state
 * rather than core/state. It used to be a `useState` inside VoxelWhiteboard,
 * which made the view unreachable from any DOM sibling of the Canvas.
 *
 * It defaults to the diagram so the narrated story looks exactly as it did
 * before; the assistant is something a visitor opts into.
 */
interface WhiteboardViewState {
	view: BoardView;
	setView: (view: BoardView) => void;
}

export const useWhiteboardViewStore = create<WhiteboardViewState>((set) => ({
	view: "diagram",
	setView: (view) => set({ view }),
}));
