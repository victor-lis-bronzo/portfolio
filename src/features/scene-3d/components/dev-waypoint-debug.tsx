"use client";

import type { SceneWaypointId } from "@/core/entities";
import { SCENE_WAYPOINTS } from "@/core/entities";
import { Button } from "@/shared/components/ui/button";

export interface DevWaypointDebugProps {
	currentWaypoint: SceneWaypointId;
	onFocusWaypoint: (id: SceneWaypointId) => void;
}

/**
 * Dev-only overlay: one button per SceneWaypointId. Rendered only when
 * process.env.NODE_ENV === "development" — that check is made once, at
 * the call site (voxel-studio-loader.tsx), not inside this component.
 */
export function DevWaypointDebug({
	currentWaypoint,
	onFocusWaypoint,
}: DevWaypointDebugProps) {
	return (
		<div className="fixed right-4 bottom-4 z-50 flex flex-col gap-1 rounded-lg border border-border/50 bg-background/80 p-2 shadow-md backdrop-blur-sm">
			{SCENE_WAYPOINTS.map((waypoint) => (
				<Button
					key={waypoint.id}
					type="button"
					size="sm"
					variant={currentWaypoint === waypoint.id ? "default" : "outline"}
					onClick={() => onFocusWaypoint(waypoint.id)}
				>
					{waypoint.label ?? waypoint.id}
				</Button>
			))}
		</div>
	);
}
