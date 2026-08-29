import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { StoryChapter } from "@/core/entities/story-script";
import { ChapterChips } from "./chapter-chips";

const mockChapters: StoryChapter[] = [
	{ id: "ch-1", title: "Origens", stepIds: ["s1"] },
	{ id: "ch-2", title: "Etec", stepIds: ["s2"] },
	{ id: "ch-3", title: "IoT", stepIds: ["s3"] },
];

/**
 * jsdom never lays anything out, so `scrollWidth` / `clientWidth` are always 0
 * and `scrollLeft` is a no-op. Stub them as real own properties so the wheel
 * handler has a believable overflow to work against.
 */
function stubScrollMetrics(
	node: HTMLElement,
	{
		scrollWidth,
		clientWidth,
		scrollLeft = 0,
	}: { scrollWidth: number; clientWidth: number; scrollLeft?: number },
) {
	let current = scrollLeft;

	Object.defineProperties(node, {
		scrollWidth: { configurable: true, get: () => scrollWidth },
		clientWidth: { configurable: true, get: () => clientWidth },
		scrollLeft: {
			configurable: true,
			get: () => current,
			set: (value: number) => {
				current = value;
			},
		},
	});
}

function renderChips() {
	render(
		<ChapterChips
			chapters={mockChapters}
			activeChapterId="ch-1"
			onSelectChapter={vi.fn()}
		/>,
	);

	return screen.getByRole("navigation", {
		name: /Navegação por capítulos da história/i,
	});
}

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

	it("takes the full container width on mobile instead of a hardcoded 2/3", () => {
		const nav = renderChips();

		expect(nav.className).toContain("w-full");
		expect(nav.className).not.toMatch(/(^|\s)w-2\/3(\s|$)/);
	});

	describe("wheel scrolling", () => {
		it("turns a vertical wheel into horizontal scroll and swallows the event", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, { scrollWidth: 600, clientWidth: 300 });

			// `fireEvent` returns false when a listener called preventDefault().
			const notPrevented = fireEvent.wheel(nav, { deltaY: 100 });

			expect(notPrevented).toBe(false);
			expect(nav.scrollLeft).toBeGreaterThan(0);
		});

		it("scrolls backwards on a negative delta", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, {
				scrollWidth: 600,
				clientWidth: 300,
				scrollLeft: 200,
			});

			fireEvent.wheel(nav, { deltaY: -100 });

			expect(nav.scrollLeft).toBeLessThan(200);
		});

		it("follows a horizontal trackpad swipe when deltaX dominates", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, { scrollWidth: 600, clientWidth: 300 });

			fireEvent.wheel(nav, { deltaX: 80, deltaY: 5 });

			expect(nav.scrollLeft).toBeGreaterThan(0);
		});

		it("normalizes line-based deltas (deltaMode 1)", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, { scrollWidth: 600, clientWidth: 300 });

			fireEvent.wheel(nav, { deltaY: 3, deltaMode: 1 });

			// 3 lines * 16px * 1.4 speed — far more than the raw 3px it would be
			// if deltaMode were ignored.
			expect(nav.scrollLeft).toBeGreaterThan(20);
		});

		it("clamps at the end and lets the page keep the event", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, {
				scrollWidth: 600,
				clientWidth: 300,
				scrollLeft: 300,
			});

			const notPrevented = fireEvent.wheel(nav, { deltaY: 100 });

			expect(notPrevented).toBe(true);
			expect(nav.scrollLeft).toBe(300);
		});

		it("clamps at the start and lets the page keep the event", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, { scrollWidth: 600, clientWidth: 300 });

			const notPrevented = fireEvent.wheel(nav, { deltaY: -100 });

			expect(notPrevented).toBe(true);
			expect(nav.scrollLeft).toBe(0);
		});

		it("ignores the wheel when there is nothing to scroll", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, { scrollWidth: 300, clientWidth: 300 });

			const notPrevented = fireEvent.wheel(nav, { deltaY: 100 });

			expect(notPrevented).toBe(true);
			expect(nav.scrollLeft).toBe(0);
		});

		it("never hijacks ctrl+wheel (pinch zoom)", () => {
			const nav = renderChips();
			stubScrollMetrics(nav, { scrollWidth: 600, clientWidth: 300 });

			const notPrevented = fireEvent.wheel(nav, { deltaY: 100, ctrlKey: true });

			expect(notPrevented).toBe(true);
			expect(nav.scrollLeft).toBe(0);
		});
	});
});
