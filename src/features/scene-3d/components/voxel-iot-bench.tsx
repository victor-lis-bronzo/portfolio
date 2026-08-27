"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MeshStandardMaterial } from "three";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

// Positioned in Quadrant 3 (South-East / Front-Right)
export const BENCH_ORIGIN: [number, number, number] = [3, 0, 2];

const BENCH_FRAME = "#1e293b";
const BENCH_WOOD = "#475569";
const ESD_MAT_COLOR = "#0284c7"; // Distinctive ESD Blue
const LAB_EQUIPMENT_DARK = "#0f172a";
const LAB_EQUIPMENT_GREY = "#334155";
const SINE_WAVE_GREEN = "#22c55e";
const PULSE_SPEED = 3;
const STATIC_EMISSIVE = 1.0;

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
		matRef.current.emissiveIntensity = 0.3 + wave * 1.5;
	});

	return (
		<mesh position={position}>
			<sphereGeometry args={[0.025, 10, 10]} />
			<meshStandardMaterial
				ref={matRef}
				color={color}
				emissive={color}
				emissiveIntensity={prefersReducedMotion ? STATIC_EMISSIVE : 0.6}
			/>
		</mesh>
	);
}

export function VoxelIotBench() {
	return (
		<group position={BENCH_ORIGIN}>
			{/* ================= HEAVY DUTY MAKER WORKBENCH ================= */}
			{/* Workbench Top */}
			<mesh position={[0, 0.74, 0]}>
				<boxGeometry args={[2.0, 0.08, 1.1]} />
				<meshStandardMaterial color={BENCH_WOOD} roughness={0.6} />
			</mesh>

			{/* 4 Heavy Duty Steel Square Legs */}
			{[
				[-0.9, -0.45],
				[0.9, -0.45],
				[-0.9, 0.45],
				[0.9, 0.45],
			].map(([x, z]) => (
				<mesh key={`bench-leg-${x}-${z}`} position={[x, 0.35, z]}>
					<boxGeometry args={[0.1, 0.7, 0.1]} />
					<meshStandardMaterial
						color={BENCH_FRAME}
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
			))}

			{/* Cross Support Braces */}
			<mesh position={[0, 0.2, -0.45]}>
				<boxGeometry args={[1.7, 0.06, 0.06]} />
				<meshStandardMaterial color={BENCH_FRAME} metalness={0.7} />
			</mesh>
			<mesh position={[0, 0.2, 0.45]}>
				<boxGeometry args={[1.7, 0.06, 0.06]} />
				<meshStandardMaterial color={BENCH_FRAME} metalness={0.7} />
			</mesh>

			{/* ================= ESD ANTI-STATIC MAT ================= */}
			<mesh position={[0, 0.783, 0.08]}>
				<boxGeometry args={[1.7, 0.008, 0.8]} />
				<meshStandardMaterial color={ESD_MAT_COLOR} roughness={0.8} />
			</mesh>
			{/* Yellow Ground Snap on ESD Mat */}
			<mesh position={[-0.78, 0.79, -0.25]}>
				<cylinderGeometry args={[0.02, 0.02, 0.01, 8]} />
				<meshStandardMaterial color="#facc15" />
			</mesh>

			{/* ================= DIGITAL STORAGE OSCILLOSCOPE ================= */}
			<group position={[-0.55, 0.94, -0.22]}>
				{/* Main Chassis */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.48, 0.28, 0.22]} />
					<meshStandardMaterial color={LAB_EQUIPMENT_GREY} roughness={0.4} />
				</mesh>
				{/* Screen Bezel */}
				<mesh position={[-0.08, 0, 0.112]}>
					<planeGeometry args={[0.26, 0.2]} />
					<meshStandardMaterial color="#020617" />
				</mesh>
				{/* Green Sine Waveform Display */}
				<mesh position={[-0.08, 0.01, 0.114]}>
					<planeGeometry args={[0.23, 0.02]} />
					<meshStandardMaterial
						color={SINE_WAVE_GREEN}
						emissive={SINE_WAVE_GREEN}
						emissiveIntensity={1.5}
					/>
				</mesh>
				<mesh position={[-0.08, -0.04, 0.114]}>
					<planeGeometry args={[0.2, 0.015]} />
					<meshStandardMaterial
						color="#38bdf8"
						emissive="#38bdf8"
						emissiveIntensity={1.2}
					/>
				</mesh>
				{/* Rotary Knobs and BNC Channels */}
				<mesh position={[0.13, 0.04, 0.114]}>
					<cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
					<meshStandardMaterial color="#e2e8f0" metalness={0.7} />
				</mesh>
				<mesh position={[0.13, -0.04, 0.114]}>
					<cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
					<meshStandardMaterial color="#e2e8f0" metalness={0.7} />
				</mesh>
				{/* Dual BNC Jacks */}
				<mesh position={[0.18, -0.08, 0.114]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshStandardMaterial color="#d97706" metalness={0.8} />
				</mesh>
			</group>

			{/* ================= BENCHTOP DC POWER SUPPLY ================= */}
			<group position={[-0.08, 0.92, -0.25]}>
				{/* Enclosure */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.32, 0.24, 0.22]} />
					<meshStandardMaterial color={LAB_EQUIPMENT_DARK} roughness={0.3} />
				</mesh>
				{/* Red 7-Segment LED Voltage Display */}
				<mesh position={[0, 0.05, 0.112]}>
					<planeGeometry args={[0.22, 0.06]} />
					<meshStandardMaterial color="#090d16" />
				</mesh>
				<mesh position={[-0.04, 0.05, 0.114]}>
					<planeGeometry args={[0.08, 0.03]} />
					<meshStandardMaterial
						color="#ef4444"
						emissive="#ef4444"
						emissiveIntensity={1.5}
					/>
				</mesh>
				<mesh position={[0.05, 0.05, 0.114]}>
					<planeGeometry args={[0.08, 0.03]} />
					<meshStandardMaterial
						color="#ef4444"
						emissive="#ef4444"
						emissiveIntensity={1.5}
					/>
				</mesh>
				{/* Red & Black Banana Terminals */}
				<mesh position={[-0.06, -0.06, 0.114]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshStandardMaterial color="#dc2626" />
				</mesh>
				<mesh position={[0, -0.06, 0.114]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshStandardMaterial color="#18181b" />
				</mesh>
				<mesh position={[0.06, -0.06, 0.114]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshStandardMaterial color="#16a34a" />
				</mesh>
			</group>

			{/* ================= SOLDERING STATION ================= */}
			<group position={[0.38, 0.86, -0.22]}>
				{/* Station Base Unit */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.24, 0.15, 0.2]} />
					<meshStandardMaterial color="#1e3a8a" roughness={0.4} />
				</mesh>
				{/* Temp Display */}
				<mesh position={[0, 0.02, 0.102]}>
					<planeGeometry args={[0.12, 0.04]} />
					<meshStandardMaterial
						color="#38bdf8"
						emissive="#38bdf8"
						emissiveIntensity={1.2}
					/>
				</mesh>
				{/* Soldering Iron Safety Cradle with Iron */}
				<group position={[0.18, 0.02, 0]} rotation={[0, 0, -Math.PI / 4]}>
					<mesh position={[0, 0, 0]}>
						<cylinderGeometry args={[0.03, 0.03, 0.14, 8]} />
						<meshStandardMaterial color="#94a3b8" metalness={0.8} />
					</mesh>
					{/* Soldering Iron Handle & Tip */}
					<mesh position={[0, 0.06, 0]}>
						<cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
						<meshStandardMaterial color="#ea580c" roughness={0.3} />
					</mesh>
					<mesh position={[0, -0.08, 0]}>
						<coneGeometry args={[0.008, 0.04, 8]} />
						<meshStandardMaterial color="#e2e8f0" metalness={0.9} />
					</mesh>
				</group>
				{/* Brass Wire Sponge Cleaner Cup */}
				<mesh position={[-0.14, -0.02, 0.04]}>
					<cylinderGeometry args={[0.035, 0.035, 0.04, 10]} />
					<meshStandardMaterial
						color="#d97706"
						metalness={0.7}
						roughness={0.3}
					/>
				</mesh>
			</group>

			{/* ================= ACTIVE BREADBOARD CIRCUIT & ESP32 ================= */}
			<group position={[-0.15, 0.795, 0.2]}>
				{/* Solderless Breadboard Base */}
				<mesh position={[0, 0.01, 0]}>
					<boxGeometry args={[0.55, 0.02, 0.28]} />
					<meshStandardMaterial color="#f8fafc" roughness={0.4} />
				</mesh>
				{/* Breadboard Center Divider Notch */}
				<mesh position={[0, 0.022, 0]}>
					<boxGeometry args={[0.52, 0.002, 0.02]} />
					<meshStandardMaterial color="#cbd5e1" />
				</mesh>

				{/* ESP32 Microcontroller Board */}
				<group position={[-0.12, 0.03, 0]}>
					{/* PCB Body */}
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[0.22, 0.015, 0.14]} />
						<meshStandardMaterial color="#1e293b" roughness={0.3} />
					</mesh>
					{/* Metal RF Shield Can */}
					<mesh position={[-0.03, 0.012, 0]}>
						<boxGeometry args={[0.1, 0.008, 0.1]} />
						<meshStandardMaterial
							color="#cbd5e1"
							metalness={0.9}
							roughness={0.2}
						/>
					</mesh>
					{/* PCB Copper Trace Antenna */}
					<mesh position={[0.08, 0.01, 0]}>
						<boxGeometry args={[0.04, 0.005, 0.1]} />
						<meshStandardMaterial color="#ca8a04" metalness={0.8} />
					</mesh>
				</group>

				{/* Pulsing Circuit LEDs on Breadboard */}
				<PulsingCircuitLed
					position={[0.08, 0.035, -0.06]}
					color="#22c55e"
					phase={0}
				/>
				<PulsingCircuitLed
					position={[0.14, 0.035, -0.06]}
					color="#ef4444"
					phase={1.5}
				/>
				<PulsingCircuitLed
					position={[0.2, 0.035, -0.06]}
					color="#3b82f6"
					phase={3.0}
				/>

				{/* DIP IC Chip */}
				<mesh position={[0.08, 0.028, 0.05]}>
					<boxGeometry args={[0.14, 0.016, 0.08]} />
					<meshStandardMaterial color="#09090b" roughness={0.4} />
				</mesh>

				{/* Arched Jumper Wires (Red, Blue, Yellow, Green) */}
				{/* Red Power Jumper */}
				<mesh position={[-0.04, 0.045, -0.08]} rotation={[0, 0, Math.PI / 6]}>
					<cylinderGeometry args={[0.006, 0.006, 0.12, 6]} />
					<meshStandardMaterial color="#ef4444" />
				</mesh>
				{/* Blue Data Jumper */}
				<mesh position={[0.06, 0.045, 0.0]} rotation={[0, 0, -Math.PI / 6]}>
					<cylinderGeometry args={[0.006, 0.006, 0.14, 6]} />
					<meshStandardMaterial color="#3b82f6" />
				</mesh>
				{/* Yellow Clock Jumper */}
				<mesh position={[0.12, 0.045, 0.08]} rotation={[Math.PI / 8, 0, 0]}>
					<cylinderGeometry args={[0.006, 0.006, 0.12, 6]} />
					<meshStandardMaterial color="#eab308" />
				</mesh>
			</group>

			{/* ================= DIGITAL MULTIMETER & TOOLS ================= */}
			{/* DMM with Yellow Protective Bumper Case */}
			<group position={[0.38, 0.805, 0.22]} rotation={[0, -Math.PI / 12, 0]}>
				{/* Yellow Rubber Bumper Holster */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.16, 0.035, 0.26]} />
					<meshStandardMaterial color="#eab308" roughness={0.4} />
				</mesh>
				{/* Dark Center Unit */}
				<mesh position={[0, 0.008, 0]}>
					<boxGeometry args={[0.13, 0.025, 0.23]} />
					<meshStandardMaterial color="#18181b" roughness={0.3} />
				</mesh>
				{/* DMM LCD Display */}
				<mesh position={[0, 0.022, -0.05]}>
					<planeGeometry args={[0.1, 0.05]} />
					<meshStandardMaterial
						color="#86efac"
						emissive="#86efac"
						emissiveIntensity={0.6}
					/>
				</mesh>
				{/* Rotary Range Selector Knob */}
				<mesh position={[0, 0.024, 0.04]}>
					<cylinderGeometry args={[0.025, 0.025, 0.015, 10]} />
					<meshStandardMaterial color="#3f3f46" />
				</mesh>
				{/* Red & Black Test Probes */}
				<mesh position={[-0.08, 0.01, 0.14]} rotation={[0, 0, Math.PI / 4]}>
					<cylinderGeometry args={[0.006, 0.006, 0.16, 6]} />
					<meshStandardMaterial color="#dc2626" />
				</mesh>
				<mesh position={[0.08, 0.01, 0.14]} rotation={[0, 0, -Math.PI / 4]}>
					<cylinderGeometry args={[0.006, 0.006, 0.16, 6]} />
					<meshStandardMaterial color="#18181b" />
				</mesh>
			</group>

			{/* Precision Tweezers */}
			<mesh position={[0.65, 0.795, 0.1]} rotation={[0, Math.PI / 6, 0]}>
				<boxGeometry args={[0.02, 0.008, 0.14]} />
				<meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
			</mesh>

			{/* Solder Wire Spool on Stand */}
			<group position={[0.72, 0.85, -0.22]}>
				<mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.07, 0.07, 0.08, 12]} />
					<meshStandardMaterial
						color="#94a3b8"
						metalness={0.9}
						roughness={0.2}
					/>
				</mesh>
				<mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.08, 0.08, 0.01, 12]} />
					<meshStandardMaterial color="#0284c7" />
				</mesh>
			</group>

			{/* 6-Drawer SMD Component Organizer on rear of bench */}
			<group position={[0.68, 1.0, -0.42]}>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.42, 0.34, 0.16]} />
					<meshStandardMaterial color="#334155" roughness={0.5} />
				</mesh>
				{/* 6 Clear Drawers */}
				{[
					[-0.12, 0.09],
					[0, 0.09],
					[0.12, 0.09],
					[-0.12, -0.05],
					[0, -0.05],
					[0.12, -0.05],
				].map(([x, y]) => (
					<mesh key={`drawer-${x}-${y}`} position={[x, y, 0.07]}>
						<boxGeometry args={[0.1, 0.1, 0.03]} />
						<meshStandardMaterial
							color="#e2e8f0"
							transparent
							opacity={0.6}
							roughness={0.3}
						/>
					</mesh>
				))}
			</group>
		</group>
	);
}
