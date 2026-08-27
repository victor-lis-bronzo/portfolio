import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_MODE, useModeStore } from "@/core/state/mode-store";
import { ModeSwitcher } from "./mode-switcher";

describe("ModeSwitcher", () => {
	beforeEach(() => {
		useModeStore.setState({ mode: DEFAULT_MODE });
	});

	it('renders the "Imersivo" tab as selected on initial render', () => {
		render(<ModeSwitcher />);
		const immersiveTab = screen.getByRole("tab", { name: "Imersivo" });
		expect(immersiveTab).toHaveAttribute("aria-selected", "true");
	});

	it('updates the store to RECRUITER when the "Recrutador" tab is clicked', async () => {
		const user = userEvent.setup();
		render(<ModeSwitcher />);

		const recruiterTab = screen.getByRole("tab", { name: "Recrutador" });
		await user.click(recruiterTab);

		expect(useModeStore.getState().mode).toBe("RECRUITER");
	});
});
