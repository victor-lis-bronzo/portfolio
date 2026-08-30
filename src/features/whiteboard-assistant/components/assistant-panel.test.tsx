import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IAssistantClient } from "@/core/interfaces/assistant-client";
import { DEFAULT_LOCALE, useLocaleStore } from "@/shared/state/locale-store";
import { useAssistantStore } from "../state/assistant-store";
import { AssistantPanel } from "./assistant-panel";

describe("AssistantPanel", () => {
	beforeEach(() => {
		useAssistantStore.getState().reset();
		useLocaleStore.setState({ locale: DEFAULT_LOCALE });
	});

	it("labels the input and disables submit until there is a question", async () => {
		const user = userEvent.setup();
		const client: IAssistantClient = { ask: vi.fn(async () => "ok") };
		render(<AssistantPanel client={client} />);

		const input = screen.getByLabelText("Your question");
		const submit = screen.getByRole("button", { name: "Ask" });
		expect(submit).toBeDisabled();

		await user.type(input, "Hi");
		expect(submit).toBeEnabled();
	});

	it("sends the question with the active locale and renders the answer", async () => {
		const user = userEvent.setup();
		const client: IAssistantClient = {
			ask: vi.fn(async () => "I built Eco-Play in 2023."),
		};
		useLocaleStore.setState({ locale: "pt" });
		render(<AssistantPanel client={client} />);

		await user.type(screen.getByLabelText("Sua pergunta"), "Fale do Eco-Play");
		await user.click(screen.getByRole("button", { name: "Perguntar" }));

		await waitFor(() => {
			expect(screen.getByRole("status")).toHaveTextContent(
				"I built Eco-Play in 2023.",
			);
		});
		expect(client.ask).toHaveBeenCalledWith("Fale do Eco-Play", "pt");
	});

	it("submits on Enter", async () => {
		const user = userEvent.setup();
		const client: IAssistantClient = { ask: vi.fn(async () => "Answered.") };
		render(<AssistantPanel client={client} />);

		await user.type(
			screen.getByLabelText("Your question"),
			"Where do you work?{Enter}",
		);

		await waitFor(() => {
			expect(client.ask).toHaveBeenCalledWith("Where do you work?", "en");
		});
	});

	it("announces a localized error in an alert when the client fails", async () => {
		const user = userEvent.setup();
		const client: IAssistantClient = {
			ask: vi.fn(async () => {
				throw new Error("upstream exploded");
			}),
		};
		render(<AssistantPanel client={client} />);

		await user.type(screen.getByLabelText("Your question"), "anything{Enter}");

		const alert = await screen.findByRole("alert");
		expect(alert).toHaveTextContent(
			"That didn't go through. Try again in a moment.",
		);
		// The raw upstream message is English-only server detail — never surfaced.
		expect(alert).not.toHaveTextContent("upstream exploded");
	});

	it("clears the answer on reset", async () => {
		const user = userEvent.setup();
		const client: IAssistantClient = { ask: vi.fn(async () => "An answer.") };
		render(<AssistantPanel client={client} />);

		await user.type(screen.getByLabelText("Your question"), "question{Enter}");
		await screen.findByText("An answer.");

		await user.click(screen.getByRole("button", { name: "Clear" }));

		expect(screen.queryByText("An answer.")).not.toBeInTheDocument();
		expect(screen.getByLabelText("Your question")).toHaveValue("");
	});
});
