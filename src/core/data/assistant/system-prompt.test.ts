import { describe, expect, it } from "vitest";
import { profile } from "@/core/data/profile";
import { buildSystemPrompt } from "./system-prompt";

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
});
