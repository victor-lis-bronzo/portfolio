import type { Locale } from "@/shared/i18n/types";

/**
 * The whiteboard assistant's port. The store depends on this contract, never on
 * `fetch` or on Groq — same inversion the storyteller uses for the camera, the
 * dialogue box and the whiteboard, so tests can swap in a stub and the transport
 * can change without touching UI state.
 */
export interface IAssistantClient {
	/** Answers `question` as Victor, in `locale`. Rejects when the call fails. */
	ask(question: string, locale: Locale): Promise<string>;
}
