import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_MODE, useModeStore } from "@/core/state/mode-store";
import { ModeSwitcher } from "./mode-switcher";

vi.mock("next/navigation", () => ({
	usePathname: vi.fn(),
	useRouter: vi.fn(),
}));

describe("ModeSwitcher", () => {
	const pushMock = vi.fn();

	beforeEach(() => {
		useModeStore.setState({ mode: DEFAULT_MODE });
		pushMock.mockReset();
		vi.mocked(useRouter).mockReturnValue({
			push: pushMock,
		} as unknown as ReturnType<typeof useRouter>);
		vi.mocked(usePathname).mockReturnValue("/");
	});

	it('renders the "Imersivo" tab as selected on initial render', () => {
		render(<ModeSwitcher />);
		const immersiveTab = screen.getByRole("tab", { name: "Imersivo" });
		expect(immersiveTab).toHaveAttribute("aria-selected", "true");
	});

	it('renders the "Recrutador" tab as selected when pathname is "/recruiter"', () => {
		vi.mocked(usePathname).mockReturnValue("/recruiter");
		render(<ModeSwitcher />);
		const recruiterTab = screen.getByRole("tab", { name: "Recrutador" });
		expect(recruiterTab).toHaveAttribute("aria-selected", "true");
	});

	it('updates the store and navigates to "/recruiter" when the "Recrutador" tab is clicked', async () => {
		const user = userEvent.setup();
		render(<ModeSwitcher />);

		const recruiterTab = screen.getByRole("tab", { name: "Recrutador" });
		await user.click(recruiterTab);

		expect(useModeStore.getState().mode).toBe("RECRUITER");
		expect(pushMock).toHaveBeenCalledWith("/recruiter");
	});

	it('navigates to "/" when the "Imersivo" tab is clicked from "/recruiter"', async () => {
		vi.mocked(usePathname).mockReturnValue("/recruiter");
		const user = userEvent.setup();
		render(<ModeSwitcher />);

		const immersiveTab = screen.getByRole("tab", { name: "Imersivo" });
		await user.click(immersiveTab);

		expect(pushMock).toHaveBeenCalledWith("/");
	});
});
