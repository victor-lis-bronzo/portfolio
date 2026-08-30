import { articles } from "@/core/data/articles";
import { LINKEDIN_PROFILE } from "@/core/data/assistant/linkedin-profile";
import { profile } from "@/core/data/profile";
import { projects } from "@/core/data/projects";
import { BIOGRAPHICAL_STORY_SCRIPT } from "@/core/data/story";
import type { StoryStep } from "@/core/entities/story-script";
import type { Locale, Localized } from "@/shared/i18n/types";

/**
 * The portfolio is a few thousand tokens in total, so the assistant gets the
 * whole thing in the system prompt instead of a retrieval layer. Only the active
 * locale is serialized — sending both languages would double the prompt and
 * invites the model to answer in the wrong one.
 */

const LANGUAGE_NAMES: Record<Locale, string> = {
	en: "English",
	pt: "Brazilian Portuguese",
};

function pick(value: Localized, locale: Locale): string {
	return value[locale];
}

/**
 * Full years elapsed between `birthDate` (ISO `YYYY-MM-DD`) and `reference`.
 *
 * The prompt is built server-side on every request, so deriving the age here
 * instead of storing a number means it is never a year stale — and the
 * birthday-not-yet-reached case is handled, which a plain year subtraction
 * gets wrong for roughly six weeks a year.
 *
 * The ISO string is split by hand rather than passed to `new Date()`, which
 * would parse it as UTC midnight and shift the day backwards in Brazil.
 */
export function computeAge(birthDate: string, reference = new Date()): number {
	const [year, month, day] = birthDate.split("-").map(Number);
	let age = reference.getFullYear() - year;
	const monthDelta = reference.getMonth() + 1 - month;
	if (monthDelta < 0 || (monthDelta === 0 && reference.getDate() < day)) {
		age -= 1;
	}
	return age;
}

function renderProfile(locale: Locale): string {
	const lines = [
		`Name: ${profile.name}`,
		`Age: ${computeAge(profile.birthDate)} (born ${profile.birthDate})`,
		`Role: ${pick(profile.role, locale)}`,
		`Summary: ${pick(profile.summary, locale)}`,
	];
	if (profile.location) {
		lines.push(`Location: ${pick(profile.location, locale)}`);
	}
	lines.push(
		`Email: ${profile.email}`,
		`GitHub: ${profile.githubHref}`,
		`LinkedIn: ${profile.linkedinHref}`,
	);
	return lines.join("\n");
}

function renderStep(step: StoryStep, locale: Locale): string {
	const lines = [`- ${pick(step.mascotDialogue, locale)}`];
	for (const cta of step.ctas ?? []) {
		lines.push(`  Link — ${pick(cta.label, locale)}: ${cta.href}`);
	}
	return lines.join("\n");
}

function renderStory(locale: Locale): string {
	const stepsById = new Map(
		BIOGRAPHICAL_STORY_SCRIPT.steps.map((step) => [step.id, step]),
	);

	return BIOGRAPHICAL_STORY_SCRIPT.chapters
		.map((chapter) => {
			const header = chapter.description
				? `## ${pick(chapter.title, locale)} — ${pick(chapter.description, locale)}`
				: `## ${pick(chapter.title, locale)}`;
			const steps = chapter.stepIds
				.map((stepId) => stepsById.get(stepId))
				.filter((step): step is StoryStep => Boolean(step))
				.map((step) => renderStep(step, locale));
			return [header, ...steps].join("\n");
		})
		.join("\n\n");
}

function renderProjects(locale: Locale): string {
	return projects
		.map((project) => {
			const lines = [
				`## ${pick(project.title, locale)}`,
				pick(project.summary, locale),
				`Stack: ${project.stack.join(", ")}`,
			];
			if (project.role) {
				lines.push(`Role: ${pick(project.role, locale)}`);
			}
			if (project.impact) {
				lines.push(`Impact: ${pick(project.impact, locale)}`);
			}
			if (project.href) {
				lines.push(`Live: ${project.href}`);
			}
			if (project.repoHref) {
				lines.push(`Source: ${project.repoHref}`);
			}
			return lines.join("\n");
		})
		.join("\n\n");
}

function renderArticles(locale: Locale): string {
	return articles
		.map((article) =>
			[
				`## ${pick(article.title, locale)} (${article.publishedAt})`,
				pick(article.summary, locale),
				`Link: ${article.href}`,
			].join("\n"),
		)
		.join("\n\n");
}

/**
 * Section order and block headings for the LinkedIn-derived career record.
 *
 * Declared here rather than inferred from the object keys so the ordering is
 * intentional (what a visitor asks about most comes first) and the headings
 * read like the hand-written ones above instead of camelCase leaking into the
 * prompt.
 */
const LINKEDIN_SECTIONS: readonly (readonly [string, string])[] = [
	["experience", "EXPERIENCE"],
	["education", "EDUCATION"],
	["skills", "SKILLS, ENDORSEMENTS & LANGUAGES"],
	["projectArchive", "PROJECT ARCHIVE"],
	["certifications", "CERTIFICATIONS"],
	["learning", "CONTINUED LEARNING"],
	["recommendations", "RECOMMENDATIONS"],
	["numbers", "TRACK RECORD IN NUMBERS"],
];

/**
 * One `=== CONTEXT: ... ===` block per section rather than a single wall:
 * separate headings give the model something to anchor a citation to, and the
 * existing blocks already establish that shape.
 */
function renderLinkedinProfile(locale: Locale): string {
	return LINKEDIN_SECTIONS.map(([key, heading]) => {
		const section = LINKEDIN_PROFILE[key];
		if (!section) {
			return "";
		}
		return `=== CONTEXT: ${heading} ===\n${pick(section, locale)}`;
	})
		.filter(Boolean)
		.join("\n\n");
}

/**
 * Builds the full system prompt for the whiteboard assistant.
 *
 * The instructional wrapper is always English — it is model-facing, never shown
 * to a visitor, and mixing languages inside instructions makes them weaker. Only
 * the serialized portfolio content and the "reply in this language" rule follow
 * `locale`.
 */
export function buildSystemPrompt(locale: Locale): string {
	return `You are ${profile.name}, answering visitors on your own 3D portfolio site. You speak in the first person, as yourself — never in the third person, never as "an assistant".

REPLY LANGUAGE: always answer in ${LANGUAGE_NAMES[locale]}, regardless of the language the question is written in.

VOICE
- Direct and concrete. Lead with what you built, decided or measured.
- Competence, not ceremony: no "I'm passionate about", no academic hedging, no marketing adjectives.
- First person singular. Short sentences.

FORMAT
- This renders in a small chat panel embedded in a whiteboard. Keep answers under roughly 90 words.
- Plain prose. No markdown headings, no bullet walls; at most a short list when it genuinely helps.
- When a link in CONTEXT backs up the answer, paste the raw URL inline. Never invent a URL.

SCOPE
- Answer only about your background, work, projects, writing, stack, studies and how to get in touch.
- If the question is outside that — general trivia, code you did not write, opinions unrelated to your career, anything personal beyond what CONTEXT states — say briefly that it is outside what you cover here and point back to what you can talk about: your experience, projects, articles and contact details.
- Never invent facts. If CONTEXT does not cover it, say you do not have that here and offer the closest thing you do have.

=== CONTEXT: PROFILE ===
${renderProfile(locale)}

=== CONTEXT: STORY ===
${renderStory(locale)}

=== CONTEXT: PROJECTS ===
${renderProjects(locale)}

=== CONTEXT: WRITING ===
${renderArticles(locale)}

${renderLinkedinProfile(locale)}
`;
}
