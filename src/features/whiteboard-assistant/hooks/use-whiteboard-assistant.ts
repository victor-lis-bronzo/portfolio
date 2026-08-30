"use client";

import { useCallback, useMemo } from "react";
import type { IAssistantClient } from "@/core/interfaces/assistant-client";
import type { Locale } from "@/shared/i18n/types";
import { useLocaleStore } from "@/shared/state/locale-store";
import { useAssistantStore } from "../state/assistant-store";

export const CHAT_ENDPOINT = "/api/chat";

interface ChatResponseBody {
	answer?: string;
	error?: string;
}

/**
 * HTTP implementation of `IAssistantClient`. The Groq key never reaches here —
 * this only talks to our own route handler, which holds the credential.
 */
export const httpAssistantClient: IAssistantClient = {
	async ask(question: string, locale: Locale): Promise<string> {
		const response = await fetch(CHAT_ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ question, locale }),
		});

		const body = (await response.json().catch(() => ({}))) as ChatResponseBody;

		if (!response.ok || !body.answer) {
			throw new Error(body.error ?? `Request failed (${response.status})`);
		}

		return body.answer;
	},
};

export interface WhiteboardAssistant {
	question: string;
	answer: string;
	status: "idle" | "loading" | "error";
	error?: string;
	setQuestion: (question: string) => void;
	submit: () => void;
	reset: () => void;
}

/**
 * Adapts `IAssistantClient` to the assistant store, the same way
 * `useWhiteboardDriver` adapts `IWhiteboardDriver` to the whiteboard store.
 * `client` is injectable so tests and stories can bypass the network.
 */
export function useWhiteboardAssistant(
	client: IAssistantClient = httpAssistantClient,
): WhiteboardAssistant {
	const question = useAssistantStore((state) => state.question);
	const answer = useAssistantStore((state) => state.answer);
	const status = useAssistantStore((state) => state.status);
	const error = useAssistantStore((state) => state.error);
	const setQuestion = useAssistantStore((state) => state.setQuestion);
	const reset = useAssistantStore((state) => state.reset);

	// Read, don't subscribe: the locale is resolved when the question is sent, so
	// flipping the toggle mid-answer never re-fires the request.
	const submit = useCallback(() => {
		void useAssistantStore
			.getState()
			.ask(client, useLocaleStore.getState().locale);
	}, [client]);

	return useMemo(
		() => ({ question, answer, status, error, setQuestion, submit, reset }),
		[question, answer, status, error, setQuestion, submit, reset],
	);
}
