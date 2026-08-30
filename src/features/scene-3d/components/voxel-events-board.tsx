"use client";

import { Html } from "@react-three/drei";
import { EventsBoardCanvas } from "@/features/events/components/events-board-canvas";

// Positioned somewhere in the room. E.g., Quadrant 1 (North-East) or along the left wall.
// Let's place it on the left wall (X = -7.8) facing right (rotation-y = Math.PI/2)
export const EVENTS_BOARD_ORIGIN: [number, number, number] = [-7.8, 1.8, 4.0];
export const EVENTS_BOARD_ROTATION: [number, number, number] = [
	0,
	Math.PI / 2,
	0,
];

const WOOD_FRAME = "#5c3a21";
const CORK_BOARD = "#2c1e16"; // Dark cork

const HTML_TRANSFORM_UNIT_DISTANCE_FACTOR = 400;

export function VoxelEventsBoard() {
	return (
		<group position={EVENTS_BOARD_ORIGIN} rotation={EVENTS_BOARD_ROTATION}>
			{/* Wooden Frame */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[3.2, 2.0, 0.1]} />
				<meshStandardMaterial color={WOOD_FRAME} roughness={0.8} />
			</mesh>

			{/* Backing/Cork */}
			<mesh position={[0, 0, 0.05]}>
				<boxGeometry args={[3.0, 1.8, 0.02]} />
				<meshStandardMaterial color={CORK_BOARD} roughness={0.9} />
			</mesh>

			{/* HTML Overlay */}
			<Html
				transform
				position={[0, 0, 0.07]}
				scale={0.0035}
				distanceFactor={HTML_TRANSFORM_UNIT_DISTANCE_FACTOR}
				zIndexRange={[0, 0]}
				style={{
					width: "860px",
					height: "510px",
					userSelect: "none",
					// Pointer events must be "auto" on the inner container if we want interaction
				}}
			>
				{/* Pointer events auto allows clicking the badges */}
				<div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
					<EventsBoardCanvas />
				</div>
			</Html>
		</group>
	);
}
