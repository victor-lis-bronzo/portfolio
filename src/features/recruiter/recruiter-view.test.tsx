import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "@/core/data/profile";
import { RecruiterView } from "./recruiter-view";

describe("RecruiterView", () => {
	it("renders the recruiter view container", () => {
		render(<RecruiterView />);
		expect(screen.getByTestId("recruiter-view")).toBeInTheDocument();
	});

	it("renders a single h1 with the profile name", () => {
		render(<RecruiterView />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading.textContent).toContain(profile.name);
	});

	it("renders at least one h2 section heading", () => {
		render(<RecruiterView />);
		const headings = screen.getAllByRole("heading", { level: 2 });
		expect(headings.length).toBeGreaterThan(0);
	});
});
