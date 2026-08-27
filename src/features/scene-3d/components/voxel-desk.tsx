"use client";

// Positioned near the DESK waypoint target (x:-3, y:0, z:0).
const DESK_ORIGIN: [number, number, number] = [-3, 0, 0];
const DESK_COLOR = "#8b5e3c";
const LEG_COLOR = "#5c3d24";
const MONITOR_FRAME_COLOR = "#1f2937";
const SCREEN_COLOR = "#38bdf8";

const LEG_OFFSETS: [number, number][] = [
	[-1.1, -0.5],
	[1.1, -0.5],
	[-1.1, 0.5],
	[1.1, 0.5],
];

export function VoxelDesk() {
	return (
		<group position={DESK_ORIGIN}>
			{/* Desk surface */}
			<mesh position={[0, 0.75, 0]}>
				<boxGeometry args={[2.4, 0.1, 1.2]} />
				<meshStandardMaterial color={DESK_COLOR} />
			</mesh>

			{/* Legs */}
			{LEG_OFFSETS.map(([x, z]) => (
				<mesh key={`leg-${x}-${z}`} position={[x, 0.35, z]}>
					<boxGeometry args={[0.1, 0.7, 0.1]} />
					<meshStandardMaterial color={LEG_COLOR} />
				</mesh>
			))}

			{/* Monitor 1 */}
			<group position={[-0.5, 1.05, -0.35]}>
				<mesh>
					<boxGeometry args={[0.7, 0.45, 0.05]} />
					<meshStandardMaterial color={MONITOR_FRAME_COLOR} />
				</mesh>
				<mesh position={[0, 0, 0.03]}>
					<planeGeometry args={[0.6, 0.36]} />
					<meshStandardMaterial
						color={SCREEN_COLOR}
						emissive={SCREEN_COLOR}
						emissiveIntensity={0.5}
					/>
				</mesh>
				<mesh position={[0, -0.3, 0]}>
					<boxGeometry args={[0.06, 0.15, 0.06]} />
					<meshStandardMaterial color={MONITOR_FRAME_COLOR} />
				</mesh>
			</group>

			{/* Monitor 2 */}
			<group position={[0.4, 1.05, -0.35]} rotation={[0, -0.3, 0]}>
				<mesh>
					<boxGeometry args={[0.6, 0.4, 0.05]} />
					<meshStandardMaterial color={MONITOR_FRAME_COLOR} />
				</mesh>
				<mesh position={[0, 0, 0.03]}>
					<planeGeometry args={[0.5, 0.32]} />
					<meshStandardMaterial
						color={SCREEN_COLOR}
						emissive={SCREEN_COLOR}
						emissiveIntensity={0.5}
					/>
				</mesh>
				<mesh position={[0, -0.27, 0]}>
					<boxGeometry args={[0.06, 0.14, 0.06]} />
					<meshStandardMaterial color={MONITOR_FRAME_COLOR} />
				</mesh>
			</group>
		</group>
	);
}
