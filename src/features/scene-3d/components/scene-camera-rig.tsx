"use client";

import { OrthographicCamera } from "@react-three/drei";
import { SCENE_WAYPOINTS } from "@/core/entities";
import { useCameraController } from "../hooks/use-camera-controller";

const INITIAL_WAYPOINT = SCENE_WAYPOINTS[0];
const NEAR = 0.1;
// Orthographic depth is linear; a tighter frustum improves depth buffer
// precision and avoids z-fighting. The full scene fits within 60.
const FAR = 60;

/** Owns the camera controller and renders the orthographic camera it drives. */
export function SceneCameraRig() {
	useCameraController();

	return (
		<OrthographicCamera
			makeDefault
			position={[
				INITIAL_WAYPOINT.position.x,
				INITIAL_WAYPOINT.position.y,
				INITIAL_WAYPOINT.position.z,
			]}
			zoom={INITIAL_WAYPOINT.zoom}
			near={NEAR}
			far={FAR}
			onUpdate={(self) => {
				self.lookAt(
					INITIAL_WAYPOINT.target.x,
					INITIAL_WAYPOINT.target.y,
					INITIAL_WAYPOINT.target.z,
				);
				self.updateProjectionMatrix();
			}}
		/>
	);
}
