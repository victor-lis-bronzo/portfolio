import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
	it("always renders the immersive placeholder", () => {
		render(<Home />);
		expect(screen.getByTestId("immersive-placeholder")).toBeInTheDocument();
		expect(
			screen.queryByTestId("recruiter-placeholder"),
		).not.toBeInTheDocument();
	});
});
