import { create } from "zustand";
import type { SceneWaypointId } from "@/core/entities";

/**
 * Local, ephemeral bridge between the R3F-internal camera controller
 * (see hooks/use-camera-controller.ts, which only runs inside the
 * <Canvas> tree) and sibling DOM overlays rendered outside of it
 * (whiteboard-wall-overlay.tsx, dev-waypoint-debug.tsx).
 *
 * This intentionally lives under features/scene-3d/state, not
 * core/state: it is scoped to this feature and has no meaning outside
 * of it, unlike mode-store.ts which is cross-cutting app state.
 *
 * `focusWaypoint` starts as a no-op and is replaced by the real
 * implementation once use-camera-controller.ts mounts inside the
 * Canvas, registering itself via `_registerFocusWaypoint`. DOM
 * consumers call `useSceneFocusStore.getState().focusWaypoint(id)`
 * (or the selector) without needing to know it originates inside R3F.
 */
interface SceneFocusState {
	currentWaypoint: SceneWaypointId;
	isTransitioning: boolean;
	focusWaypoint: (id: SceneWaypointId) => Promise<void>;
	_setCurrentWaypoint: (id: SceneWaypointId) => void;
	_setTransitioning: (value: boolean) => void;
	_registerFocusWaypoint: (fn: (id: SceneWaypointId) => Promise<void>) => void;
}

const noopFocusWaypoint = async () => {};

export const useSceneFocusStore = create<SceneFocusState>((set) => ({
	currentWaypoint: "OVERVIEW",
	isTransitioning: false,
	focusWaypoint: noopFocusWaypoint,
	_setCurrentWaypoint: (id) => set({ currentWaypoint: id }),
	_setTransitioning: (value) => set({ isTransitioning: value }),
	_registerFocusWaypoint: (fn) => set({ focusWaypoint: fn }),
}));
