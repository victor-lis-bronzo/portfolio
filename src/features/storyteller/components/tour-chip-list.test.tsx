import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { StoryScript } from "@/core/entities";
import { TourChipList } from "./tour-chip-list";

const scripts: StoryScript[] = [
	{
		id: "DEV_DESK_GIT_ASSETS",
		title: "Mesa do dev",
		subtitle: "Git e assets",
		steps: [],
	},
	{
		id: "IOT_BENCH_ECO_PLAY",
		title: "Bancada IoT",
		steps: [],
	},
];

describe("TourChipList", () => {
	it("renders one button per script with title and subtitle", () => {
		render(
			<TourChipList
				scripts={scripts}
				activeScriptId={null}
				onSelect={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole("button", { name: /mesa do dev/i }),
		).toBeInTheDocument();
		expect(screen.getByText("Git e assets")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /bancada iot/i }),
		).toBeInTheDocument();
	});

	it("marks the active script as pressed", () => {
		render(
			<TourChipList
				scripts={scripts}
				activeScriptId="IOT_BENCH_ECO_PLAY"
				onSelect={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole("button", { name: /bancada iot/i }),
		).toHaveAttribute("aria-pressed", "true");
		expect(
			screen.getByRole("button", { name: /mesa do dev/i }),
		).toHaveAttribute("aria-pressed", "false");
	});

	it("calls onSelect with the clicked script id", async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();

		render(
			<TourChipList
				scripts={scripts}
				activeScriptId={null}
				onSelect={onSelect}
			/>,
		);

		await user.click(screen.getByRole("button", { name: /bancada iot/i }));

		expect(onSelect).toHaveBeenCalledWith("IOT_BENCH_ECO_PLAY");
	});
});
