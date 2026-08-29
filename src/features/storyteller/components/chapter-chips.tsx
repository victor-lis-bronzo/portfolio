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
			className={`flex w-full items-center gap-2 overflow-x-auto p-1 scrollbar-none ${className}`}
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
						className={`group flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
							isActive
								? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/20 ring-1 ring-white/30"
								: "bg-slate-900/80 text-slate-300 ring-1 ring-white/10 hover:bg-slate-800 hover:text-white"
						}`}
					>
						<span
							aria-hidden="true"
							className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
								isActive
									? "bg-white/20 text-white"
									: "bg-white/5 text-slate-400 group-hover:text-slate-200"
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
