"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MeshStandardMaterial } from "three";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

// A nod to redstone logic circuits — the first taste of "programming".
export const REDSTONE_PISTON_ORIGIN: [number, number, number] = [-6.6, 0, -4.2];

const PLINTH_COLOR = "#0f172a";
const PISTON_BODY_COLOR = "#9c7b52";
const PISTON_BAND_COLOR = "#7a5f3d";
const PISTON_HEAD_COLOR = "#c8b18a";
const TORCH_STICK_COLOR = "#6d4c31";
const TORCH_GLOW_COLOR = "#ff2d2d";
const REDSTONE_DUST_COLOR = "#8b1a1a";
const FLICKER_SPEED = 4;
const STATIC_EMISSIVE = 1.1;

function FlickeringTorchLight({
	position,
}: {
	position: [number, number, number];
}) {
	const matRef = useRef<MeshStandardMaterial>(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	useFrame(({ clock }) => {
		if (prefersReducedMotion || !matRef.current) return;
		const flicker = Math.sin(clock.elapsedTime * FLICKER_SPEED) * 0.5 + 0.5;
		matRef.current.emissiveIntensity = 0.8 + flicker * 0.5;
	});

	return (
		<mesh position={position}>
			<sphereGeometry args={[0.06, 10, 10]} />
			<meshStandardMaterial
				ref={matRef}
				color={TORCH_GLOW_COLOR}
				emissive={TORCH_GLOW_COLOR}
				emissiveIntensity={prefersReducedMotion ? STATIC_EMISSIVE : 0.8}
			/>
		</mesh>
	);
}

export function VoxelRedstonePiston() {
	return (
		<group position={REDSTONE_PISTON_ORIGIN}>
			{/* Museum pedestal plinth */}
			<mesh position={[0, 0.06, 0]}>
				<boxGeometry args={[0.9, 0.12, 0.9]} />
				<meshStandardMaterial color={PLINTH_COLOR} roughness={0.6} />
			</mesh>

			{/* Piston block body */}
			<mesh position={[0, 0.42, 0]}>
				<boxGeometry args={[0.6, 0.6, 0.6]} />
				<meshStandardMaterial color={PISTON_BODY_COLOR} roughness={0.8} />
			</mesh>
			{/* Darker side-texture band */}
			<mesh position={[0.301, 0.42, 0]}>
				<boxGeometry args={[0.02, 0.6, 0.6]} />
				<meshStandardMaterial color={PISTON_BAND_COLOR} roughness={0.8} />
			</mesh>

			{/* Extended piston arm */}
			<mesh position={[0, 0.81, 0]}>
				<boxGeometry args={[0.24, 0.18, 0.24]} />
				<meshStandardMaterial color={PISTON_HEAD_COLOR} roughness={0.7} />
			</mesh>
			{/* Extended piston head */}
			<mesh position={[0, 0.96, 0]}>
				<boxGeometry args={[0.62, 0.12, 0.62]} />
				<meshStandardMaterial color={PISTON_HEAD_COLOR} roughness={0.7} />
			</mesh>

			{/* Redstone torch */}
			<mesh position={[0.42, 0.23, 0.3]}>
				<cylinderGeometry args={[0.04, 0.04, 0.22, 8]} />
				<meshStandardMaterial color={TORCH_STICK_COLOR} roughness={0.9} />
			</mesh>
			<FlickeringTorchLight position={[0.42, 0.35, 0.3]} />

			{/* Scattered redstone dust */}
			<mesh position={[-0.32, 0.125, 0.28]}>
				<boxGeometry args={[0.16, 0.01, 0.16]} />
				<meshStandardMaterial color={REDSTONE_DUST_COLOR} roughness={0.9} />
			</mesh>
			<mesh position={[-0.15, 0.125, 0.36]}>
				<boxGeometry args={[0.16, 0.01, 0.16]} />
				<meshStandardMaterial color={REDSTONE_DUST_COLOR} roughness={0.9} />
			</mesh>
			<mesh position={[0.3, 0.125, -0.3]}>
				<boxGeometry args={[0.16, 0.01, 0.16]} />
				<meshStandardMaterial color={REDSTONE_DUST_COLOR} roughness={0.9} />
			</mesh>
			<mesh position={[0.12, 0.125, -0.34]}>
				<boxGeometry args={[0.16, 0.01, 0.16]} />
				<meshStandardMaterial color={REDSTONE_DUST_COLOR} roughness={0.9} />
			</mesh>
		</group>
	);
}
