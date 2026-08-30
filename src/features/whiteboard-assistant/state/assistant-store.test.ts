import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IAssistantClient } from "@/core/interfaces/assistant-client";
import { useAssistantStore } from "./assistant-store";

function stubClient(impl: IAssistantClient["ask"]): IAssistantClient {
	return { ask: vi.fn(impl) };
}

describe("useAssistantStore", () => {
	beforeEach(() => {
		useAssistantStore.getState().reset();
	});

	it("starts idle with no question, answer or error", () => {
		const state = useAssistantStore.getState();
		expect(state.status).toBe("idle");
		expect(state.question).toBe("");
		expect(state.answer).toBe("");
		expect(state.error).toBeUndefined();
	});

	it("goes loading then idle with the answer on success", async () => {
		let resolve: (answer: string) => void = () => {};
		const client = stubClient(
			() =>
				new Promise<string>((r) => {
					resolve = r;
				}),
		);

		useAssistantStore.getState().setQuestion("What do you do at StarSeg?");
		const pending = useAssistantStore.getState().ask(client, "en");

		expect(useAssistantStore.getState().status).toBe("loading");

		resolve("I own the backend architecture.");
		await pending;

		expect(useAssistantStore.getState().status).toBe("idle");
		expect(useAssistantStore.getState().answer).toBe(
			"I own the backend architecture.",
		);
		expect(useAssistantStore.getState().error).toBeUndefined();
		expect(client.ask).toHaveBeenCalledWith("What do you do at StarSeg?", "en");
	});

	it("goes to error and keeps the message when the client rejects", async () => {
		const client = stubClient(async () => {
			throw new Error("rate limited");
		});

		useAssistantStore.getState().setQuestion("Tell me about Eco-Play");
		await useAssistantStore.getState().ask(client, "pt");

		expect(useAssistantStore.getState().status).toBe("error");
		expect(useAssistantStore.getState().error).toBe("rate limited");
		expect(useAssistantStore.getState().answer).toBe("");
	});

	it("trims the question and forwards the active locale", async () => {
		const client = stubClient(async () => "ok");

		useAssistantStore.getState().setQuestion("   Onde você estuda?   ");
		await useAssistantStore.getState().ask(client, "pt");

		expect(client.ask).toHaveBeenCalledWith("Onde você estuda?", "pt");
	});

	it("ignores a submit with a blank question", async () => {
		const client = stubClient(async () => "ok");

		useAssistantStore.getState().setQuestion("   ");
		await useAssistantStore.getState().ask(client, "en");

		expect(client.ask).not.toHaveBeenCalled();
		expect(useAssistantStore.getState().status).toBe("idle");
	});

	it("ignores a second submit while one is already in flight", async () => {
		let resolve: (answer: string) => void = () => {};
		const client = stubClient(
			() =>
				new Promise<string>((r) => {
					resolve = r;
				}),
		);

		useAssistantStore.getState().setQuestion("first");
		const pending = useAssistantStore.getState().ask(client, "en");
		await useAssistantStore.getState().ask(client, "en");

		expect(client.ask).toHaveBeenCalledTimes(1);

		resolve("done");
		await pending;
	});

	it("clears everything on reset and drops an in-flight answer", async () => {
		let resolve: (answer: string) => void = () => {};
		const client = stubClient(
			() =>
				new Promise<string>((r) => {
					resolve = r;
				}),
		);

		useAssistantStore.getState().setQuestion("anything");
		const pending = useAssistantStore.getState().ask(client, "en");

		useAssistantStore.getState().reset();
		resolve("late answer");
		await pending;

		expect(useAssistantStore.getState().status).toBe("idle");
		expect(useAssistantStore.getState().answer).toBe("");
		expect(useAssistantStore.getState().question).toBe("");
	});
});
