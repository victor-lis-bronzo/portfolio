"use client";

import { Html } from "@react-three/drei";

// Positioned in the new West bay opened by the room expansion
export const ETEC_STAGE_ORIGIN: [number, number, number] = [-5.9, 0, 1.0];
export const ETEC_STAGE_ROTATION: [number, number, number] = [
	0,
	Math.PI / 7,
	0,
];

const STAGE_DARK = "#1f2937"; // Riser / platform body
const STAGE_EDGE = "#111827"; // Step nosing trim
const CPS_RED = "#b91c1c"; // Centro Paula Souza institutional red
const CARPET_RED = "#991b1b"; // Deep red aisle carpet
const LECTERN_WOOD = "#78350f";
const LECTERN_TOP = "#92400e";
const POST_METAL = "#94a3b8";
const BANNER_WHITE = "#f8fafc";
const MIC_DARK = "#0f172a";
const CAN_LIGHT_BODY = "#334155";
const WARM_LIGHT = "#fbbf24";

export function VoxelEtecStage() {
	return (
		<group position={ETEC_STAGE_ORIGIN} rotation={ETEC_STAGE_ROTATION}>
			{/* ================= RED AISLE CARPET ================= */}
			{/* Runs from the foot of the steps forward into the room */}
			<mesh position={[0, 0.012, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[1.5, 3.2]} />
				<meshStandardMaterial color={CARPET_RED} roughness={0.95} />
			</mesh>

			{/* ================= TWO-STEP RISER / PLATFORM ================= */}
			{/* Lower / wider step */}
			<mesh position={[0, 0.09, 0]}>
				<boxGeometry args={[2.6, 0.18, 1.8]} />
				<meshStandardMaterial color={STAGE_DARK} roughness={0.75} />
			</mesh>
			{/* Upper deck (top surface sits at y = 0.36) */}
			<mesh position={[0, 0.27, -0.2]}>
				<boxGeometry args={[2.2, 0.18, 1.4]} />
				<meshStandardMaterial color={STAGE_DARK} roughness={0.75} />
			</mesh>

			{/* Step nosing trims (slightly proud to read as edges) */}
			<mesh position={[0, 0.175, 0.9]}>
				<boxGeometry args={[2.62, 0.03, 0.06]} />
				<meshStandardMaterial color={STAGE_EDGE} roughness={0.6} />
			</mesh>
			<mesh position={[0, 0.355, 0.5]}>
				<boxGeometry args={[2.22, 0.03, 0.06]} />
				<meshStandardMaterial color={STAGE_EDGE} roughness={0.6} />
			</mesh>

			{/* Red institutional skirt panel on the front face of the lower step */}
			<mesh position={[0, 0.09, 0.905]}>
				<boxGeometry args={[2.4, 0.13, 0.02]} />
				<meshStandardMaterial color={CPS_RED} roughness={0.7} />
			</mesh>
			{/* Matching skirt on the front face of the upper deck */}
			<mesh position={[0, 0.27, 0.505]}>
				<boxGeometry args={[2.0, 0.13, 0.02]} />
				<meshStandardMaterial color={CPS_RED} roughness={0.7} />
			</mesh>

			{/* ================= LECTERN / PODIUM ================= */}
			<group position={[-0.45, 0.36, 0.05]}>
				{/* Base plinth */}
				<mesh position={[0, 0.03, 0]}>
					<boxGeometry args={[0.45, 0.06, 0.38]} />
					<meshStandardMaterial color={STAGE_EDGE} roughness={0.6} />
				</mesh>
				{/* Vertical column */}
				<mesh position={[0, 0.46, 0]}>
					<boxGeometry args={[0.35, 0.8, 0.3]} />
					<meshStandardMaterial color={LECTERN_WOOD} roughness={0.65} />
				</mesh>
				{/* Small red crest plate on the column front */}
				<mesh position={[0, 0.5, 0.155]}>
					<boxGeometry args={[0.18, 0.22, 0.02]} />
					<meshStandardMaterial color={CPS_RED} roughness={0.6} />
				</mesh>
				{/* Slanted reading surface, tilted forward a few degrees */}
				<mesh position={[0, 0.89, 0.02]} rotation={[-Math.PI / 14, 0, 0]}>
					<boxGeometry args={[0.7, 0.06, 0.45]} />
					<meshStandardMaterial color={LECTERN_TOP} roughness={0.55} />
				</mesh>
				{/* Lip so the "speech" doesn't slide off */}
				<mesh position={[0, 0.94, 0.22]} rotation={[-Math.PI / 14, 0, 0]}>
					<boxGeometry args={[0.7, 0.05, 0.03]} />
					<meshStandardMaterial color={STAGE_EDGE} roughness={0.6} />
				</mesh>

				{/* Gooseneck microphone */}
				<mesh position={[0.16, 1.08, -0.02]} rotation={[0, 0, -Math.PI / 12]}>
					<cylinderGeometry args={[0.012, 0.012, 0.34, 8]} />
					<meshStandardMaterial
						color={MIC_DARK}
						metalness={0.6}
						roughness={0.35}
					/>
				</mesh>
				<mesh position={[0.21, 1.25, -0.02]}>
					<sphereGeometry args={[0.05, 12, 12]} />
					<meshStandardMaterial
						color={MIC_DARK}
						metalness={0.5}
						roughness={0.5}
					/>
				</mesh>
			</group>

			{/* ================= BANNER POSTS ================= */}
			{[-1.15, 1.15].map((x) => (
				<mesh key={`banner-post-${x}`} position={[x, 1.2, -0.8]}>
					<cylinderGeometry args={[0.05, 0.06, 2.4, 12]} />
					<meshStandardMaterial
						color={POST_METAL}
						metalness={0.75}
						roughness={0.3}
					/>
				</mesh>
			))}
			{/* Post base feet */}
			{[-1.15, 1.15].map((x) => (
				<mesh key={`post-foot-${x}`} position={[x, 0.03, -0.8]}>
					<cylinderGeometry args={[0.16, 0.18, 0.06, 12]} />
					<meshStandardMaterial color={STAGE_EDGE} roughness={0.7} />
				</mesh>
			))}

			{/* ================= FORMATURA BANNER ================= */}
			<group position={[0, 1.85, -0.8]}>
				{/* Banner body */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[2.4, 1.1, 0.06]} />
					<meshStandardMaterial color={CPS_RED} roughness={0.85} />
				</mesh>
				{/* Inner off-white panel the lettering sits on */}
				<mesh position={[0, 0, 0.035]}>
					<boxGeometry args={[2.16, 0.86, 0.02]} />
					<meshStandardMaterial color={BANNER_WHITE} roughness={0.8} />
				</mesh>
				{/* Top & bottom red trim bars */}
				<mesh position={[0, 0.48, 0.04]}>
					<boxGeometry args={[2.2, 0.06, 0.02]} />
					<meshStandardMaterial color={CPS_RED} roughness={0.7} />
				</mesh>
				<mesh position={[0, -0.48, 0.04]}>
					<boxGeometry args={[2.2, 0.06, 0.02]} />
					<meshStandardMaterial color={CPS_RED} roughness={0.7} />
				</mesh>

				{/* --- BANNER LETTERING (Html overlay: no font pipeline for drei <Text>) --- */}
				<Html
					transform
					position={[0, 0, 0.06]}
					scale={0.004}
					style={{
						width: "520px",
						height: "200px",
						userSelect: "none",
						pointerEvents: "none",
					}}
				>
					<div className="flex h-full w-full flex-col items-center justify-center leading-none">
						<span
							className="font-black tracking-[0.18em]"
							style={{ fontSize: "110px", color: "#b91c1c" }}
						>
							ETEC
						</span>
						<span
							className="font-bold tracking-[0.42em]"
							style={{ fontSize: "38px", color: "#1f2937" }}
						>
							FORMATURA
						</span>
					</div>
				</Html>
			</group>

			{/* ================= WARM CAN LIGHTS (static accent) ================= */}
			{[-0.85, 0.85].map((x) => (
				<group key={`can-light-${x}`} position={[x, 2.25, -0.62]}>
					{/* Housing */}
					<mesh rotation={[Math.PI / 5, 0, 0]}>
						<cylinderGeometry args={[0.09, 0.07, 0.16, 12]} />
						<meshStandardMaterial
							color={CAN_LIGHT_BODY}
							metalness={0.6}
							roughness={0.4}
						/>
					</mesh>
					{/* Emissive lens */}
					<mesh position={[0, -0.07, 0.05]} rotation={[Math.PI / 5, 0, 0]}>
						<cylinderGeometry args={[0.07, 0.07, 0.02, 12]} />
						<meshStandardMaterial
							color={WARM_LIGHT}
							emissive={WARM_LIGHT}
							emissiveIntensity={0.9}
						/>
					</mesh>
				</group>
			))}
		</group>
	);
}
