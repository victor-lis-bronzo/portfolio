"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, type Group, Vector3 } from "three";
import { resolveSideWall } from "../lib/side-wall-visibility";

// Kept in sync with voxel-room.tsx (same room shell, split across two files).
const ROOM_MIN_X = -8;
const ROOM_MAX_X = 8;
const ROOM_MIN_Z = -6;
const ROOM_MAX_Z = 8;
const ROOM_WIDTH = ROOM_MAX_X - ROOM_MIN_X; // 16
const ROOM_DEPTH = ROOM_MAX_Z - ROOM_MIN_Z; // 14
const ROOM_CENTER_Z = (ROOM_MIN_Z + ROOM_MAX_Z) / 2; // 1

const WALL_HEIGHT = 4.2;
const WALL_THICKNESS = 0.2;
const BASEBOARD_HEIGHT = 0.16;

const WALL_COLOR = "#1e293b";
const WALL_ACCENT = "#334155";
const BASEBOARD_COLOR = "#3e2723";
const PANEL_DARK = "#0f172a";
const AMBER_DETAIL = "#f59e0b";
const ACCENT_GLOW = "#5629c2";
const TOOL_COLORS = ["#f97316", "#06b6d4", "#84cc16", "#a855f7"];

// Reused every frame; never allocate a Vector3 inside useFrame.
const viewDirection = new Vector3();

/**
 * One lateral wall of the studio, mirrored by `side`.
 *
 * The slab is a `planeGeometry` with `side={DoubleSide}` (not a box) on
 * purpose: a plane has exactly zero silhouette area when seen edge-on, so the
 * frame where the cutaway swaps walls cannot flash a sliver of dark wall over
 * the wood floor. The visible top thickness of the old box wall is the trade.
 */
function SideWall({ side }: { side: "LEFT" | "RIGHT" }) {
	const sign = side === "LEFT" ? -1 : 1;
	// Local X points INTO the room for both sides.
	const inward = (offset: number) => -sign * offset;

	return (
		<group position={[(sign * ROOM_WIDTH) / 2, 0, 0]}>
			{/* Main wall slab (zero-profile plane, visible from both faces) */}
			<mesh
				position={[0, WALL_HEIGHT / 2, ROOM_CENTER_Z]}
				rotation={[0, Math.PI / 2, 0]}
			>
				<planeGeometry args={[ROOM_DEPTH, WALL_HEIGHT]} />
				<meshStandardMaterial
					color={WALL_COLOR}
					roughness={0.8}
					side={DoubleSide}
				/>
			</mesh>

			{/* Baseboard */}
			<mesh position={[inward(0.02), BASEBOARD_HEIGHT / 2, ROOM_CENTER_Z]}>
				<boxGeometry args={[0.04, BASEBOARD_HEIGHT, ROOM_DEPTH]} />
				<meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.6} />
			</mesh>

			{/* Back corner pillar: closes the gap between this wall and the back
			    wall, which otherwise leaks the dark background at the seam. */}
			<mesh
				position={[
					inward(-WALL_THICKNESS / 2),
					WALL_HEIGHT / 2,
					ROOM_MIN_Z - WALL_THICKNESS / 2,
				]}
			>
				<boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, WALL_THICKNESS]} />
				<meshStandardMaterial color={WALL_COLOR} roughness={0.8} />
			</mesh>

			{/* Tool pegboard (inside the z ∈ [-3, 4] band visible at every angle) */}
			<group position={[inward(0.03), 1.9, 1.75]}>
				<mesh>
					<boxGeometry args={[0.04, 1.4, 2.4]} />
					<meshStandardMaterial color={WALL_ACCENT} roughness={0.75} />
				</mesh>
				{TOOL_COLORS.map((color, index) => (
					<mesh
						key={`side-tool-${side}-${color}`}
						position={[
							inward(0.07),
							index % 2 === 0 ? 0.32 : -0.28,
							-0.85 + index * 0.56,
						]}
					>
						<boxGeometry args={[0.1, 0.34, 0.14]} />
						<meshStandardMaterial color={color} roughness={0.7} />
					</mesh>
				))}
			</group>

			{/* Electrical panel */}
			<group position={[inward(0.05), 2.2, -1.5]}>
				<mesh>
					<boxGeometry args={[0.1, 0.7, 0.5]} />
					<meshStandardMaterial color={PANEL_DARK} roughness={0.6} />
				</mesh>
				{[-0.18, 0, 0.18].map((z) => (
					<mesh
						key={`side-breaker-${side}-${z}`}
						position={[inward(0.03), 0.14, z]}
					>
						<boxGeometry args={[0.04, 0.06, 0.12]} />
						<meshStandardMaterial
							color={AMBER_DETAIL}
							emissive={AMBER_DETAIL}
							emissiveIntensity={0.25}
						/>
					</mesh>
				))}
			</group>

			{/* Vertical accent strip, echoing the horizontal bar on the back wall */}
			<mesh position={[inward(0.03), 2.1, 3.5]}>
				<boxGeometry args={[0.03, 2.2, 0.06]} />
				<meshStandardMaterial
					color={ACCENT_GLOW}
					emissive={ACCENT_GLOW}
					emissiveIntensity={0.4}
				/>
			</mesh>
		</group>
	);
}

/**
 * Both lateral walls, with the one the camera looks through hidden each frame.
 *
 * Visibility is driven by the LIVE camera direction (not by the target
 * waypoint): `currentWaypoint` flips on click, so keying off it would pop the
 * incoming wall in front of the scene during the first half of the flight.
 */
export function StudioSideWalls() {
	const leftRef = useRef<Group>(null);
	const rightRef = useRef<Group>(null);

	// No renderPriority: any priority > 0 would disable R3F's auto-render.
	useFrame((state) => {
		if (!leftRef.current || !rightRef.current) return;

		state.camera.getWorldDirection(viewDirection);
		const visible = resolveSideWall(viewDirection.x);

		leftRef.current.visible = visible === "LEFT";
		rightRef.current.visible = visible === "RIGHT";
	});

	return (
		<group>
			<group ref={leftRef}>
				<SideWall side="LEFT" />
			</group>
			<group ref={rightRef}>
				<SideWall side="RIGHT" />
			</group>
		</group>
	);
}
