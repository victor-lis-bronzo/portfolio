"use client";

import type { StoryChapter } from "@/core/entities/story-script";

export interface ChapterChipsProps {
	chapters: StoryChapter[];
	activeChapterId?: string;
	onSelectChapter: (chapterId: string) => void;
	className?: string;
}

export function ChapterChips({
	chapters,
	activeChapterId,
	onSelectChapter,
	className = "",
}: ChapterChipsProps) {
	return (
		<nav
			aria-label="Navegação por capítulos da história"
			className={`flex w-2/3 items-center gap-2 overflow-x-auto scrollbar-top scrollbar-themed pt-2.5 pb-1 px-1 ${className}`}
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
						className={`group flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
							isActive
								? "bg-primary text-primary-foreground"
								: "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground"
						}`}
					>
						<span
							aria-hidden="true"
							className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold ${
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
