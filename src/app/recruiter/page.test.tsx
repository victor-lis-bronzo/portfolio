import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
