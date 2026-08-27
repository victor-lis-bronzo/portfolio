export type DiagramElementType = "box" | "arrow" | "text" | "badge";

export interface DiagramElement {
	id: string;
	type: DiagramElementType;
	x: number;
	y: number;
	width?: number;
	height?: number;
	label?: string;
	color?: string;
	delayMs?: number;
}
