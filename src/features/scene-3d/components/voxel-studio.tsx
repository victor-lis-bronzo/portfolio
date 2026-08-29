"use client";

import { Canvas } from "@react-three/fiber";
import { IsometricLighting } from "./isometric-lighting";
import { SceneCameraRig } from "./scene-camera-rig";
import { StudioSideWalls } from "./studio-side-walls";
import { VoxelDesk } from "./voxel-desk";
import { VoxelIotBench } from "./voxel-iot-bench";
import { VoxelPrinter } from "./voxel-printer";
import { VoxelRoom } from "./voxel-room";
import { VoxelWhiteboard } from "./voxel-whiteboard";

const BACKGROUND_COLOR = "#10111e";

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
			{/* Order matters: R3F runs useFrame in subscription order, so mounting
			    StudioSideWalls after SceneCameraRig guarantees the walls read the
			    camera direction of the same frame the camera moved in. */}
			<StudioSideWalls />
			<IsometricLighting />
			<VoxelRoom />
			<VoxelDesk />
			<VoxelPrinter />
			<VoxelIotBench />
			<VoxelWhiteboard />
		</Canvas>
	);
}
