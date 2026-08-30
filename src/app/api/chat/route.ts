import { buildSystemPrompt } from "@/core/data/assistant/system-prompt";
import type { Locale } from "@/shared/i18n/types";
import {
	GROQ_CHAT_COMPLETIONS_URL,
	GROQ_MODEL,
	getGroqApiKey,
} from "@/shared/lib/groq-config";

// Plain `Request`/`Response` instead of `next/server`: this handler needs
// nothing from `NextRequest`, and staying on the web platform types keeps it
// directly unit-testable without a Next runtime.
export const runtime = "nodejs";

/** Long enough for a real question, short enough that nobody pastes a novel into the prompt. */
export const MAX_QUESTION_LENGTH = 2000;

const ALLOWED_LOCALES: readonly Locale[] = ["en", "pt"];

interface ChatRequestBody {
	question: string;
	locale: Locale;
}

function badRequest(message: string): Response {
	return Response.json({ error: message }, { status: 400 });
}

function isLocale(value: unknown): value is Locale {
	return ALLOWED_LOCALES.includes(value as Locale);
}

function parseBody(payload: unknown): ChatRequestBody | { error: string } {
	if (typeof payload !== "object" || payload === null) {
		return { error: "Request body must be a JSON object." };
	}

	const { question, locale } = payload as Record<string, unknown>;

	if (typeof question !== "string") {
		return { error: "`question` must be a string." };
	}

	const trimmed = question.trim();
	if (trimmed.length === 0) {
		return { error: "`question` must not be empty." };
	}
	if (trimmed.length > MAX_QUESTION_LENGTH) {
		return {
			error: `\`question\` must be at most ${MAX_QUESTION_LENGTH} characters.`,
		};
	}
	if (!isLocale(locale)) {
		return { error: '`locale` must be either "en" or "pt".' };
	}

	return { question: trimmed, locale };
}

export async function POST(request: Request): Promise<Response> {
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return badRequest("Request body must be valid JSON.");
	}

	const parsed = parseBody(payload);
	if ("error" in parsed) {
		return badRequest(parsed.error);
	}

	const apiKey = getGroqApiKey();
	if (!apiKey) {
		return Response.json(
			{ error: "The assistant is not configured: GROQ_API_KEY is missing." },
			{ status: 500 },
		);
	}

	let upstream: Response;
	try {
		upstream = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: GROQ_MODEL,
				temperature: 0.4,
				max_tokens: 400,
				stream: false,
				messages: [
					{ role: "system", content: buildSystemPrompt(parsed.locale) },
					{ role: "user", content: parsed.question },
				],
			}),
		});
	} catch {
		// Never echo the thrown error: it can carry the outgoing request headers.
		return Response.json(
			{ error: "The assistant is unreachable right now. Try again shortly." },
			{ status: 503 },
		);
	}

	if (!upstream.ok) {
		// The upstream body can quote the request (key included), so only the
		// status is forwarded — the detail goes to the server log.
		console.error(`Groq request failed with status ${upstream.status}`);
		const status = upstream.status === 429 ? 503 : 502;
		return Response.json(
			{
				error:
					status === 503
						? "The assistant is rate-limited right now. Try again in a moment."
						: "The assistant could not answer right now. Try again shortly.",
			},
			{ status },
		);
	}

	const completion = (await upstream.json()) as {
		choices?: { message?: { content?: string } }[];
	};
	const answer = completion.choices?.[0]?.message?.content?.trim();

	if (!answer) {
		return Response.json(
			{ error: "The assistant returned an empty answer. Try rephrasing." },
			{ status: 502 },
		);
	}

	return Response.json({ answer });
}
