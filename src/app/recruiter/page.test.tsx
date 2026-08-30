import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BIOGRAPHICAL_STORY_SCRIPT } from "@/core/data/story";
import RecruiterPage, { generateMetadata } from "./page";

describe("generateMetadata", () => {
	it("returns a title, description and canonical alternate", () => {
		const metadata = generateMetadata();

		expect(typeof metadata.title).toBe("string");
		expect((metadata.title as string).length).toBeGreaterThan(0);
		expect(metadata.title).toContain("Résumé");

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

		for (const chapter of BIOGRAPHICAL_STORY_SCRIPT.chapters) {
			expect(screen.queryByText(chapter.title.en)).not.toBeInTheDocument();
		}
		for (const step of BIOGRAPHICAL_STORY_SCRIPT.steps) {
			expect(
				screen.queryByText(step.mascotDialogue.en),
			).not.toBeInTheDocument();
		}
		expect(
			screen.queryByRole("toolbar", {
				name: "Storyteller playback controls",
			}),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: "Next step" }),
		).not.toBeInTheDocument();
	});
});
