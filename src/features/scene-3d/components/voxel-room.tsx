"use client";

// The room is no longer square: it grew in ±X and in +Z only, so the back wall
// (and every prop anchored to it) could stay exactly where it always was.
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

const FLOOR_FOUNDATION_COLOR = "#090d16";
const WOOD_FLOOR_COLOR = "#785135";
const WOOD_PLANK_ALT = "#6d472c";
const WALL_COLOR = "#1e293b";
const WALL_ACCENT = "#334155";
const BASEBOARD_COLOR = "#3e2723";
const ACOUSTIC_WOOD = "#a07855";
const ACCENT_GLOW = "#5629c2";

export function VoxelRoom() {
	return (
		<group>
			{/* Foundation Plinth */}
			<mesh position={[0, -0.22, ROOM_CENTER_Z]}>
				<boxGeometry args={[ROOM_WIDTH + 0.6, 0.4, ROOM_DEPTH + 0.6]} />
				<meshStandardMaterial color={FLOOR_FOUNDATION_COLOR} roughness={0.9} />
			</mesh>

			{/* Floor Parquet / Wood Planks Base */}
			<mesh position={[0, 0, ROOM_CENTER_Z]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
				<meshStandardMaterial color={WOOD_FLOOR_COLOR} roughness={0.6} />
			</mesh>

			{/* Stylized Floor Grid Planks (Voxel aesthetic) */}
			{Array.from({ length: 7 }).map((_, i) => {
				const offset = ROOM_MIN_Z + (i + 1) * 2 - 1;
				return (
					<mesh
						key={`floor-plank-${offset}`}
						position={[0, 0.012, offset]}
						rotation={[-Math.PI / 2, 0, 0]}
					>
						<planeGeometry args={[ROOM_WIDTH, 0.03]} />
						<meshStandardMaterial color={WOOD_PLANK_ALT} roughness={0.7} />
					</mesh>
				);
			})}

			{/* Cozy Center Studio Rug */}
			<mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
				<planeGeometry args={[4.2, 4.2]} />
				<meshStandardMaterial color="#1e293b" roughness={0.85} />
			</mesh>
			<mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
				<planeGeometry args={[3.8, 3.8]} />
				<meshStandardMaterial color="#2d3748" roughness={0.9} />
			</mesh>

			{/* The two side walls (X = ±8) live in studio-side-walls.tsx, which
			    hides whichever one the camera would look through. */}

			{/* --- BACK WALL (North-East, along Z = -6) --- */}
			<group position={[0, WALL_HEIGHT / 2, ROOM_MIN_Z]}>
				{/* Main Wall Slab */}
				<mesh position={[0, 0, -WALL_THICKNESS / 2]}>
					<boxGeometry args={[ROOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
					<meshStandardMaterial color={WALL_COLOR} roughness={0.8} />
				</mesh>
				{/* Baseboard */}
				<mesh position={[0, -WALL_HEIGHT / 2 + BASEBOARD_HEIGHT / 2, 0.02]}>
					<boxGeometry args={[ROOM_WIDTH, BASEBOARD_HEIGHT, 0.04]} />
					<meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.6} />
				</mesh>

				{/* Acoustic Slatted Wood Panels (Behind Dev Desk) */}
				<group position={[-1.2, -0.3, 0.02]}>
					{[-0.8, -0.4, 0, 0.4, 0.8].map((x) => (
						<mesh key={`acoustic-back-${x}`} position={[x, 0, 0]}>
							<boxGeometry args={[0.2, 2.2, 0.04]} />
							<meshStandardMaterial color={ACOUSTIC_WOOD} roughness={0.5} />
						</mesh>
					))}
				</group>

				{/* Ambient Studio Accent Light Bar */}
				<mesh position={[0, 1.2, 0.02]}>
					<boxGeometry args={[8, 0.06, 0.03]} />
					<meshStandardMaterial
						color={ACCENT_GLOW}
						emissive={ACCENT_GLOW}
						emissiveIntensity={0.4}
					/>
				</mesh>

				{/* High-tech Studio Wall Shelf above 3D Printer */}
				<group position={[3, 0.5, 0.2]}>
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[2.4, 0.06, 0.4]} />
						<meshStandardMaterial color={WALL_ACCENT} roughness={0.5} />
					</mesh>
					{/* Spool boxes on shelf */}
					<mesh position={[-0.7, 0.16, 0]}>
						<boxGeometry args={[0.3, 0.26, 0.3]} />
						<meshStandardMaterial color="#f97316" roughness={0.7} />
					</mesh>
					<mesh position={[-0.3, 0.16, 0]}>
						<boxGeometry args={[0.3, 0.26, 0.3]} />
						<meshStandardMaterial color="#06b6d4" roughness={0.7} />
					</mesh>
					<mesh position={[0.1, 0.16, 0]}>
						<boxGeometry args={[0.3, 0.26, 0.3]} />
						<meshStandardMaterial color="#84cc16" roughness={0.7} />
					</mesh>
					<mesh position={[0.5, 0.16, 0]}>
						<boxGeometry args={[0.3, 0.26, 0.3]} />
						<meshStandardMaterial color="#a855f7" roughness={0.7} />
					</mesh>
				</group>
			</group>
		</group>
	);
}
