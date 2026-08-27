import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
	it("renders the voxel studio loader, starting with its loading fallback", () => {
		render(<Home />);
		expect(screen.getByTestId("voxel-studio-loading")).toBeInTheDocument();
		expect(
			screen.queryByTestId("recruiter-placeholder"),
		).not.toBeInTheDocument();
	});
});
