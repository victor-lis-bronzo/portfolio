import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STORY_SCRIPTS } from "@/core/data/story-scripts";
import Home from "./page";

describe("Home", () => {
	it("renders the voxel studio loader, starting with its loading fallback", () => {
		render(<Home />);
		expect(screen.getByTestId("voxel-studio-loading")).toBeInTheDocument();
		expect(
			screen.queryByTestId("recruiter-placeholder"),
		).not.toBeInTheDocument();
	});

	it("mounts the storyteller overlay with its idle tour chips", () => {
		render(<Home />);

		for (const script of STORY_SCRIPTS) {
			expect(screen.getByText(script.title)).toBeInTheDocument();
		}
	});
});
