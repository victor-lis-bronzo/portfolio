import type { DiagramElement } from "../entities/diagram-element";

export interface IWhiteboardDriver {
	render(elements: DiagramElement[]): void;
	clear(): void;
}
