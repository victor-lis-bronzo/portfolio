import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { AnimatedPath } from "./animated-path";

vi.mock("@/shared/hooks/use-prefers-reduced-motion", () => ({
	usePrefersReducedMotion: vi.fn(),
}));

describe("AnimatedPath", () => {
	it("renders the path with the correct d attribute when motion is enabled", () => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

		const { container } = render(
			<svg>
				<title>Test path</title>
				<AnimatedPath d="M0 0 L10 10" />
			</svg>,
		);

		const path = container.querySelector("path");
		expect(path).not.toBeNull();
		expect(path).toHaveAttribute("d", "M0 0 L10 10");
	});

	it("renders the path with the correct d attribute when motion is reduced", () => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(true);

		const { container } = render(
			<svg>
				<title>Test path</title>
				<AnimatedPath d="M0 0 L10 10" />
			</svg>,
		);

		const path = container.querySelector("path");
		expect(path).not.toBeNull();
		expect(path).toHaveAttribute("d", "M0 0 L10 10");
	});

	it("passes stroke, strokeWidth and fill through as attributes when provided", () => {
		vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

		const { container } = render(
			<svg>
				<title>Test path</title>
				<AnimatedPath
					d="M0 0 L10 10"
					stroke="#000000"
					strokeWidth={2}
					fill="none"
				/>
			</svg>,
		);

		const path = container.querySelector("path");
		expect(path).toHaveAttribute("stroke", "#000000");
		expect(path).toHaveAttribute("stroke-width", "2");
		expect(path).toHaveAttribute("fill", "none");
	});
});
