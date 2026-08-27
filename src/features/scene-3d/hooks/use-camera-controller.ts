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
	const { camera } = useThree();
	const prefersReducedMotion = usePrefersReducedMotion();

	const currentWaypointRef = useRef<SceneWaypointId>(DEFAULT_WAYPOINT.id);
	const transitioningRef = useRef(false);
	const currentLookAtRef = useRef<Vector3Tuple>({
		...DEFAULT_WAYPOINT.target,
	});
	const targetPositionRef = useRef<Vector3Tuple>({
		...DEFAULT_WAYPOINT.position,
	});
	const targetLookAtRef = useRef<Vector3Tuple>({ ...DEFAULT_WAYPOINT.target });
	const targetZoomRef = useRef<number>(DEFAULT_WAYPOINT.zoom ?? camera.zoom);
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
				const orthoCamera = camera as OrthographicCamera;
				orthoCamera.zoom = waypoint.zoom;
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

			if (prefersReducedMotion) {
				applyInstant(waypoint);
				currentWaypointRef.current = id;
				transitioningRef.current = false;
				setCurrentWaypoint(id);
				setTransitioning(false);
				return Promise.resolve();
			}

			targetPositionRef.current = { ...waypoint.position };
			targetLookAtRef.current = { ...waypoint.target };
			targetZoomRef.current = waypoint.zoom ?? camera.zoom;
			transitioningRef.current = true;
			setTransitioning(true);

			return new Promise((resolve) => {
				resolveTransitionRef.current = () => {
					currentWaypointRef.current = id;
					setCurrentWaypoint(id);
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
		registerFocusWaypoint(focusWaypoint);
	}, [registerFocusWaypoint, focusWaypoint]);

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
			const targetZoom = { x: targetZoomRef.current, y: 0, z: 0 };
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
