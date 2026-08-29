import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CopyEmailButton } from "./copy-email-button";

describe("CopyEmailButton", () => {
	it("copies the email to the clipboard and shows feedback", async () => {
		const user = userEvent.setup();
		const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText");

		render(<CopyEmailButton email="test@example.com" />);

		await user.click(screen.getByRole("button", { name: /copiar/i }));

		expect(writeTextSpy).toHaveBeenCalledWith("test@example.com");
		expect(await screen.findByText("Copiado!")).toBeInTheDocument();
	});
});
