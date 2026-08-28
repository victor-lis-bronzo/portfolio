"use client";

import { Html } from "@react-three/drei";
import { useWhiteboardStore, WhiteboardCanvas } from "@/features/whiteboard";

// Positioned in Quadrant 4 (South-West / Front-Left)
export const WHITEBOARD_ORIGIN: [number, number, number] = [-2.5, 0, 2.2];
export const WHITEBOARD_ROTATION: [number, number, number] = [
	0,
	Math.PI / 4.5,
	0,
];

const FRAME_COLOR = "#64748b";
const CORNER_COLOR = "#334155";
const BOARD_COLOR = "#f8fafc";
const STAND_COLOR = "#475569";
const TRAY_COLOR = "#94a3b8";

export function VoxelWhiteboard() {
	const elements = useWhiteboardStore((state) => state.elements);
	return (
		<group position={WHITEBOARD_ORIGIN} rotation={WHITEBOARD_ROTATION}>
			{/* --- WHEELED MOBILE STAND --- */}
			{/* Left Foot Bar */}
			<mesh position={[-1.2, 0.05, 0]}>
				<boxGeometry args={[0.08, 0.06, 0.8]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			{/* Left Wheels */}
			<mesh position={[-1.2, 0.03, -0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>
			<mesh position={[-1.2, 0.03, 0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>

			{/* Right Foot Bar */}
			<mesh position={[1.2, 0.05, 0]}>
				<boxGeometry args={[0.08, 0.06, 0.8]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			{/* Right Wheels */}
			<mesh position={[1.2, 0.03, -0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>
			<mesh position={[1.2, 0.03, 0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>

			{/* Vertical Stand Posts */}
			<mesh position={[-1.2, 0.9, 0]}>
				<boxGeometry args={[0.06, 1.7, 0.06]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			<mesh position={[1.2, 0.9, 0]}>
				<boxGeometry args={[0.06, 1.7, 0.06]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			{/* Lower Crossbar */}
			<mesh position={[0, 0.3, 0]}>
				<boxGeometry args={[2.4, 0.05, 0.05]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>

			{/* --- WHITEBOARD BOARD ASSEMBLY --- */}
			<group position={[0, 1.45, 0]}>
				{/* Outer Aluminum Frame */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[3.0, 1.9, 0.05]} />
					<meshStandardMaterial
						color={FRAME_COLOR}
						metalness={0.6}
						roughness={0.3}
					/>
				</mesh>

				{/* Corner Protective Caps */}
				{[
					[-1.48, 0.93],
					[1.48, 0.93],
					[-1.48, -0.93],
					[1.48, -0.93],
				].map(([x, y]) => (
					<mesh key={`corner-${x}-${y}`} position={[x, y, 0.01]}>
						<boxGeometry args={[0.08, 0.08, 0.06]} />
						<meshStandardMaterial color={CORNER_COLOR} roughness={0.7} />
					</mesh>
				))}

				{/* White Glossy Magnetic Board Surface */}
				<mesh position={[0, 0, 0.015]}>
					<boxGeometry args={[2.88, 1.78, 0.02]} />
					<meshStandardMaterial
						color={BOARD_COLOR}
						roughness={0.15}
						metalness={0.1}
					/>
				</mesh>

				{/* Marker Pen Tray */}
				<mesh position={[0, -0.9, 0.06]}>
					<boxGeometry args={[2.6, 0.04, 0.1]} />
					<meshStandardMaterial
						color={TRAY_COLOR}
						metalness={0.5}
						roughness={0.3}
					/>
				</mesh>

				{/* Dry-Erase Markers & Eraser on Tray */}
				{/* Black Marker */}
				<mesh position={[-0.4, -0.87, 0.06]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
					<meshStandardMaterial color="#0f172a" roughness={0.5} />
				</mesh>
				{/* Blue Marker */}
				<mesh position={[-0.2, -0.87, 0.06]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
					<meshStandardMaterial color="#2563eb" roughness={0.5} />
				</mesh>
				{/* Red Marker */}
				<mesh position={[0.0, -0.87, 0.06]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
					<meshStandardMaterial color="#dc2626" roughness={0.5} />
				</mesh>
				{/* Magnetic Eraser */}
				<mesh position={[0.35, -0.86, 0.06]}>
					<boxGeometry args={[0.16, 0.04, 0.06]} />
					<meshStandardMaterial color="#1e3a8a" roughness={0.7} />
				</mesh>

				{/* --- EMBEDDED WHITEBOARD CANVAS --- */}
				<Html
					transform
					position={[0, 0, 0.03]}
					scale={0.0035}
					style={{
						width: "800px",
						height: "500px",
						userSelect: "none",
						pointerEvents: "none",
					}}
				>
					<WhiteboardCanvas
						elements={elements}
						className="h-full w-full bg-transparent"
					/>
				</Html>
			</group>
		</group>
	);
}
