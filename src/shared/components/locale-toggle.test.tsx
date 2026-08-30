import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { profile } from "@/core/data/profile";
import { HeroSection } from "@/features/recruiter/components/hero-section";
import { DEFAULT_LOCALE, useLocaleStore } from "@/shared/state/locale-store";
import { LocaleToggle } from "./locale-toggle";

describe("LocaleToggle", () => {
	beforeEach(() => {
		useLocaleStore.setState({ locale: DEFAULT_LOCALE });
	});

	it("marks the active locale as pressed and switches on click", () => {
		render(<LocaleToggle />);

		const en = screen.getByRole("button", { name: "EN" });
		const pt = screen.getByRole("button", { name: "PT" });

		expect(en).toHaveAttribute("aria-pressed", "true");
		expect(pt).toHaveAttribute("aria-pressed", "false");

		fireEvent.click(pt);

		expect(useLocaleStore.getState().locale).toBe("pt");
		expect(pt).toHaveAttribute("aria-pressed", "true");
		expect(en).toHaveAttribute("aria-pressed", "false");
	});

	it("switches the visible content of the rest of the app", () => {
		render(
			<>
				<LocaleToggle />
				<HeroSection profile={profile} />
			</>,
		);

		expect(screen.getByText(profile.role.en)).toBeInTheDocument();
		expect(screen.queryByText(profile.role.pt)).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "PT" }));

		expect(screen.getByText(profile.role.pt)).toBeInTheDocument();
		expect(screen.queryByText(profile.role.en)).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "EN" }));

		expect(screen.getByText(profile.role.en)).toBeInTheDocument();
	});
});
