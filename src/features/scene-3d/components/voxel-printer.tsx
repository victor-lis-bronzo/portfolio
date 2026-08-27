"use client";

// Positioned near the PRINTER_3D waypoint target (x:0, y:0, z:-3).
// A primitives-only homage to a Bambu Lab A1 Mini — box base, thin
// cylinder gantry rods, a plane print bed, small box toolhead.
const PRINTER_ORIGIN: [number, number, number] = [0, 0, -3];
const BASE_COLOR = "#e2e8f0";
const ROD_COLOR = "#94a3b8";
const BED_COLOR = "#0f172a";
const TOOLHEAD_COLOR = "#f97316";

const RAIL_OFFSETS: [number, number][] = [
	[-0.45, -0.45],
	[0.45, -0.45],
	[-0.45, 0.45],
	[0.45, 0.45],
];

export function VoxelPrinter() {
	return (
		<group position={PRINTER_ORIGIN}>
			{/* Base */}
			<mesh position={[0, 0.1, 0]}>
				<boxGeometry args={[1, 0.2, 1]} />
				<meshStandardMaterial color={BASE_COLOR} />
			</mesh>

			{/* Print bed */}
			<mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[0.85, 0.85]} />
				<meshStandardMaterial color={BED_COLOR} />
			</mesh>

			{/* Gantry rods */}
			{RAIL_OFFSETS.map(([x, z]) => (
				<mesh key={`rod-${x}-${z}`} position={[x, 0.7, z]}>
					<cylinderGeometry args={[0.025, 0.025, 1, 8]} />
					<meshStandardMaterial color={ROD_COLOR} />
				</mesh>
			))}

			{/* Gantry top frame */}
			<mesh position={[0, 1.2, 0]}>
				<boxGeometry args={[1, 0.06, 1]} />
				<meshStandardMaterial color={ROD_COLOR} />
			</mesh>

			{/* Toolhead / nozzle carriage */}
			<mesh position={[0, 0.85, 0]}>
				<boxGeometry args={[0.2, 0.18, 0.2]} />
				<meshStandardMaterial color={TOOLHEAD_COLOR} />
			</mesh>
			<mesh position={[0, 0.72, 0]}>
				<coneGeometry args={[0.04, 0.08, 8]} />
				<meshStandardMaterial color="#334155" />
			</mesh>
		</group>
	);
}
