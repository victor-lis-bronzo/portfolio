"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import type { OrthographicCamera } from "three";
import type {
	SceneWaypoint,
	SceneWaypointId,
	Vector3Tuple,
} from "@/core/entities";
import { SCENE_WAYPOINTS } from "@/core/entities";
import type { ICameraController } from "@/core/interfaces";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { dampVector3, isVector3Settled } from "../lib/waypoint-camera-math";
import { useSceneFocusStore } from "../state/scene-focus-store";

const DAMP_LAMBDA = 6;
const DEFAULT_WAYPOINT = SCENE_WAYPOINTS[0];

/**
 * Canvas size the waypoint zooms in scene-waypoint-config.ts were authored for.
 * drei's <OrthographicCamera> derives its frustum from the canvas pixel size
 * (left/right = ±width/2, top/bottom = ±height/2), so the visible world extent
 * is `size / zoom`. A phone canvas is ~3x narrower than this reference, which
 * shrank the visible world by the same factor and cropped the studio.
 */
const REFERENCE_CANVAS_WIDTH = 1280;
const REFERENCE_CANVAS_HEIGHT = 720;
/** Floor so a degenerate/zero-ish canvas can't collapse the camera. */
const MIN_ASPECT_ZOOM_FACTOR = 0.2;

/**
 * Multiplier applied to every waypoint zoom so the world box framed at the
 * reference canvas size stays fully visible ("contain") on smaller or
 * differently-proportioned canvases.
 *
 * Clamped to <= 1 on purpose: canvases at or above the reference keep the
 * authored framing exactly, so this is a no-op on desktop and only ever zooms
 * out on narrow/portrait viewports.
 */
export function getAspectZoomFactor(width: number, height: number): number {
	if (!(width > 0) || !(height > 0)) return 1;

	const factor = Math.min(
		width / REFERENCE_CANVAS_WIDTH,
		height / REFERENCE_CANVAS_HEIGHT,
	);

	return Math.min(1, Math.max(MIN_ASPECT_ZOOM_FACTOR, factor));
}

function findWaypoint(id: SceneWaypointId): SceneWaypoint {
	const waypoint = SCENE_WAYPOINTS.find((candidate) => candidate.id === id);
	if (!waypoint) {
		throw new Error(`Unknown scene waypoint: ${id}`);
	}
	return waypoint;
}

/**
 * Implements ICameraController. Must be called from inside the R3F
 * tree (uses useThree/useFrame), so it belongs to scene-camera-rig.tsx.
 *
 * State-bridging: this hook is the only place that knows the "real"
 * transition state (it owns the imperative camera object). It mirrors
 * that state into the scene-focus zustand store (state/scene-focus-store.ts)
 * on every change so DOM siblings rendered outside <Canvas> (the
 * whiteboard overlay, the dev debug buttons) can read/react to it, and
 * it registers its `focusWaypoint` implementation into the same store
 * so those DOM siblings can trigger a focus change without any prop
 * drilling across the dynamic-import boundary.
 */
export function useCameraController(): ICameraController {
	// Narrow selectors (rather than a bare `useThree()`, which subscribes to
	// every root-state change) so this hook - and therefore SceneCameraRig,
	// which calls it - only re-renders when the camera is swapped or the canvas
	// is resized.
	const camera = useThree((state) => state.camera);
	const size = useThree((state) => state.size);
	const prefersReducedMotion = usePrefersReducedMotion();

	// Aspect compensation is kept in a ref (not baked into the stored target)
	// so the refs below always hold the *authored* waypoint zoom. The factor is
	// multiplied in at the moment the camera is written, which makes the mount
	// path, the per-frame transition path and resize all agree on one number —
	// otherwise the zoom would jump on the first waypoint transition.
	const zoomFactor = getAspectZoomFactor(size.width, size.height);
	const zoomFactorRef = useRef(zoomFactor);

	const currentWaypointRef = useRef<SceneWaypointId>(DEFAULT_WAYPOINT.id);
	const transitioningRef = useRef(false);
	const currentLookAtRef = useRef<Vector3Tuple>({
		...DEFAULT_WAYPOINT.target,
	});
	const targetPositionRef = useRef<Vector3Tuple>({
		...DEFAULT_WAYPOINT.position,
	});
	const targetLookAtRef = useRef<Vector3Tuple>({ ...DEFAULT_WAYPOINT.target });
	/** Authored waypoint zoom, before aspect compensation. */
	const targetBaseZoomRef = useRef<number>(
		DEFAULT_WAYPOINT.zoom ?? camera.zoom,
	);
	const resolveTransitionRef = useRef<(() => void) | null>(null);

	const setCurrentWaypoint = useSceneFocusStore(
		(state) => state._setCurrentWaypoint,
	);
	const setTransitioning = useSceneFocusStore(
		(state) => state._setTransitioning,
	);
	const registerFocusWaypoint = useSceneFocusStore(
		(state) => state._registerFocusWaypoint,
	);

	const applyInstant = useCallback(
		(waypoint: SceneWaypoint) => {
			camera.position.set(
				waypoint.position.x,
				waypoint.position.y,
				waypoint.position.z,
			);
			currentLookAtRef.current = { ...waypoint.target };
			camera.lookAt(waypoint.target.x, waypoint.target.y, waypoint.target.z);

			if (waypoint.zoom !== undefined && "zoom" in camera) {
				targetBaseZoomRef.current = waypoint.zoom;
				const orthoCamera = camera as OrthographicCamera;
				orthoCamera.zoom = waypoint.zoom * zoomFactorRef.current;
				orthoCamera.updateProjectionMatrix();
			}
		},
		[camera],
	);

	const focusWaypoint = useCallback(
		(id: SceneWaypointId): Promise<void> => {
			const waypoint = findWaypoint(id);

			// A previous transition may still be in flight (its promise
			// unresolved). Resolve it now so callers of that earlier call
			// don't hang forever - this new call supersedes it.
			resolveTransitionRef.current?.();
			resolveTransitionRef.current = null;

			// The UI reflects the click's intent immediately; `isTransitioning`
			// keeps describing the camera's actual movement.
			currentWaypointRef.current = id;
			setCurrentWaypoint(id);

			if (prefersReducedMotion) {
				applyInstant(waypoint);
				transitioningRef.current = false;
				setTransitioning(false);
				return Promise.resolve();
			}

			targetPositionRef.current = { ...waypoint.position };
			targetLookAtRef.current = { ...waypoint.target };
			targetBaseZoomRef.current =
				waypoint.zoom ?? camera.zoom / zoomFactorRef.current;
			transitioningRef.current = true;
			setTransitioning(true);

			return new Promise((resolve) => {
				resolveTransitionRef.current = () => {
					resolve();
				};
			});
		},
		[
			applyInstant,
			camera,
			prefersReducedMotion,
			setCurrentWaypoint,
			setTransitioning,
		],
	);

	useEffect(() => {
		applyInstant(DEFAULT_WAYPOINT);
	}, [applyInstant]);

	useEffect(() => {
		registerFocusWaypoint(focusWaypoint);
	}, [registerFocusWaypoint, focusWaypoint]);

	// Resize / orientation change. useFrame only runs mid-transition, so the
	// idle case needs its own path; snapping is fine here because a resize is
	// already a discontinuity. Re-derives from the stored base zoom, so it is
	// correct for whichever waypoint is currently framed - not just the initial
	// one.
	useEffect(() => {
		zoomFactorRef.current = zoomFactor;
		if (!("zoom" in camera)) return;

		const orthoCamera = camera as OrthographicCamera;
		orthoCamera.zoom = targetBaseZoomRef.current * zoomFactor;
		orthoCamera.updateProjectionMatrix();
	}, [camera, zoomFactor]);

	useFrame((_, delta) => {
		if (!transitioningRef.current) return;

		const currentPosition: Vector3Tuple = {
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z,
		};
		const nextPosition = dampVector3(
			currentPosition,
			targetPositionRef.current,
			DAMP_LAMBDA,
			delta,
		);
		camera.position.set(nextPosition.x, nextPosition.y, nextPosition.z);

		const nextLookAt = dampVector3(
			currentLookAtRef.current,
			targetLookAtRef.current,
			DAMP_LAMBDA,
			delta,
		);
		currentLookAtRef.current = nextLookAt;
		camera.lookAt(nextLookAt.x, nextLookAt.y, nextLookAt.z);

		let zoomSettled = true;
		if ("zoom" in camera) {
			const orthoCamera = camera as OrthographicCamera;
			const currentZoom = { x: orthoCamera.zoom, y: 0, z: 0 };
			const targetZoom = {
				x: targetBaseZoomRef.current * zoomFactorRef.current,
				y: 0,
				z: 0,
			};
			const nextZoom = dampVector3(
				currentZoom,
				targetZoom,
				DAMP_LAMBDA,
				delta,
			).x;
			orthoCamera.zoom = nextZoom;
			orthoCamera.updateProjectionMatrix();
			zoomSettled = isVector3Settled({ x: nextZoom, y: 0, z: 0 }, targetZoom);
		}

		const settled =
			isVector3Settled(nextPosition, targetPositionRef.current) &&
			isVector3Settled(nextLookAt, targetLookAtRef.current) &&
			zoomSettled;

		if (settled) {
			transitioningRef.current = false;
			setTransitioning(false);
			resolveTransitionRef.current?.();
			resolveTransitionRef.current = null;
		}
	});

	return {
		focusWaypoint,
		getCurrentWaypoint: () => currentWaypointRef.current,
		isTransitioning: () => transitioningRef.current,
	};
}
