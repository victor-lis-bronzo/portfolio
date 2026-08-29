"use client";

import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { SCENE_WAYPOINTS } from "@/core/entities";
import {
	getAspectZoomFactor,
	useCameraController,
} from "../hooks/use-camera-controller";

const INITIAL_WAYPOINT = SCENE_WAYPOINTS[0];
// Module-level so the tuple keeps a stable identity across renders. R3F diffs
// props by reference, and a fresh array on every render would re-apply the
// initial position - snapping the camera back to OVERVIEW on each resize.
const INITIAL_POSITION: [number, number, number] = [
	INITIAL_WAYPOINT.position.x,
	INITIAL_WAYPOINT.position.y,
	INITIAL_WAYPOINT.position.z,
];
const NEAR = 0.1;
// Orthographic depth is linear; a tighter frustum improves depth buffer
// precision and avoids z-fighting. The full scene fits within 60.
const FAR = 60;

/** Owns the camera controller and renders the orthographic camera it drives. */
export function SceneCameraRig() {
	useCameraController();

	// `get` is a stable store accessor, so selecting it does not subscribe this
	// component to canvas resizes. That matters: re-rendering here would push
	// `position`/`onUpdate` back onto the camera and yank it to the initial
	// waypoint on every resize. Resize is handled inside the controller, which
	// knows which waypoint is actually framed.
	const get = useThree((state) => state.get);

	// Seeds the very first frame with an aspect-correct zoom so there is no
	// flash of cropped framing before the controller's mount effect lands. The
	// controller owns the value from then on, using the same factor function.
	const [initialZoom] = useState(() => {
		const { width, height } = get().size;
		return (INITIAL_WAYPOINT.zoom ?? 1) * getAspectZoomFactor(width, height);
	});

	// drei re-renders <OrthographicCamera> on resize (it recomputes the frustum
	// from the canvas size), which re-fires `onUpdate`. Orienting the camera
	// only once keeps that from resetting the user's current waypoint.
	const didOrientRef = useRef(false);

	return (
		<OrthographicCamera
			makeDefault
			position={INITIAL_POSITION}
			zoom={initialZoom}
			near={NEAR}
			far={FAR}
			onUpdate={(self) => {
				if (!didOrientRef.current) {
					didOrientRef.current = true;
					self.lookAt(
						INITIAL_WAYPOINT.target.x,
						INITIAL_WAYPOINT.target.y,
						INITIAL_WAYPOINT.target.z,
					);
				}
				self.updateProjectionMatrix();
			}}
		/>
	);
}
