import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STORY_SCRIPTS } from "@/core/data/story-scripts";
import RecruiterPage, { generateMetadata } from "./page";

describe("generateMetadata", () => {
	it("returns a title, description and canonical alternate", () => {
		const metadata = generateMetadata();

		expect(typeof metadata.title).toBe("string");
		expect((metadata.title as string).length).toBeGreaterThan(0);
		expect(metadata.title).toContain("Currículo");

		expect(typeof metadata.description).toBe("string");
		expect((metadata.description as string).length).toBeGreaterThan(0);

		expect(metadata.alternates?.canonical).toBe("/recruiter");
	});
});

describe("RecruiterPage", () => {
	it("renders a Person JSON-LD script tag", () => {
		render(<RecruiterPage />);

		const script = document.querySelector('script[type="application/ld+json"]');
		expect(script).not.toBeNull();

		const parsed = JSON.parse(script?.textContent ?? "");
		expect(parsed["@type"]).toBe("Person");
	});

	/**
	 * Structural by construction — `/recruiter` is its own route and never
	 * imports app/page.tsx, so no storyteller JS can reach this bundle. Kept as
	 * an explicit regression guard against someone "helpfully" mounting the
	 * overlay in a shared layout later.
	 */
	it("does not leak the storyteller into the recruiter mode", () => {
		render(<RecruiterPage />);

		for (const storyScript of STORY_SCRIPTS) {
			expect(screen.queryByText(storyScript.title)).not.toBeInTheDocument();
			for (const step of storyScript.steps) {
				expect(screen.queryByText(step.speech)).not.toBeInTheDocument();
			}
		}
		expect(
			screen.queryByRole("img", { name: "Mascote" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: "Próximo" }),
		).not.toBeInTheDocument();
	});
});
