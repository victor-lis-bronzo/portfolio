import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/shared/lib/site-config";
import sitemap from "./sitemap";

describe("sitemap", () => {
	it("includes the home and recruiter routes", () => {
		const result = sitemap();

		expect(Array.isArray(result)).toBe(true);
		expect(result.some((entry) => entry.url === SITE_URL)).toBe(true);
		expect(result.some((entry) => entry.url === `${SITE_URL}/recruiter`)).toBe(
			true,
		);
	});
});
