import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DialogueBubble } from "./dialogue-bubble";

describe("DialogueBubble", () => {
	it("renders the given text", () => {
		render(<DialogueBubble text="Olá, seja bem-vindo!" />);

		expect(screen.getByText("Olá, seja bem-vindo!")).toBeInTheDocument();
	});

	it("announces the text via a polite live region", () => {
		render(<DialogueBubble text="Primeira fala" />);

		const status = screen.getByRole("status");
		expect(status).toHaveAttribute("aria-live", "polite");
		expect(status).toHaveTextContent("Primeira fala");
	});

	it("updates the announced text when the text prop changes", async () => {
		const { rerender } = render(<DialogueBubble text="Primeira fala" />);

		rerender(<DialogueBubble text="Segunda fala" />);

		expect(await screen.findByText("Segunda fala")).toBeInTheDocument();
		expect(screen.queryByText("Primeira fala")).not.toBeInTheDocument();
	});
});
