import { create } from "zustand";
import type { IAssistantClient } from "@/core/interfaces/assistant-client";
import type { Locale } from "@/shared/i18n/types";

export type AssistantStatus = "idle" | "loading" | "error";

export interface AssistantState {
	question: string;
	answer: string;
	status: AssistantStatus;
	error?: string;
	setQuestion: (question: string) => void;
	/**
	 * Sends the current question through the injected client. The client is a
	 * parameter rather than module state so the store stays free of transport
	 * concerns and tests can pass a stub in directly.
	 */
	ask: (client: IAssistantClient, locale: Locale) => Promise<void>;
	reset: () => void;
}

const INITIAL = {
	question: "",
	answer: "",
	status: "idle" as AssistantStatus,
	error: undefined,
};

/**
 * Guards against out-of-order answers: a visitor who submits again while the
 * first request is in flight must see the second answer, not whichever lands
 * last. Kept outside the store because it is bookkeeping, not rendered state.
 */
let currentRequestId = 0;

export const useAssistantStore = create<AssistantState>((set, get) => ({
	...INITIAL,

	setQuestion: (question) => set({ question }),

	ask: async (client, locale) => {
		const question = get().question.trim();
		if (question.length === 0 || get().status === "loading") {
			return;
		}

		currentRequestId += 1;
		const requestId = currentRequestId;
		set({ status: "loading", error: undefined, answer: "" });

		try {
			const answer = await client.ask(question, locale);
			if (requestId !== currentRequestId) {
				return;
			}
			set({ status: "idle", answer, error: undefined });
		} catch (cause) {
			if (requestId !== currentRequestId) {
				return;
			}
			set({
				status: "error",
				answer: "",
				error: cause instanceof Error ? cause.message : String(cause),
			});
		}
	},

	reset: () => {
		currentRequestId += 1;
		set({ ...INITIAL });
	},
}));
