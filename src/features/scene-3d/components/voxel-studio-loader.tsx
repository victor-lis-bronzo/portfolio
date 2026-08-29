"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";
import type { SceneWaypointId } from "@/core/entities";
import { useSceneFocusStore } from "../state/scene-focus-store";
import { DevWaypointDebug } from "./dev-waypoint-debug";
import { LoadingFallback } from "./loading-fallback";

// The only file allowed to reference ./voxel-studio: everything else in
// this feature must stay free of "three" / "@react-three/fiber" imports
// so those never enter the SSR/server bundle.
const VoxelStudio = dynamic(
	() => import("./voxel-studio").then((mod) => mod.VoxelStudio),
	{ ssr: false, loading: () => <LoadingFallback /> },
);

export function VoxelStudioLoader() {
	const currentWaypoint = useSceneFocusStore((state) => state.currentWaypoint);

	const focusWaypoint = useCallback((id: SceneWaypointId) => {
		void useSceneFocusStore.getState().focusWaypoint(id);
	}, []);

	return (
		<div className="relative h-full w-full">
			<VoxelStudio />
			{process.env.NODE_ENV === "development" && (
				<DevWaypointDebug
					currentWaypoint={currentWaypoint}
					onFocusWaypoint={focusWaypoint}
				/>
			)}
		</div>
	);
}
