import { describe, expect, it } from "vitest";
import type { DiagramElement } from "@/core/entities/diagram-element";
import {
	generateArrow,
	generateBadge,
	generateBox,
	generateShape,
	generateText,
} from "./shape-generators";

function makeElement(overrides: Partial<DiagramElement>): DiagramElement {
	return {
		id: "el-1",
		type: "box",
		x: 0,
		y: 0,
		...overrides,
	};
}

describe("generateBox", () => {
	it("returns a Drawable with a non-empty sets array", () => {
		const el = makeElement({ type: "box", width: 100, height: 50 });
		const drawable = generateBox(el);

		expect(drawable.shape).toBe("rectangle");
		expect(drawable.sets.length).toBeGreaterThan(0);
	});
});

describe("generateArrow", () => {
	it("returns more than one Drawable (line + arrowhead segments)", () => {
		const el = makeElement({ type: "arrow", width: 80, height: 0 });
		const drawables = generateArrow(el);

		expect(drawables.length).toBeGreaterThan(1);
		expect(drawables.every((d) => d.sets.length > 0)).toBe(true);
	});
});

describe("generateBadge", () => {
	it("returns a Drawable", () => {
		const el = makeElement({ type: "badge", color: "#ff0000" });
		const drawable = generateBadge(el);

		expect(drawable.shape).toBe("rectangle");
		expect(drawable.sets.length).toBeGreaterThan(0);
	});
});

describe("generateText", () => {
	it("returns a plain text shape object for text elements", () => {
		const el = makeElement({ type: "text", label: "hello" });
		const result = generateText(el);

		expect(result).toEqual({ x: 0, y: 0, label: "hello" });
	});

	it("returns null for non-text elements", () => {
		const el = makeElement({ type: "box" });
		expect(generateText(el)).toBeNull();
	});
});

describe("generateShape", () => {
	it("dispatches to a drawable shape for box", () => {
		const result = generateShape(makeElement({ type: "box" }));
		expect(result.kind).toBe("drawable");
	});

	it("dispatches to a drawable shape for arrow", () => {
		const result = generateShape(makeElement({ type: "arrow" }));
		expect(result.kind).toBe("drawable");
		if (result.kind === "drawable") {
			expect(result.drawables.length).toBeGreaterThan(1);
		}
	});

	it("dispatches to a drawable shape for badge", () => {
		const result = generateShape(makeElement({ type: "badge" }));
		expect(result.kind).toBe("drawable");
	});

	it("dispatches to a text shape for text", () => {
		const result = generateShape(makeElement({ type: "text", label: "hi" }));
		expect(result.kind).toBe("text");
		if (result.kind === "text") {
			expect(result.label).toBe("hi");
		}
	});

	it("falls back to a drawable box for an unknown type", () => {
		const el = makeElement({ type: "unknown" as DiagramElement["type"] });
		const result = generateShape(el);
		expect(result.kind).toBe("drawable");
	});
});
