import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { StoryChapter } from "@/core/entities/story-script";
import { ChapterChips } from "./chapter-chips";

const mockChapters: StoryChapter[] = [
	{ id: "ch-1", title: "Origens", stepIds: ["s1"] },
	{ id: "ch-2", title: "Etec", stepIds: ["s2"] },
	{ id: "ch-3", title: "IoT", stepIds: ["s3"] },
];

describe("ChapterChips", () => {
	it("renders all chapter buttons and highlights the active one", () => {
		const onSelectChapter = vi.fn();

		render(
			<ChapterChips
				chapters={mockChapters}
				activeChapterId="ch-2"
				onSelectChapter={onSelectChapter}
			/>,
		);

		const chip1 = screen.getByRole("button", { name: /Capítulo 1: Origens/i });
		const chip2 = screen.getByRole("button", { name: /Capítulo 2: Etec/i });
		const chip3 = screen.getByRole("button", { name: /Capítulo 3: IoT/i });

		expect(chip1).toBeInTheDocument();
		expect(chip2).toBeInTheDocument();
		expect(chip3).toBeInTheDocument();

		expect(chip2).toHaveAttribute("aria-pressed", "true");
		expect(chip1).toHaveAttribute("aria-pressed", "false");

		fireEvent.click(chip3);
		expect(onSelectChapter).toHaveBeenCalledWith("ch-3");
	});
});
