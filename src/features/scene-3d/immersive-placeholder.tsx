import type { DiagramElement } from "@/core/entities/diagram-element";
import { WhiteboardCanvas } from "@/features/whiteboard";

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

export function ImmersivePlaceholder() {
	return (
		<section
			data-testid="immersive-placeholder"
			className="flex h-full flex-col items-center justify-center gap-4"
		>
			<WhiteboardCanvas elements={diagramElements} />
			<p className="text-muted-foreground">
				Estúdio 3D (em construção — Fase 4)
			</p>
		</section>
	);
}
