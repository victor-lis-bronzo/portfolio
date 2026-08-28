import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useDialogueStore } from "../state/dialogue-store";
import { DialogueBox } from "./dialogue-box";

describe("DialogueBox", () => {
	beforeEach(() => {
		useDialogueStore.getState().clear();
	});

	it("renders nothing when dialogue text is empty", () => {
		const { container } = render(<DialogueBox />);
		expect(container.firstChild).toBeNull();
	});

	it("renders dialogue text inside an accessible live region", () => {
		useDialogueStore.getState().say("Olá! Bem-vindo ao estúdio.");
		render(
			<DialogueBox
				chapterTitle="Capítulo 1: Origens"
				stepInfo="Passo 1 de 16"
			/>,
		);

		const statusRegion = screen.getByRole("status");
		expect(statusRegion).toBeInTheDocument();
		expect(statusRegion).toHaveTextContent("Olá! Bem-vindo ao estúdio.");
		expect(statusRegion).toHaveAttribute("aria-live", "polite");
		expect(statusRegion).toHaveAttribute("aria-atomic", "true");

		expect(screen.getByText("Capítulo 1: Origens")).toBeInTheDocument();
		expect(screen.getByText("Passo 1 de 16")).toBeInTheDocument();
	});

	it("renders CTA button when cta is provided", () => {
		useDialogueStore.getState().say("Conheça mais.");
		useDialogueStore
			.getState()
			.setCta({ label: "Ver Recrutador", href: "/recruiter" });

		render(<DialogueBox />);
		const ctaLink = screen.getByRole("link", { name: /Ver Recrutador/i });
		expect(ctaLink).toBeInTheDocument();
		expect(ctaLink).toHaveAttribute("href", "/recruiter");
	});
});
