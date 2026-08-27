"use client";

// Positioned in Quadrant 1 (North-West / Back-Left)
export const DESK_ORIGIN: [number, number, number] = [-3, 0, -2.2];

const TABLETOP_COLOR = "#5c3d24";
const DESK_FRAME_COLOR = "#1e293b";
const DESK_PAD_COLOR = "#0f172a";
const MONITOR_FRAME_COLOR = "#18181b";
const SCREEN_IDE_BG = "#0d1117";
const SCREEN_TERMINAL_BG = "#090d16";
const PC_CASE_COLOR = "#18181b";
const CHAIR_FRAME_COLOR = "#18181b";
const CHAIR_MESH_COLOR = "#27272a";
const ACCENT_RGB = "#6366f1";

export function VoxelDesk() {
	return (
		<group position={DESK_ORIGIN}>
			{/* ================= DESK STRUCTURE ================= */}
			{/* Walnut Desktop */}
			<mesh position={[0, 0.74, 0]}>
				<boxGeometry args={[2.4, 0.08, 1.2]} />
				<meshStandardMaterial color={TABLETOP_COLOR} roughness={0.5} />
			</mesh>

			{/* Beveled Edge Highlight */}
			<mesh position={[0, 0.782, 0.59]}>
				<boxGeometry args={[2.38, 0.01, 0.02]} />
				<meshStandardMaterial color="#8b5e3c" roughness={0.4} />
			</mesh>

			{/* Left T-Leg */}
			<group position={[-1.0, 0.35, 0]}>
				<mesh position={[0, -0.32, 0]}>
					<boxGeometry args={[0.12, 0.06, 0.9]} />
					<meshStandardMaterial
						color={DESK_FRAME_COLOR}
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.08, 0.64, 0.1]} />
					<meshStandardMaterial
						color={DESK_FRAME_COLOR}
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
				<mesh position={[0, 0.32, 0]}>
					<boxGeometry args={[0.1, 0.06, 0.8]} />
					<meshStandardMaterial
						color={DESK_FRAME_COLOR}
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
			</group>

			{/* Right T-Leg */}
			<group position={[1.0, 0.35, 0]}>
				<mesh position={[0, -0.32, 0]}>
					<boxGeometry args={[0.12, 0.06, 0.9]} />
					<meshStandardMaterial
						color={DESK_FRAME_COLOR}
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.08, 0.64, 0.1]} />
					<meshStandardMaterial
						color={DESK_FRAME_COLOR}
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
				<mesh position={[0, 0.32, 0]}>
					<boxGeometry args={[0.1, 0.06, 0.8]} />
					<meshStandardMaterial
						color={DESK_FRAME_COLOR}
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
			</group>

			{/* Motor Cable Crossbeam */}
			<mesh position={[0, 0.64, -0.2]}>
				<boxGeometry args={[1.9, 0.06, 0.08]} />
				<meshStandardMaterial color="#0f172a" metalness={0.8} />
			</mesh>

			{/* Sit-Stand Height Keypad Controller */}
			<mesh position={[1.05, 0.72, 0.55]}>
				<boxGeometry args={[0.12, 0.03, 0.06]} />
				<meshStandardMaterial color="#09090b" roughness={0.3} />
			</mesh>

			{/* ================= DESK PAD & PERIPHERALS ================= */}
			{/* Felt Desk Mat */}
			<mesh position={[0, 0.783, 0.05]}>
				<boxGeometry args={[1.8, 0.008, 0.75]} />
				<meshStandardMaterial color={DESK_PAD_COLOR} roughness={0.9} />
			</mesh>

			{/* 75% Mechanical Keyboard */}
			<group position={[-0.1, 0.795, 0.2]}>
				{/* Keyboard Base */}
				<mesh position={[0, 0.01, 0]}>
					<boxGeometry args={[0.45, 0.02, 0.18]} />
					<meshStandardMaterial color="#27272a" roughness={0.6} />
				</mesh>
				{/* Alpha Keycaps */}
				<mesh position={[-0.03, 0.025, 0]}>
					<boxGeometry args={[0.34, 0.015, 0.14]} />
					<meshStandardMaterial color="#e4e4e7" roughness={0.4} />
				</mesh>
				{/* Accent Modifier Keys */}
				<mesh position={[0.16, 0.025, -0.04]}>
					<boxGeometry args={[0.05, 0.015, 0.04]} />
					<meshStandardMaterial color="#6366f1" roughness={0.4} />
				</mesh>
				<mesh position={[0.16, 0.025, 0.04]}>
					<boxGeometry args={[0.05, 0.015, 0.04]} />
					<meshStandardMaterial color="#f97316" roughness={0.4} />
				</mesh>
			</group>

			{/* Ergonomic Wireless Mouse */}
			<mesh position={[0.35, 0.805, 0.2]}>
				<boxGeometry args={[0.08, 0.03, 0.13]} />
				<meshStandardMaterial color="#3f3f46" roughness={0.4} />
			</mesh>

			{/* Wrist Rest */}
			<mesh position={[-0.1, 0.795, 0.33]}>
				<boxGeometry args={[0.45, 0.015, 0.06]} />
				<meshStandardMaterial color="#18181b" roughness={0.8} />
			</mesh>

			{/* ================= DUAL MONITORS SETUP ================= */}
			{/* Dual Monitor Heavy Duty Mount clamped to desk */}
			<group position={[0, 0.78, -0.45]}>
				<mesh position={[0, 0.25, 0]}>
					<cylinderGeometry args={[0.03, 0.03, 0.5, 12]} />
					<meshStandardMaterial color="#18181b" metalness={0.8} />
				</mesh>
				{/* Cross Articulated Arms */}
				<mesh position={[-0.3, 0.45, 0.05]}>
					<boxGeometry args={[0.6, 0.04, 0.04]} />
					<meshStandardMaterial color="#18181b" metalness={0.8} />
				</mesh>
				<mesh position={[0.4, 0.45, 0.05]}>
					<boxGeometry args={[0.6, 0.04, 0.04]} />
					<meshStandardMaterial color="#18181b" metalness={0.8} />
				</mesh>
			</group>

			{/* Screen 1: Primary Ultrawide 34" Monitor (IDE View) */}
			<group position={[-0.25, 1.25, -0.32]}>
				{/* Monitor Frame */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[1.2, 0.56, 0.04]} />
					<meshStandardMaterial color={MONITOR_FRAME_COLOR} roughness={0.4} />
				</mesh>
				{/* Screen Glass */}
				<mesh position={[0, 0, 0.022]}>
					<planeGeometry args={[1.16, 0.52]} />
					<meshStandardMaterial
						color={SCREEN_IDE_BG}
						roughness={0.2}
						emissive={SCREEN_IDE_BG}
						emissiveIntensity={0.2}
					/>
				</mesh>

				{/* IDE Code Syntax Lines */}
				{/* Header tabs bar */}
				<mesh position={[0, 0.22, 0.023]}>
					<planeGeometry args={[1.14, 0.04]} />
					<meshStandardMaterial color="#161b22" />
				</mesh>
				{/* Code lines (Cyan, Purple, Orange, Green, White) */}
				<mesh position={[-0.25, 0.14, 0.024]}>
					<planeGeometry args={[0.55, 0.025]} />
					<meshStandardMaterial
						color="#38bdf8"
						emissive="#38bdf8"
						emissiveIntensity={0.6}
					/>
				</mesh>
				<mesh position={[-0.15, 0.08, 0.024]}>
					<planeGeometry args={[0.4, 0.02]} />
					<meshStandardMaterial
						color="#c084fc"
						emissive="#c084fc"
						emissiveIntensity={0.5}
					/>
				</mesh>
				<mesh position={[-0.05, 0.02, 0.024]}>
					<planeGeometry args={[0.65, 0.02]} />
					<meshStandardMaterial
						color="#4ade80"
						emissive="#4ade80"
						emissiveIntensity={0.5}
					/>
				</mesh>
				<mesh position={[-0.2, -0.04, 0.024]}>
					<planeGeometry args={[0.45, 0.02]} />
					<meshStandardMaterial
						color="#fb923c"
						emissive="#fb923c"
						emissiveIntensity={0.5}
					/>
				</mesh>
				<mesh position={[-0.1, -0.1, 0.024]}>
					<planeGeometry args={[0.7, 0.02]} />
					<meshStandardMaterial
						color="#e2e8f0"
						emissive="#e2e8f0"
						emissiveIntensity={0.4}
					/>
				</mesh>
				<mesh position={[-0.25, -0.16, 0.024]}>
					<planeGeometry args={[0.35, 0.02]} />
					<meshStandardMaterial
						color="#38bdf8"
						emissive="#38bdf8"
						emissiveIntensity={0.5}
					/>
				</mesh>

				{/* Monitor Light Bar mounted on top */}
				<mesh position={[0, 0.3, 0.04]}>
					<boxGeometry args={[0.55, 0.025, 0.04]} />
					<meshStandardMaterial color="#27272a" roughness={0.3} />
				</mesh>
				<mesh position={[0, 0.29, 0.06]}>
					<boxGeometry args={[0.5, 0.008, 0.01]} />
					<meshStandardMaterial
						color="#fef08a"
						emissive="#fef08a"
						emissiveIntensity={1.5}
					/>
				</mesh>
			</group>

			{/* Screen 2: Vertical 24" Secondary Monitor (Terminal) */}
			<group position={[0.55, 1.25, -0.28]} rotation={[0, -0.32, 0]}>
				{/* Monitor Frame */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.45, 0.68, 0.04]} />
					<meshStandardMaterial color={MONITOR_FRAME_COLOR} roughness={0.4} />
				</mesh>
				{/* Screen Glass */}
				<mesh position={[0, 0, 0.022]}>
					<planeGeometry args={[0.41, 0.64]} />
					<meshStandardMaterial
						color={SCREEN_TERMINAL_BG}
						roughness={0.2}
						emissive={SCREEN_TERMINAL_BG}
						emissiveIntensity={0.2}
					/>
				</mesh>
				{/* Terminal Green Prompt and Lines */}
				<mesh position={[-0.05, 0.24, 0.024]}>
					<planeGeometry args={[0.25, 0.02]} />
					<meshStandardMaterial
						color="#22c55e"
						emissive="#22c55e"
						emissiveIntensity={0.8}
					/>
				</mesh>
				<mesh position={[0, 0.18, 0.024]}>
					<planeGeometry args={[0.34, 0.018]} />
					<meshStandardMaterial
						color="#86efac"
						emissive="#86efac"
						emissiveIntensity={0.6}
					/>
				</mesh>
				<mesh position={[-0.04, 0.12, 0.024]}>
					<planeGeometry args={[0.26, 0.018]} />
					<meshStandardMaterial
						color="#94a3b8"
						emissive="#94a3b8"
						emissiveIntensity={0.4}
					/>
				</mesh>
				<mesh position={[-0.08, 0.06, 0.024]}>
					<planeGeometry args={[0.18, 0.018]} />
					<meshStandardMaterial
						color="#22c55e"
						emissive="#22c55e"
						emissiveIntensity={0.8}
					/>
				</mesh>
			</group>

			{/* ================= HIGH-END DEV TOWER PC ================= */}
			<group position={[-1.35, 0.38, 0.1]}>
				{/* PC Stand */}
				<mesh position={[0, -0.35, 0]}>
					<boxGeometry args={[0.3, 0.04, 0.55]} />
					<meshStandardMaterial color="#18181b" />
				</mesh>
				{/* Main Chassis */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.24, 0.54, 0.48]} />
					<meshStandardMaterial
						color={PC_CASE_COLOR}
						roughness={0.4}
						metalness={0.6}
					/>
				</mesh>
				{/* Tempered Glass Side Panel */}
				<mesh position={[0.123, 0, 0]}>
					<boxGeometry args={[0.01, 0.5, 0.44]} />
					<meshStandardMaterial
						color="#0f172a"
						roughness={0.1}
						metalness={0.9}
						transparent
						opacity={0.7}
					/>
				</mesh>
				{/* Glowing Internal GPU & Cooler */}
				<mesh position={[0.02, -0.05, 0]}>
					<boxGeometry args={[0.08, 0.1, 0.28]} />
					<meshStandardMaterial
						color={ACCENT_RGB}
						emissive={ACCENT_RGB}
						emissiveIntensity={1.5}
					/>
				</mesh>
				<mesh position={[0.02, 0.12, -0.05]}>
					<cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
					<meshStandardMaterial
						color="#38bdf8"
						emissive="#38bdf8"
						emissiveIntensity={1.2}
					/>
				</mesh>
				{/* Front Intake Mesh with subtle glow */}
				<mesh position={[0, 0, 0.242]}>
					<planeGeometry args={[0.2, 0.48]} />
					<meshStandardMaterial color="#27272a" roughness={0.9} />
				</mesh>
			</group>

			{/* ================= ERGONOMIC MESH CHAIR ================= */}
			<group position={[-0.1, 0, 0.9]} rotation={[0, Math.PI, 0]}>
				{/* 5-Star Wheeled Base */}
				<mesh position={[0, 0.08, 0]}>
					<cylinderGeometry args={[0.3, 0.3, 0.04, 5]} />
					<meshStandardMaterial color={CHAIR_FRAME_COLOR} metalness={0.8} />
				</mesh>
				{/* Gas Lift Cylinder */}
				<mesh position={[0, 0.26, 0]}>
					<cylinderGeometry args={[0.035, 0.035, 0.32, 10]} />
					<meshStandardMaterial
						color="#71717a"
						metalness={0.9}
						roughness={0.2}
					/>
				</mesh>
				{/* Contoured Seat Cushion */}
				<mesh position={[0, 0.44, 0]}>
					<boxGeometry args={[0.54, 0.08, 0.52]} />
					<meshStandardMaterial color={CHAIR_MESH_COLOR} roughness={0.8} />
				</mesh>
				{/* Curved Backrest Frame */}
				<group position={[0, 0.8, -0.22]}>
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[0.48, 0.65, 0.04]} />
						<meshStandardMaterial color={CHAIR_MESH_COLOR} roughness={0.7} />
					</mesh>
					{/* Lumbar Support Cushion */}
					<mesh position={[0, -0.12, 0.03]}>
						<boxGeometry args={[0.38, 0.14, 0.04]} />
						<meshStandardMaterial color="#18181b" roughness={0.6} />
					</mesh>
					{/* Headrest */}
					<mesh position={[0, 0.42, 0.04]}>
						<boxGeometry args={[0.26, 0.14, 0.06]} />
						<meshStandardMaterial color={CHAIR_MESH_COLOR} roughness={0.7} />
					</mesh>
				</group>
				{/* Left Armrest */}
				<mesh position={[-0.3, 0.62, 0]}>
					<boxGeometry args={[0.08, 0.04, 0.28]} />
					<meshStandardMaterial color="#18181b" roughness={0.5} />
				</mesh>
				{/* Right Armrest */}
				<mesh position={[0.3, 0.62, 0]}>
					<boxGeometry args={[0.08, 0.04, 0.28]} />
					<meshStandardMaterial color="#18181b" roughness={0.5} />
				</mesh>
			</group>

			{/* ================= ACCESSORIES ================= */}
			{/* Coffee Mug */}
			<group position={[-0.75, 0.82, 0.25]}>
				<mesh position={[0, 0, 0]}>
					<cylinderGeometry args={[0.04, 0.035, 0.08, 12]} />
					<meshStandardMaterial color="#f8fafc" roughness={0.2} />
				</mesh>
				{/* Coffee liquid surface */}
				<mesh position={[0, 0.038, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<circleGeometry args={[0.034, 12]} />
					<meshStandardMaterial color="#3e2723" roughness={0.1} />
				</mesh>
				{/* Mug Handle */}
				<mesh position={[-0.045, 0, 0]}>
					<boxGeometry args={[0.02, 0.05, 0.02]} />
					<meshStandardMaterial color="#f8fafc" roughness={0.2} />
				</mesh>
			</group>

			{/* Mini Terracotta Pot with Succulent Plant */}
			<group position={[0.85, 0.82, 0.35]}>
				{/* Geometric Pot */}
				<mesh position={[0, 0, 0]}>
					<cylinderGeometry args={[0.055, 0.04, 0.08, 6]} />
					<meshStandardMaterial color="#ea580c" roughness={0.7} />
				</mesh>
				{/* Soil */}
				<mesh position={[0, 0.038, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<circleGeometry args={[0.048, 8]} />
					<meshStandardMaterial color="#291a10" roughness={0.9} />
				</mesh>
				{/* Succulent Leaves */}
				<mesh position={[0, 0.065, 0]}>
					<dodecahedronGeometry args={[0.045]} />
					<meshStandardMaterial color="#22c55e" roughness={0.6} />
				</mesh>
			</group>
		</group>
	);
}
