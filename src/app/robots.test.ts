import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/shared/lib/site-config";
import robots from "./robots";

describe("robots", () => {
	it("allows all user agents and points to the sitemap", () => {
		const result = robots();

		expect(result.rules).toEqual({
			userAgent: "*",
			allow: "/",
		});
		expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
	});
});
