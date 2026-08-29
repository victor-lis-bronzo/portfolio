import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppChrome } from "./app-chrome";

vi.mock("next/navigation", () => ({
	usePathname: vi.fn(),
	useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

describe("AppChrome", () => {
	beforeEach(() => {
		vi.mocked(usePathname).mockReturnValue("/");
	});

	it("renders the immersive full-bleed layout when pathname is '/'", () => {
		const { container } = render(
			<AppChrome>
				<div data-testid="test-child">Child Content</div>
			</AppChrome>,
		);

		expect(screen.getByTestId("test-child")).toBeInTheDocument();
		expect(screen.getByText("Victor Lis Bronzo")).toBeInTheDocument();

		const rootWrapper = container.firstElementChild;
		expect(rootWrapper).toHaveClass("relative", "h-dvh", "overflow-hidden");

		const header = container.querySelector("header");
		// Overlay transparente sobre a cena 3D: fixo e sem capturar cliques.
		expect(header).toHaveClass("fixed", "pointer-events-none");
	});

	it("renders the standard scrollable layout when pathname is '/recruiter'", () => {
		vi.mocked(usePathname).mockReturnValue("/recruiter");

		const { container } = render(
			<AppChrome>
				<div data-testid="test-child">Child Content</div>
			</AppChrome>,
		);

		expect(screen.getByTestId("test-child")).toBeInTheDocument();

		const rootWrapper = container.firstElementChild;
		expect(rootWrapper).toHaveClass("min-h-dvh", "flex-col");

		const header = container.querySelector("header");
		expect(header).toHaveClass("sticky", "top-0");
	});
});
