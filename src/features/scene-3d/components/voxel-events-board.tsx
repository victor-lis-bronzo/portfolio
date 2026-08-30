"use client";

import { useState } from "react";
import { Html, useCursor } from "@react-three/drei";
import { useEventsStore } from "@/features/events/state/events-store";
import { useStorytellerStore } from "@/core/state/storyteller-store";
import { useSceneFocusStore } from "@/features/scene-3d";
import { TECH_EVENTS } from "@/features/events/data";
import { EventBadge } from "@/features/events/components/event-badge";

// Board matches size constraints mapped in scene planner.
const EVENTS_BOARD_ORIGIN: [number, number, number] = [6.95, 3.2, -6.5];
const EVENTS_BOARD_ROTATION: [number, number, number] = [0, -Math.PI / 2, 0];
const WOOD_FRAME = "#5c3a21";
const CORK_BOARD = "#2c1e16"; // Dark cork
const HTML_TRANSFORM_UNIT_DISTANCE_FACTOR = 400;

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

			{/* Teaser Overlay */}
			<Html
				transform
				position={[0, 0, 0.07]}
				scale={0.0035}
				distanceFactor={HTML_TRANSFORM_UNIT_DISTANCE_FACTOR}
				zIndexRange={[0, 0]}
				style={{ width: "860px", height: "510px", pointerEvents: "none" }}
			>
				<div className="w-full h-full p-8 flex flex-col relative overflow-hidden bg-slate-900/50 rounded-xl border border-slate-700/50">
					<h2 className="text-4xl text-white font-bold mb-6 text-center drop-shadow-md">
						Tech Events & Community
					</h2>
					
					{/* Render only first 3 events */}
					<div className="grid grid-cols-3 gap-6 opacity-80">
						{TECH_EVENTS.slice(0, 3).map((event) => (
							<div key={event.id} className="scale-90 transform origin-top">
								<EventBadge event={event} />
							</div>
						))}
					</div>

					{/* Gradient Fade + Button */}
					<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex items-end justify-center pb-12">
						<div className="bg-amber-500 text-slate-900 font-black px-8 py-4 rounded-xl text-2xl shadow-xl shadow-amber-500/20 ring-4 ring-amber-500/30">
							Ver todos os {TECH_EVENTS.length} eventos
						</div>
					</div>
				</div>
			</Html>
		</group>
	);
}
