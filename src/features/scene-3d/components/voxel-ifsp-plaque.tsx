"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MeshStandardMaterial } from "three";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

// Wall-mounted on the back wall (Quadrant boundary), facing +Z
export const IFSP_PLAQUE_ORIGIN: [number, number, number] = [-5.5, 2.35, -5.87];

const BOARD_COLOR = "#0f6b3c"; // IFSP institutional green
const PANEL_COLOR = "#f8fafc";
const SHELF_COLOR = "#475569";
const DIPLOMA_COLOR = "#e2e8f0";
const DIPLOMA_RIBBON_COLOR = "#dc2626";
const PCB_COLOR = "#1e293b";
const ANTENNA_COLOR = "#94a3b8";
const DOWNLIGHT_COLOR = "#fef3c7";
const LED_COLOR = "#22c55e";
const PULSE_SPEED = 3;
const STATIC_EMISSIVE = 0.6;

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
			<sphereGeometry args={[0.02, 10, 10]} />
			<meshStandardMaterial
				ref={matRef}
				color={color}
				emissive={color}
				emissiveIntensity={prefersReducedMotion ? STATIC_EMISSIVE : 0.6}
			/>
		</mesh>
	);
}

export function VoxelIfspPlaque() {
	// The plaque legend is DOM (drei's `<Html>`), not a canvas texture, so it
	// re-renders on a locale switch like any other component.
	const ui = useUiStrings();

	return (
		<group position={IFSP_PLAQUE_ORIGIN}>
			{/* --- BACKING BOARD (IFSP institutional green) --- */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[1.7, 1.0, 0.05]} />
				<meshStandardMaterial color={BOARD_COLOR} roughness={0.5} />
			</mesh>

			{/* --- INNER OFF-WHITE PANEL --- */}
			{/* Z-offset is deliberate to prevent z-fighting with the backing board */}
			<mesh position={[0, 0, 0.035]}>
				<boxGeometry args={[1.55, 0.86, 0.02]} />
				<meshStandardMaterial color={PANEL_COLOR} roughness={0.55} />
			</mesh>

			{/* --- ENGRAVED TEXT OVERLAY --- */}
			<Html
				transform
				position={[0, 0, 0.05]}
				scale={0.12}
				zIndexRange={[0, 0]}
				style={{
					width: "480px",
					userSelect: "none",
					pointerEvents: "none",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "6px",
						fontFamily: "sans-serif",
						fontWeight: 700,
						color: "#0f172a",
						textAlign: "center",
						lineHeight: 1.15,
					}}
				>
					<div style={{ fontSize: "22px" }}>{ui.ifspPlaqueTitle}</div>
					<div style={{ fontSize: "16px" }}>{ui.ifspPlaqueSubtitle}</div>
				</div>
			</Html>

			{/* --- PICTURE DOWNLIGHTS (static ambient dressing) --- */}
			<mesh position={[-0.55, 0.58, 0.05]}>
				<boxGeometry args={[0.1, 0.04, 0.04]} />
				<meshStandardMaterial
					color={DOWNLIGHT_COLOR}
					emissive={DOWNLIGHT_COLOR}
					emissiveIntensity={0.5}
				/>
			</mesh>
			<mesh position={[0.55, 0.58, 0.05]}>
				<boxGeometry args={[0.1, 0.04, 0.04]} />
				<meshStandardMaterial
					color={DOWNLIGHT_COLOR}
					emissive={DOWNLIGHT_COLOR}
					emissiveIntensity={0.5}
				/>
			</mesh>

			{/* --- SHELF BELOW THE PLAQUE --- */}
			<group position={[0, -0.62, 0.1]}>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[0.5, 0.04, 0.14]} />
					<meshStandardMaterial color={SHELF_COLOR} roughness={0.4} />
				</mesh>

				{/* Rolled diploma */}
				<group position={[-0.14, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
					<mesh position={[0, 0, 0]}>
						<cylinderGeometry args={[0.03, 0.03, 0.18, 12]} />
						<meshStandardMaterial color={DIPLOMA_COLOR} roughness={0.6} />
					</mesh>
					{/* Ribbon tie */}
					<mesh position={[0, 0, 0]}>
						<cylinderGeometry args={[0.032, 0.032, 0.02, 12]} />
						<meshStandardMaterial
							color={DIPLOMA_RIBBON_COLOR}
							roughness={0.5}
						/>
					</mesh>
				</group>

				{/* PCB / antenna token */}
				<group position={[0.16, 0.045, 0]}>
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[0.14, 0.01, 0.1]} />
						<meshStandardMaterial color={PCB_COLOR} roughness={0.3} />
					</mesh>
					{/* Thin antenna sticking up */}
					<mesh position={[0.04, 0.05, -0.02]}>
						<cylinderGeometry args={[0.004, 0.004, 0.09, 6]} />
						<meshStandardMaterial color={ANTENNA_COLOR} metalness={0.8} />
					</mesh>
					{/* Blinking green LED on the PCB */}
					<PulsingCircuitLed
						position={[-0.03, 0.015, 0.02]}
						color={LED_COLOR}
						phase={0}
					/>
				</group>
			</group>
		</group>
	);
}
