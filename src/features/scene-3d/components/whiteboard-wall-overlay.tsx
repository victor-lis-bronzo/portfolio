"use client";

import type { DiagramElement } from "@/core/entities/diagram-element";
import { WhiteboardCanvas } from "@/features/whiteboard";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { cn } from "@/shared/lib/utils";

// Migrated from the retired immersive-placeholder.tsx sample content.
const diagramElements: DiagramElement[] = [
	{
		id: "frontend-box",
		type: "box",
		x: 60,
		y: 80,
		width: 160,
		height: 70,
		label: "Frontend",
		delayMs: 0,
	},
	{
		id: "backend-box",
		type: "box",
		x: 420,
		y: 80,
		width: 160,
		height: 70,
		label: "Backend",
		delayMs: 200,
	},
	{
		id: "connector-arrow",
		type: "arrow",
		x: 220,
		y: 115,
		width: 200,
		height: 0,
		delayMs: 400,
	},
	{
		id: "solid-badge",
		type: "badge",
		x: 260,
		y: 220,
		width: 100,
		height: 36,
		label: "SOLID",
		color: "#4f46e5",
		delayMs: 600,
	},
	{
		id: "architecture-label",
		type: "text",
		x: 200,
		y: 320,
		label: "Arquitetura Limpa",
		delayMs: 800,
	},
];

const FOCUSED_OPACITY = "opacity-100";
const SUBTLE_OPACITY = "opacity-30";

export interface WhiteboardWallOverlayProps {
	/** True while the WHITEBOARD_FOCUS waypoint is the active camera focus. */
	focused: boolean;
}

/**
 * Plain DOM overlay, NOT rendered inside the R3F <Canvas>. Composites the
 * existing whiteboard feature's SVG output on top of the 3D scene, dimmed
 * unless the whiteboard waypoint is focused.
 */
export function WhiteboardWallOverlay({ focused }: WhiteboardWallOverlayProps) {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<div
			className={cn(
				"pointer-events-none absolute top-20 right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm md:max-w-md",
				!prefersReducedMotion && "transition-opacity duration-500",
				focused ? FOCUSED_OPACITY : SUBTLE_OPACITY,
			)}
		>
			<WhiteboardCanvas
				elements={diagramElements}
				className="rounded-lg border border-border/40 bg-background/80 shadow-lg backdrop-blur-sm"
			/>
		</div>
	);
}
