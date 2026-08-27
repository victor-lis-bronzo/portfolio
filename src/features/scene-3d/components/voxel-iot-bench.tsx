"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, MeshStandardMaterial } from "three";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

// Positioned near the IOT_BENCH waypoint target (x:3, y:0, z:0).
const BENCH_ORIGIN: [number, number, number] = [3, 0, 0];
const BENCH_COLOR = "#334155";
const ESP32_COLOR = "#1e293b";
const LED_BASE_COLOR = "#22c55e";
const PULSE_SPEED = 3;
const PULSE_MIN = 0.4;
const PULSE_MAX = 1.6;
const STATIC_EMISSIVE_INTENSITY = 1;

const LED_OFFSETS: [number, number, number][] = [
	[-0.15, 0.42, 0.15],
	[0, 0.42, 0.15],
	[0.15, 0.42, 0.15],
];

function PulsingLed({
	position,
	phase,
}: {
	position: [number, number, number];
	phase: number;
}) {
	const materialRef = useRef<MeshStandardMaterial>(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	useFrame(({ clock }) => {
		if (prefersReducedMotion || !materialRef.current) return;
		const wave = Math.sin(clock.elapsedTime * PULSE_SPEED + phase) * 0.5 + 0.5;
		materialRef.current.emissiveIntensity =
			PULSE_MIN + wave * (PULSE_MAX - PULSE_MIN);
	});

	return (
		<mesh position={position}>
			<sphereGeometry args={[0.035, 12, 12]} />
			<meshStandardMaterial
				ref={materialRef}
				color={LED_BASE_COLOR}
				emissive={LED_BASE_COLOR}
				emissiveIntensity={
					prefersReducedMotion ? STATIC_EMISSIVE_INTENSITY : PULSE_MIN
				}
			/>
		</mesh>
	);
}

export function VoxelIotBench() {
	const benchTopRef = useRef<Mesh>(null);

	return (
		<group position={BENCH_ORIGIN}>
			{/* Bench */}
			<mesh ref={benchTopRef} position={[0, 0.4, 0]}>
				<boxGeometry args={[1.6, 0.08, 0.8]} />
				<meshStandardMaterial color={BENCH_COLOR} />
			</mesh>
			<mesh position={[0, 0.2, 0]}>
				<boxGeometry args={[1.4, 0.32, 0.7]} />
				<meshStandardMaterial color="#475569" />
			</mesh>

			{/* ESP32 block */}
			<mesh position={[0, 0.46, 0.15]}>
				<boxGeometry args={[0.35, 0.04, 0.25]} />
				<meshStandardMaterial color={ESP32_COLOR} />
			</mesh>

			{/* LEDs, each pulsing on its own phase */}
			{LED_OFFSETS.map((position, index) => (
				<PulsingLed
					key={`led-${position[0]}-${position[2]}`}
					position={position}
					phase={index * 1.4}
				/>
			))}
		</group>
	);
}
