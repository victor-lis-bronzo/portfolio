import { describe, expect, it } from "vitest";
import { profile } from "@/core/data/profile";
import { buildSystemPrompt, computeAge } from "./system-prompt";

describe("buildSystemPrompt", () => {
	it("always writes the instructional wrapper in English", () => {
		for (const locale of ["en", "pt"] as const) {
			const prompt = buildSystemPrompt(locale);
			expect(prompt).toContain(`You are ${profile.name}`);
			expect(prompt).toContain("REPLY LANGUAGE:");
			expect(prompt).toContain("Never invent facts.");
		}
	});

	it("names the reply language for the requested locale", () => {
		expect(buildSystemPrompt("en")).toContain("always answer in English");
		expect(buildSystemPrompt("pt")).toContain(
			"always answer in Brazilian Portuguese",
		);
	});

	it("serializes profile, story, projects and articles", () => {
		const prompt = buildSystemPrompt("en");

		expect(prompt).toContain(profile.linkedinHref);
		expect(prompt).toContain(profile.email);
		// Story chapter + step content.
		expect(prompt).toContain("Origins & Logic");
		expect(prompt).toContain("Minecraft redstone");
		// A story CTA, serialized as a citable link.
		expect(prompt).toContain(
			"https://www.linkedin.com/posts/victor-lis-bronzo_eco-play-activity-7266495833804558336-cO3f-",
		);
		// Projects and articles.
		expect(prompt).toContain("Git Assets");
		expect(prompt).toContain("https://gitassets.victorlisbronzo.me");
		expect(prompt).toContain("The Dependency Inversion Principle");
	});

	it("serializes only the requested locale's copy", () => {
		const en = buildSystemPrompt("en");
		expect(en).toContain("Origins & Logic");
		expect(en).not.toContain("Origens & Lógica");
		expect(en).not.toContain("Oi, eu sou o Victor");

		const pt = buildSystemPrompt("pt");
		expect(pt).toContain("Origens & Lógica");
		expect(pt).toContain("Oi, eu sou o Victor");
		expect(pt).not.toContain("Origins & Logic");
	});

	it("states a derived age next to the birth date", () => {
		const prompt = buildSystemPrompt("en");
		expect(prompt).toContain(
			`Age: ${computeAge(profile.birthDate)} (born ${profile.birthDate})`,
		);
	});

	it("serializes the LinkedIn career record for both locales", () => {
		const en = buildSystemPrompt("en");
		expect(en).toContain("=== CONTEXT: EXPERIENCE ===");
		expect(en).toContain("=== CONTEXT: CERTIFICATIONS ===");
		expect(en).toContain("=== CONTEXT: RECOMMENDATIONS ===");
		// A fact that only exists in the LinkedIn record, never in the site copy.
		expect(en).toContain("Star-Lockers");
		expect(en).toContain("91 certifications");
		expect(en).toContain("62.416.012/0001-59");

		const pt = buildSystemPrompt("pt");
		expect(pt).toContain("=== CONTEXT: EXPERIENCE ===");
		expect(pt).toContain("91 certificações");
		expect(pt).toContain("62.416.012/0001-59");
	});

	it("keeps the LinkedIn record locale-isolated too", () => {
		const en = buildSystemPrompt("en");
		expect(en).toContain("91 certifications");
		expect(en).not.toContain("91 certificações");
		expect(en).not.toContain("Curso Superior de Tecnologia");

		const pt = buildSystemPrompt("pt");
		expect(pt).toContain("91 certificações");
		expect(pt).not.toContain("91 certifications");
		expect(pt).not.toContain("Junior Full-Stack Developer");
	});
});

describe("computeAge", () => {
	// 2007-02-16, the profile's birth date, against fixed references so the
	// boundary cases are asserted rather than recomputed by the same arithmetic.
	it("counts full years elapsed", () => {
		expect(computeAge("2007-02-16", new Date(2026, 7, 30))).toBe(19);
	});

	it("does not count the birthday before it happens", () => {
		expect(computeAge("2007-02-16", new Date(2026, 1, 15))).toBe(18);
	});

	it("counts the birthday on the day itself", () => {
		expect(computeAge("2007-02-16", new Date(2026, 1, 16))).toBe(19);
	});

	it("does not count a later month in the same year", () => {
		expect(computeAge("2007-12-31", new Date(2026, 1, 16))).toBe(18);
	});
});
