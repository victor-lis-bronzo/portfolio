"use client";

import { Html } from "@react-three/drei";
import { useState } from "react";
import { useWhiteboardStore, WhiteboardCanvas } from "@/features/whiteboard";
import { AssistantPanel } from "@/features/whiteboard-assistant";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

// Positioned in Quadrant 4 (South-West / Front-Left)
export const WHITEBOARD_ORIGIN: [number, number, number] = [-2.5, 0, 2.2];
export const WHITEBOARD_ROTATION: [number, number, number] = [
	0,
	Math.PI / 4.5,
	0,
];

const FRAME_COLOR = "#64748b";
const CORNER_COLOR = "#334155";
const BOARD_COLOR = "#f8fafc";
const STAND_COLOR = "#475569";
const TRAY_COLOR = "#94a3b8";

/** CSS-pixel size the embedded board UI is authored at. */
const PANEL_WIDTH_PX = 800;
const PANEL_HEIGHT_PX = 500;
/** World width the panel has to cover — the white surface is 2.88 wide. */
const PANEL_WORLD_WIDTH = 2.8;
/** World units per authored CSS pixel. */
export const WHITEBOARD_PANEL_SCALE = PANEL_WORLD_WIDTH / PANEL_WIDTH_PX;
/**
 * drei's <Html transform> divides the object's world matrix by
 * `400 / (distanceFactor ?? 10)` — i.e. by 40 unless `distanceFactor` is given.
 * Passing 400 makes that divisor exactly 1, so `scale` alone maps CSS pixels to
 * world units. Leaving it at the default shrinks the panel to 1/40 of the board
 * (~0.07 world units), which under this scene's orthographic camera came out as
 * a sub-pixel, unclickable overlay.
 */
const HTML_TRANSFORM_UNIT_DISTANCE_FACTOR = 400;

type BoardView = "diagram" | "assistant";

const BOARD_VIEWS: readonly BoardView[] = ["diagram", "assistant"];

export function VoxelWhiteboard() {
	const elements = useWhiteboardStore((state) => state.elements);
	const ui = useUiStrings();
	// The board defaults to the diagram so the narrated story looks exactly as it
	// did before; the assistant is something a visitor opts into.
	const [view, setView] = useState<BoardView>("diagram");

	const viewLabels: Record<BoardView, string> = {
		diagram: ui.whiteboardViewDiagram,
		assistant: ui.whiteboardViewAssistant,
	};

	return (
		<group position={WHITEBOARD_ORIGIN} rotation={WHITEBOARD_ROTATION}>
			{/* --- WHEELED MOBILE STAND --- */}
			{/* Left Foot Bar */}
			<mesh position={[-1.2, 0.05, 0]}>
				<boxGeometry args={[0.08, 0.06, 0.8]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			{/* Left Wheels */}
			<mesh position={[-1.2, 0.03, -0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>
			<mesh position={[-1.2, 0.03, 0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>

			{/* Right Foot Bar */}
			<mesh position={[1.2, 0.05, 0]}>
				<boxGeometry args={[0.08, 0.06, 0.8]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			{/* Right Wheels */}
			<mesh position={[1.2, 0.03, -0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>
			<mesh position={[1.2, 0.03, 0.35]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
				<meshStandardMaterial color="#0f172a" roughness={0.8} />
			</mesh>

			{/* Vertical Stand Posts */}
			<mesh position={[-1.2, 0.9, 0]}>
				<boxGeometry args={[0.06, 1.7, 0.06]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			<mesh position={[1.2, 0.9, 0]}>
				<boxGeometry args={[0.06, 1.7, 0.06]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>
			{/* Lower Crossbar */}
			<mesh position={[0, 0.3, 0]}>
				<boxGeometry args={[2.4, 0.05, 0.05]} />
				<meshStandardMaterial color={STAND_COLOR} roughness={0.4} />
			</mesh>

			{/* --- WHITEBOARD BOARD ASSEMBLY --- */}
			<group position={[0, 1.45, 0]}>
				{/* Outer Aluminum Frame */}
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[3.0, 1.9, 0.05]} />
					<meshStandardMaterial
						color={FRAME_COLOR}
						metalness={0.6}
						roughness={0.3}
					/>
				</mesh>

				{/* Corner Protective Caps */}
				{[
					[-1.48, 0.93],
					[1.48, 0.93],
					[-1.48, -0.93],
					[1.48, -0.93],
				].map(([x, y]) => (
					<mesh key={`corner-${x}-${y}`} position={[x, y, 0.015]}>
						<boxGeometry args={[0.08, 0.08, 0.06]} />
						<meshStandardMaterial color={CORNER_COLOR} roughness={0.7} />
					</mesh>
				))}

				{/* White Glossy Magnetic Board Surface */}
				{/* Z-offsets are deliberate to prevent z-fighting with aluminum frame */}
				<mesh position={[0, 0, 0.02]}>
					<boxGeometry args={[2.88, 1.78, 0.04]} />
					<meshStandardMaterial
						color={BOARD_COLOR}
						roughness={0.55}
						metalness={0}
					/>
				</mesh>

				{/* Marker Pen Tray */}
				<mesh position={[0, -0.9, 0.06]}>
					<boxGeometry args={[2.6, 0.04, 0.1]} />
					<meshStandardMaterial
						color={TRAY_COLOR}
						metalness={0.5}
						roughness={0.3}
					/>
				</mesh>

				{/* Dry-Erase Markers & Eraser on Tray */}
				{/* Black Marker */}
				<mesh position={[-0.4, -0.87, 0.06]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
					<meshStandardMaterial color="#0f172a" roughness={0.5} />
				</mesh>
				{/* Blue Marker */}
				<mesh position={[-0.2, -0.87, 0.06]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
					<meshStandardMaterial color="#2563eb" roughness={0.5} />
				</mesh>
				{/* Red Marker */}
				<mesh position={[0.0, -0.87, 0.06]} rotation={[0, 0, Math.PI / 2]}>
					<cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
					<meshStandardMaterial color="#dc2626" roughness={0.5} />
				</mesh>
				{/* Magnetic Eraser */}
				<mesh position={[0.35, -0.86, 0.06]}>
					<boxGeometry args={[0.16, 0.04, 0.06]} />
					<meshStandardMaterial color="#1e3a8a" roughness={0.7} />
				</mesh>

				{/* --- EMBEDDED WHITEBOARD CANVAS --- */}
				<Html
					transform
					position={[0, 0, 0.05]}
					scale={WHITEBOARD_PANEL_SCALE}
					distanceFactor={HTML_TRANSFORM_UNIT_DISTANCE_FACTOR}
					style={{
						width: `${PANEL_WIDTH_PX}px`,
						height: `${PANEL_HEIGHT_PX}px`,
						// The overlay as a whole stays inert so scene gestures pass
						// straight through the board. The view switcher and the assistant
						// opt back in individually; the diagram never does.
						userSelect: "none",
						pointerEvents: "none",
					}}
				>
					<div className="relative h-full w-full">
						<fieldset
							aria-label={ui.whiteboardViewsLabel}
							className="absolute top-0 right-0 z-10 inline-flex items-center gap-0.5 rounded-lg border border-border bg-card/90 p-0.5 backdrop-blur-md"
							style={{ pointerEvents: "auto" }}
						>
							{BOARD_VIEWS.map((option) => {
								const isActive = option === view;
								return (
									<button
										key={option}
										type="button"
										onClick={() => setView(option)}
										aria-pressed={isActive}
										className={`min-h-7 rounded-md px-2 font-semibold text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
											isActive
												? "bg-primary text-primary-foreground"
												: "text-foreground/60 hover:text-foreground"
										}`}
									>
										{viewLabels[option]}
									</button>
								);
							})}
						</fieldset>

						{view === "diagram" ? (
							<WhiteboardCanvas
								elements={elements}
								className="h-full w-full bg-transparent"
							/>
						) : (
							<div
								className="absolute inset-0 pt-9"
								style={{ pointerEvents: "auto", userSelect: "text" }}
							>
								<AssistantPanel />
							</div>
						)}
					</div>
				</Html>
			</group>
		</group>
	);
}
