"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { BoxGeometry, DoubleSide, MeshStandardMaterial } from "three";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

// New east bay, opened by the asymmetric room expansion.
export const ECOPLAY_ORIGIN: [number, number, number] = [5.7, 0, 0.2];
export const ECOPLAY_ROTATION: [number, number, number] = [0, -Math.PI / 9, 0];

/* ================= PALETTE ================= */
// Two kraft tones on purpose: the real machine is hand-cut foam board with
// mismatched panels, and a tonal mismatch is the only way to sell that in a
// flat-shaded scene with no textures.
const KRAFT_LIGHT = "#c8a06a";
const KRAFT_DARK = "#b98d55";
const KRAFT_MID = "#bf9660";
const STAND_SLATE = "#475569";
const STAND_SLATE_DARK = "#334155";
const BACKBOARD_WHITE = "#f8fafc";
const PAINT_RED = "#dc2626";
const RIM_RED = "#ef4444";
const NET_WHITE = "#f1f5f9";
const SCREEN_BLACK = "#0b1020";
const PCB_DARK = "#111827";
const LED_GREEN = "#22c55e";

// Bottle caps: the "ammo" the machine gamifies collecting.
const CAP_COLORS = [
	"#f97316",
	"#06b6d4",
	"#84cc16",
	"#a855f7",
	"#ef4444",
	"#facc15",
	"#3b82f6",
];

const PULSE_SPEED = 3;
const STATIC_EMISSIVE = 0.6;

/* ================= RAMP GEOMETRY =================
 * RAMP_TILT is applied as rotation={[+RAMP_TILT, 0, 0]}.
 *
 * Why POSITIVE: three.js rotation about X maps a local point (0, 0, z) to
 * (0, -z*sin0, z*cos0). With 0 > 0, a point at +z drops (y < 0) and a point
 * at -z rises (y > 0). Local +Z is the FRONT (player side, where the ball
 * rests) and local -Z is the BACK (where the hoop and backboard are), so a
 * positive angle is what tilts the ramp UP going away from the viewer.
 * A negative angle would tip the hoop end into the floor.
 */
const RAMP_TILT = Math.PI / 10; // 18deg
const RAMP_LENGTH = 1.95;
const RAMP_CENTER_Y = 1.155; // front lip lands ~0.86, hoop end ~1.45
const RAMP_CENTER_Z = -0.05;

/* ================= LED DOT MATRIX =================
 * Static 8x8 pattern reading "50" (a score on the marquee scoreboard).
 * '#' = lit (shared pulsing emissive material), '.' = unlit (dark red).
 */
const LED_PATTERN = [
	"........",
	".###.###",
	".#...#.#",
	".###.#.#",
	"..#..#.#",
	".###.###",
	"........",
	"........",
];
const LED_ROWS = LED_PATTERN.length;
const LED_COLUMNS = 8;
const LED_SPACING = 0.032;
const LED_SIZE = 0.022;

/** Flattened once at module scope: fixed pattern, so the dots never reorder. */
const LED_DOTS: {
	id: string;
	lit: boolean;
	position: [number, number, number];
}[] = LED_PATTERN.flatMap((row, rowIndex) =>
	row.split("").map((cell, colIndex) => ({
		id: `led-r${rowIndex}c${colIndex}`,
		lit: cell === "#",
		position: [
			(colIndex - (LED_COLUMNS - 1) / 2) * LED_SPACING,
			// Row 0 is the TOP row of the pattern, hence the negated y.
			-(rowIndex - (LED_ROWS - 1) / 2) * LED_SPACING,
			0,
		] as [number, number, number],
	})),
);

function LedMatrix() {
	const prefersReducedMotion = usePrefersReducedMotion();

	// One geometry + two materials shared by every dot: 64 tiny meshes must not
	// mean 64 material/geometry allocations.
	const dotGeometry = useMemo(
		() => new BoxGeometry(LED_SIZE, LED_SIZE, LED_SIZE),
		[],
	);
	const litMaterial = useMemo(
		() =>
			new MeshStandardMaterial({
				color: RIM_RED,
				emissive: RIM_RED,
				emissiveIntensity: STATIC_EMISSIVE,
			}),
		[],
	);
	const unlitMaterial = useMemo(
		() =>
			new MeshStandardMaterial({
				color: "#3f1414",
				emissive: "#3f1414",
				emissiveIntensity: 0.05,
				roughness: 0.8,
			}),
		[],
	);

	useEffect(() => {
		return () => {
			dotGeometry.dispose();
			litMaterial.dispose();
			unlitMaterial.dispose();
		};
	}, [dotGeometry, litMaterial, unlitMaterial]);

	// A single frame callback drives every lit dot, because they all point at
	// the same material instance.
	useFrame(({ clock }) => {
		if (prefersReducedMotion) return;
		const wave = Math.sin(clock.elapsedTime * PULSE_SPEED) * 0.5 + 0.5;
		litMaterial.emissiveIntensity = 0.35 + wave * 0.5;
	});

	return (
		<group>
			{LED_DOTS.map((dot) => (
				<mesh
					key={dot.id}
					position={dot.position}
					geometry={dotGeometry}
					material={dot.lit ? litMaterial : unlitMaterial}
				/>
			))}
		</group>
	);
}

/** Same pulse pattern as the IoT bench, own material instance. */
function PulsingCircuitLed({
	position,
	color,
	phase,
}: {
	position: [number, number, number];
	color: string;
	phase: number;
}) {
	const matRef = useRef<MeshStandardMaterial>(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	useFrame(({ clock }) => {
		if (prefersReducedMotion || !matRef.current) return;
		const wave = Math.sin(clock.elapsedTime * PULSE_SPEED + phase) * 0.5 + 0.5;
		matRef.current.emissiveIntensity = 0.2 + wave * 0.4;
	});

	return (
		<mesh position={position}>
			<sphereGeometry args={[0.022, 10, 10]} />
			<meshStandardMaterial
				ref={matRef}
				color={color}
				emissive={color}
				emissiveIntensity={prefersReducedMotion ? STATIC_EMISSIVE : 0.6}
			/>
		</mesh>
	);
}

export function VoxelEcoplayArcade() {
	return (
		<group position={ECOPLAY_ORIGIN} rotation={ECOPLAY_ROTATION}>
			{/* ================= TABLE / STAND ================= */}
			{/* Muted slate so the kraft cardboard reads as the hand-made part. */}
			<mesh position={[0, 0.78, 0]}>
				<boxGeometry args={[1.4, 0.08, 2.2]} />
				<meshStandardMaterial color={STAND_SLATE} roughness={0.7} />
			</mesh>
			{[
				[-0.6, -0.95],
				[0.6, -0.95],
				[-0.6, 0.95],
				[0.6, 0.95],
			].map(([x, z]) => (
				<mesh key={`ecoplay-leg-${x}-${z}`} position={[x, 0.37, z]}>
					<boxGeometry args={[0.1, 0.74, 0.1]} />
					<meshStandardMaterial
						color={STAND_SLATE_DARK}
						metalness={0.4}
						roughness={0.5}
					/>
				</mesh>
			))}
			{/* Lower shelf (carries the sensor board) */}
			<mesh position={[0, 0.3, 0]}>
				<boxGeometry args={[1.2, 0.04, 1.8]} />
				<meshStandardMaterial color={STAND_SLATE_DARK} roughness={0.8} />
			</mesh>

			{/* ================= CARDBOARD RISERS UNDER THE HIGH END ================= */}
			{[-0.5, 0.5].map((x) => (
				<mesh key={`ecoplay-riser-${x}`} position={[x, 1.12, -0.8]}>
					<boxGeometry args={[0.08, 0.6, 0.14]} />
					<meshStandardMaterial color={KRAFT_MID} roughness={0.95} />
				</mesh>
			))}
			{/* Backboard support posts */}
			{[-0.5, 0.5].map((x) => (
				<mesh key={`ecoplay-post-${x}`} position={[x, 1.14, -1.08]}>
					<boxGeometry args={[0.07, 0.64, 0.07]} />
					<meshStandardMaterial color={KRAFT_DARK} roughness={0.95} />
				</mesh>
			))}

			{/* ================= INCLINED RAMP ASSEMBLY =================
			    Everything that must follow the incline lives in this one tilted
			    group: deck, side rails, front lip, and the caps/ball resting on
			    it. See RAMP_TILT above for the sign reasoning. */}
			<group
				position={[0, RAMP_CENTER_Y, RAMP_CENTER_Z]}
				rotation={[RAMP_TILT, 0, 0]}
			>
				{/* Ramp deck */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[1.28, 0.05, RAMP_LENGTH]} />
					<meshStandardMaterial color={KRAFT_LIGHT} roughness={0.95} />
				</mesh>

				{/* Two side rails in deliberately mismatched kraft tones */}
				<mesh position={[-0.68, 0.16, 0]}>
					<boxGeometry args={[0.05, 0.5, 2.2]} />
					<meshStandardMaterial color={KRAFT_LIGHT} roughness={0.95} />
				</mesh>
				<mesh position={[0.68, 0.16, 0]}>
					<boxGeometry args={[0.05, 0.5, 2.2]} />
					<meshStandardMaterial color={KRAFT_DARK} roughness={0.95} />
				</mesh>

				{/* Front lip / apron so a resting ball is visibly held in */}
				<mesh position={[0, 0.07, 0.94]}>
					<boxGeometry args={[1.28, 0.14, 0.06]} />
					<meshStandardMaterial color={KRAFT_DARK} roughness={0.95} />
				</mesh>
				{/* Painted guide stripe across the launch area */}
				<mesh position={[0, 0.027, 0.6]}>
					<boxGeometry args={[1.2, 0.006, 0.04]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.9} />
				</mesh>

				{/* Loose bottle caps waiting on the launch area */}
				{[
					[-0.42, 0.5],
					[-0.12, 0.66],
					[0.44, 0.58],
				].map(([x, z], index) => (
					<mesh key={`ramp-cap-${x}-${z}`} position={[x, 0.035, z]}>
						<cylinderGeometry args={[0.045, 0.045, 0.02, 10]} />
						<meshStandardMaterial
							color={CAP_COLORS[index]}
							roughness={0.5}
							metalness={0.1}
						/>
					</mesh>
				))}

				{/* The ball, parked at the low end */}
				<mesh position={[0.22, 0.115, 0.74]}>
					<sphereGeometry args={[0.09, 14, 14]} />
					<meshStandardMaterial color="#ea580c" roughness={0.6} />
				</mesh>
			</group>

			{/* ================= BACKBOARD ================= */}
			<group position={[0, 1.85, -1.05]}>
				{/* White panel */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[1.1, 0.8, 0.06]} />
					<meshStandardMaterial color={BACKBOARD_WHITE} roughness={0.7} />
				</mesh>
				{/* Painted red trim framing the outer edge */}
				<mesh position={[0, 0.375, 0.035]}>
					<boxGeometry args={[1.1, 0.05, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				<mesh position={[0, -0.375, 0.035]}>
					<boxGeometry args={[1.1, 0.05, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				<mesh position={[-0.525, 0, 0.035]}>
					<boxGeometry args={[0.05, 0.8, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				<mesh position={[0.525, 0, 0.035]}>
					<boxGeometry args={[0.05, 0.8, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				{/* Inner painted rectangle, sitting just above the rim */}
				<mesh position={[0, 0.12, 0.035]}>
					<boxGeometry args={[0.5, 0.04, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				<mesh position={[0, -0.22, 0.035]}>
					<boxGeometry args={[0.5, 0.04, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				<mesh position={[-0.23, -0.05, 0.035]}>
					<boxGeometry args={[0.04, 0.34, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				<mesh position={[0.23, -0.05, 0.035]}>
					<boxGeometry args={[0.04, 0.34, 0.02]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
			</group>

			{/* ================= HOOP + NET ================= */}
			<group position={[0, 1.7, -0.86]}>
				{/* Mounting bracket back to the backboard */}
				<mesh position={[0, 0.02, -0.11]}>
					<boxGeometry args={[0.12, 0.05, 0.14]} />
					<meshStandardMaterial color={PAINT_RED} metalness={0.3} />
				</mesh>
				{/* Rim, laid flat */}
				<mesh rotation={[-Math.PI / 2, 0, 0]}>
					<torusGeometry args={[0.16, 0.022, 8, 20]} />
					<meshStandardMaterial
						color={RIM_RED}
						metalness={0.4}
						roughness={0.4}
					/>
				</mesh>
				{/* Net: open-ended tapered cylinder, semi-transparent both faces */}
				<mesh position={[0, -0.11, 0]}>
					<cylinderGeometry args={[0.16, 0.09, 0.22, 10, 1, true]} />
					<meshStandardMaterial
						color={NET_WHITE}
						transparent
						opacity={0.55}
						side={DoubleSide}
						roughness={0.9}
					/>
				</mesh>
				{/* Strands for silhouette, converging as they hang */}
				{[0, 1, 2, 3, 4, 5].map((index) => {
					const angle = (index / 6) * Math.PI * 2;
					const radius = 0.125;
					return (
						<mesh
							key={`net-strand-${index}`}
							position={[
								Math.cos(angle) * radius,
								-0.11,
								Math.sin(angle) * radius,
							]}
						>
							<boxGeometry args={[0.008, 0.22, 0.008]} />
							<meshStandardMaterial
								color={NET_WHITE}
								transparent
								opacity={0.8}
								roughness={0.9}
							/>
						</mesh>
					);
				})}
			</group>

			{/* ================= MARQUEE + LED SCOREBOARD ================= */}
			<group position={[0, 2.46, -1.05]}>
				{/* Cardboard marquee box */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[1.2, 0.42, 0.22]} />
					<meshStandardMaterial color={KRAFT_LIGHT} roughness={0.95} />
				</mesh>
				{/* Slightly off-tone top flap: hand-assembled, not uniform */}
				<mesh position={[0, 0.225, 0]}>
					<boxGeometry args={[1.22, 0.03, 0.24]} />
					<meshStandardMaterial color={KRAFT_DARK} roughness={0.95} />
				</mesh>
				{/* Dark inset face carrying the display */}
				<mesh position={[0, 0, 0.12]}>
					<boxGeometry args={[1.0, 0.26, 0.02]} />
					<meshStandardMaterial color={SCREEN_BLACK} roughness={0.5} />
				</mesh>
				{/* Painted red accents flanking the module */}
				<mesh position={[-0.34, 0, 0.132]}>
					<boxGeometry args={[0.24, 0.04, 0.01]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				<mesh position={[0.34, 0, 0.132]}>
					<boxGeometry args={[0.24, 0.04, 0.01]} />
					<meshStandardMaterial color={PAINT_RED} roughness={0.8} />
				</mesh>
				{/* Black 8x8 dot-matrix module */}
				<mesh position={[0, 0, 0.132]}>
					<boxGeometry args={[0.3, 0.28, 0.012]} />
					<meshStandardMaterial color="#05070f" roughness={0.4} />
				</mesh>
				<group position={[0, 0, 0.142]}>
					<LedMatrix />
				</group>
			</group>

			{/* ================= COLLECTION BIN OF BOTTLE CAPS ================= */}
			<group position={[0.92, 0, 0.72]}>
				{/* Open-topped bin */}
				<mesh position={[0, 0.09, 0]}>
					<boxGeometry args={[0.36, 0.18, 0.36]} />
					<meshStandardMaterial color={KRAFT_DARK} roughness={0.95} />
				</mesh>
				<mesh position={[0, 0.17, 0]}>
					<boxGeometry args={[0.3, 0.02, 0.3]} />
					<meshStandardMaterial color={SCREEN_BLACK} roughness={0.9} />
				</mesh>
				{/* Caps piled inside */}
				{[
					[-0.07, 0.19, -0.06],
					[0.06, 0.19, 0.04],
					[-0.02, 0.205, 0.07],
					[0.08, 0.205, -0.07],
				].map(([x, y, z], index) => (
					<mesh
						key={`bin-cap-${x}-${z}`}
						position={[x, y, z]}
						rotation={[0, index * 0.7, index === 1 ? 0.35 : 0]}
					>
						<cylinderGeometry args={[0.045, 0.045, 0.02, 10]} />
						<meshStandardMaterial
							color={CAP_COLORS[index + 3]}
							roughness={0.5}
							metalness={0.1}
						/>
					</mesh>
				))}
			</group>

			{/* ================= IOT NOD: SENSOR BOARD ON THE SHELF ================= */}
			<group position={[-0.34, 0.32, 0.5]}>
				{/* PCB */}
				<mesh position={[0, 0.01, 0]}>
					<boxGeometry args={[0.28, 0.02, 0.18]} />
					<meshStandardMaterial color={PCB_DARK} roughness={0.4} />
				</mesh>
				{/* RF shield can */}
				<mesh position={[-0.07, 0.028, 0]}>
					<boxGeometry args={[0.09, 0.016, 0.08]} />
					<meshStandardMaterial
						color="#cbd5e1"
						metalness={0.9}
						roughness={0.2}
					/>
				</mesh>
				{/* Counting/MQTT status LED */}
				<PulsingCircuitLed
					position={[0.09, 0.035, -0.04]}
					color={LED_GREEN}
					phase={0.8}
				/>
			</group>
		</group>
	);
}
