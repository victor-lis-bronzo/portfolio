"use client";

import { useState } from "react";
import { useEventsStore } from "@/features/events/state/events-store";
import { useStorytellerStore } from "@/core/state/storyteller-store";
import { useSceneFocusStore } from "@/features/scene-3d";
import { useCursor } from "@react-three/drei";

// Board matches size constraints mapped in scene planner.
const EVENTS_BOARD_ORIGIN: [number, number, number] = [6.95, 3.2, -6.5];
const EVENTS_BOARD_ROTATION: [number, number, number] = [0, -Math.PI / 2, 0];
const WOOD_FRAME = "#5c3a21";
const CORK_BOARD = "#2c1e16"; // Dark cork

export function VoxelEventsBoard() {
	const openModal = useEventsStore((state) => state.open);
	const [hovered, setHovered] = useState(false);
	
	useCursor(hovered);

	const handleClick = () => {
		void useSceneFocusStore.getState().focusWaypoint("EVENTS_BOARD");
		useStorytellerStore.getState().dismiss();
		openModal();
	};

	const handlePointerOver = (e: any) => {
		e.stopPropagation();
		setHovered(true);
	};

	const handlePointerOut = (e: any) => {
		e.stopPropagation();
		setHovered(false);
	};

	return (
		<group 
			position={EVENTS_BOARD_ORIGIN} 
			rotation={EVENTS_BOARD_ROTATION}
			onClick={handleClick}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
		>
			{/* Wooden Frame */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[3.2, 2.0, 0.1]} />
				<meshStandardMaterial color={WOOD_FRAME} roughness={0.8} emissive={hovered ? "#3a2515" : "#000000"} />
			</mesh>

			{/* Backing/Cork */}
			<mesh position={[0, 0, 0.05]}>
				<boxGeometry args={[3.0, 1.8, 0.02]} />
				<meshStandardMaterial color={CORK_BOARD} roughness={0.9} emissive={hovered ? "#2c1e16" : "#000000"} />
			</mesh>
		</group>
	);
}
