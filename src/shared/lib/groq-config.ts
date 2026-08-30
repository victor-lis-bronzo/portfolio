/**
 * Server-only Groq settings. `GROQ_API_KEY` deliberately has no `NEXT_PUBLIC_`
 * prefix, so Next.js never inlines it into a client bundle — the key is read
 * inside the `/api/chat` route handler and nowhere else.
 */

export const GROQ_CHAT_COMPLETIONS_URL =
	"https://api.groq.com/openai/v1/chat/completions";

/** Groq's current free-tier general-purpose model. */
export const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

/**
 * Read at request time, not at import time: a missing key must surface as a 500
 * from the route, never as a build/import crash on a machine without `.env.local`.
 */
export function getGroqApiKey(): string | undefined {
	return process.env.GROQ_API_KEY;
}
