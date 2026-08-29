import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { DiagramElement } from "@/core/entities/diagram-element";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { WhiteboardCanvas } from "./whiteboard-canvas";

vi.mock("@/shared/hooks/use-prefers-reduced-motion", () => ({
	usePrefersReducedMotion: vi.fn(),
}));

const elements: DiagramElement[] = [
	{
		id: "box-1",
		type: "box",
		x: 10,
		y: 10,
		width: 120,
		height: 60,
		label: "Frontend",
	},
	{ id: "arrow-1", type: "arrow", x: 130, y: 40, width: 80, height: 0 },
	{
		id: "badge-1",
		type: "badge",
		x: 300,
		y: 10,
		width: 80,
		height: 30,
		label: "SOLID",
	},
	{ id: "text-1", type: "text", x: 10, y: 120, label: "Arquitetura Limpa" },
];

describe("WhiteboardCanvas", () => {
	beforeEach(() => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(false);
	});

	it("renders an svg with paths for box, arrow and badge elements", () => {
		const { container } = render(<WhiteboardCanvas elements={elements} />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		const paths = container.querySelectorAll("path");
		expect(paths.length).toBeGreaterThan(0);
	});

	it("renders a text element with the correct label", () => {
		render(<WhiteboardCanvas elements={elements} />);
		expect(screen.getByText("Arquitetura Limpa")).toBeInTheDocument();
	});

	it("renders centered labels for box and badge elements", () => {
		render(<WhiteboardCanvas elements={elements} />);
		expect(screen.getByText("Frontend")).toBeInTheDocument();
		expect(screen.getByText("SOLID")).toBeInTheDocument();
	});

	it("renders an empty svg with no paths or text when elements is empty (analogous to clear())", () => {
		const { container } = render(<WhiteboardCanvas elements={[]} />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(container.querySelectorAll("path").length).toBe(0);
		expect(container.querySelectorAll("text").length).toBe(0);
	});

	it("renders the same number of elements regardless of the reduced-motion preference", () => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(true);
		const { container: reduced } = render(
			<WhiteboardCanvas elements={elements} />,
		);

		vi.mocked(usePrefersReducedMotion).mockReturnValue(false);
		const { container: full } = render(
			<WhiteboardCanvas elements={elements} />,
		);

		expect(reduced.querySelectorAll("path").length).toBe(
			full.querySelectorAll("path").length,
		);
		expect(reduced.querySelectorAll("text").length).toBe(
			full.querySelectorAll("text").length,
		);
	});
});
