"use client";

import type { StoryTimeline } from "@/core/entities/story-timeline";
import { useStorytellerStore } from "@/core/state/storyteller-store";
import { ChapterChips } from "./chapter-chips";
import { DialogueBox } from "./dialogue-box";
import { PlaybackControls } from "./playback-controls";
import { StoryIntroCard } from "./story-intro-card";
import { StoryTranscript } from "./story-transcript";

export interface StorytellerOverlayProps {
	timeline: StoryTimeline;
	className?: string;
}

export function StorytellerOverlay({
	timeline,
	className = "",
}: StorytellerOverlayProps) {
	const status = useStorytellerStore((state) => state.status);
	const currentStepIndex = useStorytellerStore(
		(state) => state.currentStepIndex,
	);
	const autoAdvance = useStorytellerStore((state) => state.autoAdvance);

	const start = useStorytellerStore((state) => state.start);
	const pause = useStorytellerStore((state) => state.pause);
	const resume = useStorytellerStore((state) => state.resume);
	const stop = useStorytellerStore((state) => state.stop);
	const next = useStorytellerStore((state) => state.next);
	const prev = useStorytellerStore((state) => state.prev);
	const jumpToStep = useStorytellerStore((state) => state.jumpToStep);
	const setAutoAdvance = useStorytellerStore((state) => state.setAutoAdvance);

	const isIdle = status === "IDLE";
	const currentChapter = timeline.getChapterForStepIndex(currentStepIndex);
	const currentChapterIndex =
		timeline.getChapterIndexForStepIndex(currentStepIndex);

	const stepInfo =
		timeline.totalSteps > 0
			? `Passo ${currentStepIndex + 1} de ${timeline.totalSteps} • Cap. ${
					currentChapterIndex + 1
				} de ${timeline.totalChapters}`
			: undefined;

	return (
		<aside
			aria-label="Interface do Storyteller"
			className={`pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-4 md:p-6 ${className}`}
		>
			{/* --- TOP BAR: Chapter Chips --- */}
			<div className="pointer-events-auto flex w-full max-w-4xl mx-auto items-center justify-center">
				<ChapterChips
					chapters={timeline.chapters}
					activeChapterId={isIdle ? undefined : currentChapter?.id}
					onSelectChapter={(chapterId) => {
						const firstStep = timeline.getFirstStepIndexOfChapter(chapterId);
						if (firstStep >= 0) {
							if (isIdle) {
								start(firstStep);
							} else {
								jumpToStep(firstStep);
							}
						}
					}}
				/>
			</div>

			{/* --- CENTER AREA: Intro Card (when IDLE) --- */}
			{isIdle && (
				<div className="pointer-events-auto my-auto flex w-full items-center justify-center">
					<StoryIntroCard
						onStartTour={() => start(0)}
						className="w-full max-w-lg"
					/>
				</div>
			)}

			{/* --- BOTTOM AREA: Dialogue Box + Playback Controls + Transcript --- */}
			<div className="flex w-full flex-col gap-3">
				{/* When not idle: Dialogue box & playback controls */}
				{!isIdle && (
					<div className="pointer-events-auto mx-auto flex w-full max-w-3xl flex-col gap-3">
						<DialogueBox
							chapterTitle={currentChapter?.title}
							stepInfo={stepInfo}
						/>

						<PlaybackControls
							status={status}
							currentStepIndex={currentStepIndex}
							totalSteps={timeline.totalSteps}
							autoAdvance={autoAdvance}
							onPlay={resume}
							onPause={pause}
							onNext={next}
							onPrev={prev}
							onReset={stop}
							onToggleAutoAdvance={() => setAutoAdvance(!autoAdvance)}
						/>
					</div>
				)}

				{/* Floating Transcript Toggle (Always accessible) */}
				<div className="pointer-events-auto flex justify-end">
					<StoryTranscript
						timeline={timeline}
						currentStepIndex={currentStepIndex}
						onJumpToStep={(stepIdx) => {
							if (isIdle) {
								start(stepIdx);
							} else {
								jumpToStep(stepIdx);
							}
						}}
					/>
				</div>
			</div>
		</aside>
	);
}
