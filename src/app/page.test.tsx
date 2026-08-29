import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
	it("renders the accessible sr-only h1 heading and voxel studio loader", () => {
		render(<Home />);
		expect(
			screen.getByRole("heading", {
				level: 1,
				name: /Victor Lis Bronzo — Portfólio & Storyteller Interativo 3D/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByTestId("voxel-studio-loading")).toBeInTheDocument();
	});

	it("renders the storyteller intro card on initial idle state", () => {
		render(<Home />);
		expect(
			screen.getByRole("button", { name: /Iniciar Minha História/i }),
		).toBeInTheDocument();
	});
});
