"use client";

import { Canvas } from "@react-three/fiber";
import { IsometricLighting } from "./isometric-lighting";
import { SceneCameraRig } from "./scene-camera-rig";
import { VoxelDesk } from "./voxel-desk";
import { VoxelIotBench } from "./voxel-iot-bench";
import { VoxelPrinter } from "./voxel-printer";

const FLOOR_SIZE = 40;
const FLOOR_COLOR = "#1e293b";
const BACKGROUND_COLOR = "#0f172a";

/**
 * The real <Canvas> root. Only ever reached via voxel-studio-loader.tsx's
 * dynamic(..., { ssr: false }) import, so this file (and everything it
 * imports) never needs to run on the server.
 */
export function VoxelStudio() {
	return (
		<Canvas orthographic dpr={[1, 2]} gl={{ antialias: true }}>
			<color attach="background" args={[BACKGROUND_COLOR]} />
			<SceneCameraRig />
			<IsometricLighting />
			<VoxelDesk />
			<VoxelIotBench />
			<VoxelPrinter />
			<mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE]} />
				<meshStandardMaterial color={FLOOR_COLOR} />
			</mesh>
		</Canvas>
	);
}
