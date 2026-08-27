import rough from "roughjs";
import type { Drawable } from "roughjs/bin/core";
import type { DiagramElement } from "@/core/entities/diagram-element";
import { getColorOptions } from "./rough-options";

const generator = rough.generator();

export const DEFAULT_BOX_WIDTH = 120;
export const DEFAULT_BOX_HEIGHT = 60;
const DEFAULT_ARROW_DX = 80;
const DEFAULT_ARROW_DY = 0;
const ARROWHEAD_LENGTH = 12;
const ARROWHEAD_ANGLE = Math.PI / 7;

function seedFromId(id: string, salt = 0): number {
	let hash = salt;
	for (let i = 0; i < id.length; i++) {
		hash = (hash * 31 + id.charCodeAt(i)) | 0;
	}
	return Math.abs(hash) % 2147483647 || 1;
}

export interface TextShape {
	x: number;
	y: number;
	label?: string;
}

export type GeneratedShape =
	| { kind: "drawable"; drawables: Drawable[] }
	| { kind: "text"; x: number; y: number; label?: string };

export function generateBox(el: DiagramElement): Drawable {
	const width = el.width ?? DEFAULT_BOX_WIDTH;
	const height = el.height ?? DEFAULT_BOX_HEIGHT;
	const options = { ...getColorOptions(el.color), seed: seedFromId(el.id) };
	return generator.rectangle(el.x, el.y, width, height, options);
}

export function generateArrow(el: DiagramElement): Drawable[] {
	const options = { ...getColorOptions(el.color), seed: seedFromId(el.id) };
	const dx = el.width ?? DEFAULT_ARROW_DX;
	const dy = el.height ?? DEFAULT_ARROW_DY;
	const endX = el.x + dx;
	const endY = el.y + dy;

	const angle = Math.atan2(dy, dx);
	const headAngle1 = angle + Math.PI - ARROWHEAD_ANGLE;
	const headAngle2 = angle + Math.PI + ARROWHEAD_ANGLE;

	const head1X = endX + ARROWHEAD_LENGTH * Math.cos(headAngle1);
	const head1Y = endY + ARROWHEAD_LENGTH * Math.sin(headAngle1);
	const head2X = endX + ARROWHEAD_LENGTH * Math.cos(headAngle2);
	const head2Y = endY + ARROWHEAD_LENGTH * Math.sin(headAngle2);

	return [
		generator.line(el.x, el.y, endX, endY, options),
		generator.line(endX, endY, head1X, head1Y, options),
		generator.line(endX, endY, head2X, head2Y, options),
	];
}

export function generateBadge(el: DiagramElement): Drawable {
	const width = el.width ?? DEFAULT_BOX_WIDTH;
	const height = el.height ?? DEFAULT_BOX_HEIGHT;
	const options: import("roughjs/bin/core").Options = {
		...getColorOptions(el.color),
		fillStyle: "solid",
		fill: el.color ?? "#f0f0f0",
		seed: seedFromId(el.id),
	};
	return generator.rectangle(el.x, el.y, width, height, options);
}

export function generateText(el: DiagramElement): TextShape | null {
	if (el.type !== "text") {
		return null;
	}
	return { x: el.x, y: el.y, label: el.label };
}

export function generateShape(el: DiagramElement): GeneratedShape {
	switch (el.type) {
		case "box":
			return { kind: "drawable", drawables: [generateBox(el)] };
		case "arrow":
			return { kind: "drawable", drawables: generateArrow(el) };
		case "badge":
			return { kind: "drawable", drawables: [generateBadge(el)] };
		case "text":
			return { kind: "text", x: el.x, y: el.y, label: el.label };
		default:
			return { kind: "drawable", drawables: [generateBox(el)] };
	}
}
