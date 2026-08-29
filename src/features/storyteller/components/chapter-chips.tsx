"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StoryChapter } from "@/core/entities/story-script";

export interface ChapterChipsProps {
	chapters: StoryChapter[];
	activeChapterId?: string;
	onSelectChapter: (chapterId: string) => void;
	className?: string;
}

/**
 * `WheelEvent.deltaMode` is not always pixels: some mice report lines and a few
 * (rare) devices report pages. Normalize before touching `scrollLeft`.
 */
const DOM_DELTA_LINE = 1;
const DOM_DELTA_PAGE = 2;
const LINE_HEIGHT_PX = 16;
const PAGE_WIDTH_PX = 320;

/**
 * Multiplier applied to the normalized delta. A single notch of a typical mouse
 * wheel is 100px, which moves ~1.5 chips — enough to feel responsive without
 * overshooting the whole strip.
 */
const WHEEL_SPEED = 1.4;

/** Sub-pixel slack so a strip parked at an edge is still treated as "at the edge". */
const EDGE_EPSILON = 1;

/** Width of the fade hint painted over a scrollable edge. */
const FADE_WIDTH = "1.75rem";

function normalizeDelta(delta: number, deltaMode: number): number {
	if (deltaMode === DOM_DELTA_LINE) {
		return delta * LINE_HEIGHT_PX;
	}
	if (deltaMode === DOM_DELTA_PAGE) {
		return delta * PAGE_WIDTH_PX;
	}
	return delta;
}

function buildEdgeMask(
	fadeStart: boolean,
	fadeEnd: boolean,
): string | undefined {
	if (!fadeStart && !fadeEnd) {
		return undefined;
	}

	const stops = ["black 0", "black 100%"];

	if (fadeStart) {
		stops[0] = `transparent 0, black ${FADE_WIDTH}`;
	}
	if (fadeEnd) {
		stops[1] = `black calc(100% - ${FADE_WIDTH}), transparent 100%`;
	}

	return `linear-gradient(to right, ${stops.join(", ")})`;
}

export function ChapterChips({
	chapters,
	activeChapterId,
	onSelectChapter,
	className = "",
}: ChapterChipsProps) {
	const navRef = useRef<HTMLElement>(null);
	const [edges, setEdges] = useState({ start: false, end: false });

	const syncEdges = useCallback(() => {
		const node = navRef.current;
		if (!node) {
			return;
		}

		const maxScroll = node.scrollWidth - node.clientWidth;
		const start = maxScroll > EDGE_EPSILON && node.scrollLeft > EDGE_EPSILON;
		const end =
			maxScroll > EDGE_EPSILON && node.scrollLeft < maxScroll - EDGE_EPSILON;

		setEdges((prev) =>
			prev.start === start && prev.end === end ? prev : { start, end },
		);
	}, []);

	useEffect(() => {
		const node = navRef.current;
		if (!node) {
			return;
		}

		const handleWheel = (event: WheelEvent) => {
			// Ctrl + wheel is pinch-zoom on trackpads — never hijack it.
			if (event.ctrlKey) {
				return;
			}

			const deltaX = normalizeDelta(event.deltaX, event.deltaMode);
			const deltaY = normalizeDelta(event.deltaY, event.deltaMode);
			// A vertical wheel drives the strip; a horizontal trackpad swipe wins
			// whenever it is the dominant axis.
			const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
			if (delta === 0) {
				return;
			}

			const maxScroll = node.scrollWidth - node.clientWidth;
			if (maxScroll <= 0) {
				return;
			}

			const current = node.scrollLeft;
			const hasRoom =
				delta > 0 ? current < maxScroll - EDGE_EPSILON : current > EDGE_EPSILON;

			// Already parked at that end: let the event bubble so the page keeps
			// scrolling instead of the strip swallowing it.
			if (!hasRoom) {
				return;
			}

			event.preventDefault();
			node.scrollLeft = Math.min(
				maxScroll,
				Math.max(0, current + delta * WHEEL_SPEED),
			);
			syncEdges();
		};

		// React 19 registers `onWheel` passively on the root container, so
		// `preventDefault()` from a synthetic handler is a no-op. Register the
		// native listener explicitly with `passive: false`.
		node.addEventListener("wheel", handleWheel, { passive: false });
		node.addEventListener("scroll", syncEdges, { passive: true });

		let observer: ResizeObserver | undefined;
		if (typeof ResizeObserver !== "undefined") {
			observer = new ResizeObserver(syncEdges);
			observer.observe(node);
		}

		syncEdges();

		return () => {
			node.removeEventListener("wheel", handleWheel);
			node.removeEventListener("scroll", syncEdges);
			observer?.disconnect();
		};
	}, [syncEdges]);

	// Adding/removing chips changes `scrollWidth` without resizing the container,
	// which no observer reports. Two cheap layout reads per render cover it.
	useEffect(syncEdges);

	const maskImage = buildEdgeMask(edges.start, edges.end);

	return (
		<nav
			ref={navRef}
			aria-label="Navegação por capítulos da história"
			style={maskImage ? { maskImage, WebkitMaskImage: maskImage } : undefined}
			className={`flex w-full items-center gap-2 overflow-x-auto scrollbar-top scrollbar-themed px-1 pt-2.5 pb-1 lg:w-2/3 ${className}`}
		>
			{chapters.map((chapter, idx) => {
				const isActive = chapter.id === activeChapterId;

				return (
					<button
						key={chapter.id}
						type="button"
						onClick={() => onSelectChapter(chapter.id)}
						aria-pressed={isActive}
						aria-label={`Capítulo ${idx + 1}: ${chapter.title}`}
						className={`group flex min-h-[2rem] shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3.5 ${
							isActive
								? "bg-primary text-primary-foreground"
								: "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground"
						}`}
					>
						<span
							aria-hidden="true"
							className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
								isActive
									? "bg-primary-foreground/20 text-primary-foreground"
									: "bg-background/40 text-foreground/60 group-hover:text-foreground"
							}`}
						>
							{idx + 1}
						</span>
						<span aria-hidden="true">{chapter.title}</span>
					</button>
				);
			})}
		</nav>
	);
}
