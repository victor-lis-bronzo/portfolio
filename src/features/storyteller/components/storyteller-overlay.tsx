"use client";

import type { StoryTimeline } from "@/core/entities/story-timeline";
import { useStorytellerStore } from "@/core/state/storyteller-store";
import { useSceneFocusStore } from "@/features/scene-3d";
import { ChapterChips } from "./chapter-chips";
import { DialogueBox } from "./dialogue-box";
import { PlaybackControls } from "./playback-controls";
import { ResumeStoryButton } from "./resume-story-button";
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
  const hasStarted = useStorytellerStore((state) => state.hasStarted);

  const start = useStorytellerStore((state) => state.start);
  const pause = useStorytellerStore((state) => state.pause);
  const resume = useStorytellerStore((state) => state.resume);
  const stop = useStorytellerStore((state) => state.stop);
  const next = useStorytellerStore((state) => state.next);
  const prev = useStorytellerStore((state) => state.prev);
  const jumpToStep = useStorytellerStore((state) => state.jumpToStep);
  const setAutoAdvance = useStorytellerStore((state) => state.setAutoAdvance);

  // Same bridge `StorytellerRuntime` uses to build its `ICameraController`:
  // lets the overlay move the camera without waking the narration back up.
  const focusWaypoint = useSceneFocusStore((state) => state.focusWaypoint);

  const isIdle = status === "IDLE";
  /** Story closed mid-way: scene is freely navigable, narration is dormant. */
  const isFreeMode = isIdle && hasStarted;
  /** First visit: nothing was ever played, so the intro card leads. */
  const showIntroCard = isIdle && !hasStarted;

  const currentChapter = timeline.getChapterForStepIndex(currentStepIndex);
  const currentChapterIndex =
    timeline.getChapterIndexForStepIndex(currentStepIndex);

  const chapterInfo =
    currentChapterIndex >= 0 && timeline.totalChapters > 0
      ? `Cap. ${currentChapterIndex + 1} de ${timeline.totalChapters}`
      : undefined;

  const stepInfo =
    timeline.totalSteps > 0
      ? `Passo ${currentStepIndex + 1} de ${timeline.totalSteps}${
          chapterInfo ? ` • ${chapterInfo}` : ""
        }`
      : undefined;

  return (
    <aside
      aria-label="Interface do Storyteller"
      // `--app-header-height` is owned by the app chrome; the fallback keeps
      // the chips clear of the fixed header even before it is defined.
      // `overflow-y-auto` + `shrink-0` children keep the regions from
      // colliding on short viewports (mobile landscape).
      className={`pointer-events-none absolute inset-0 z-30 flex flex-col justify-between gap-4 overflow-y-auto p-4 pt-[calc(var(--app-header-height,4rem)+1rem)] md:gap-6 md:p-6 md:pt-[calc(var(--app-header-height,4rem)+1.5rem)] ${className}`}
    >
      {/* --- TOP BAR: Chapter Chips --- */}
      <div className="pointer-events-auto mx-auto flex w-full max-w-4xl shrink-0 items-center justify-center lg:max-w-5xl">
        <ChapterChips
          chapters={timeline.chapters}
          activeChapterId={isIdle ? undefined : currentChapter?.id}
          onSelectChapter={(chapterId) => {
            const firstStep = timeline.getFirstStepIndexOfChapter(chapterId);
            if (firstStep < 0) {
              return;
            }

            if (!isIdle) {
              jumpToStep(firstStep);
              return;
            }

            if (!hasStarted) {
              start(firstStep);
              return;
            }

            // Free mode: fly the camera to the chapter without leaving IDLE,
            // so browsing the scene never reopens the narration.
            const waypoint =
              timeline.getChapter(chapterId)?.entryWaypoint ??
              timeline.getStep(firstStep)?.waypoint;
            if (waypoint) {
              void focusWaypoint(waypoint);
            }
          }}
        />
      </div>

      {/* --- CENTER AREA: Intro Card (first visit only) --- */}
      {showIntroCard && (
        <div className="pointer-events-auto my-auto flex w-full shrink-0 items-center justify-center">
          <StoryIntroCard
            onStartTour={() => start(0)}
            className="w-full max-w-lg"
          />
        </div>
      )}

      {/* --- BOTTOM AREA: Dialogue Box + Playback Controls + Transcript --- */}
      <div className="flex w-full shrink-0 flex-col gap-3">
        {/* When not idle: Dialogue box & playback controls */}
        {!isIdle && (
          <div className="pointer-events-auto mx-auto flex w-full flex-col gap-3 sm:max-w-2xl lg:max-w-3xl">
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

        {/* Left: resume affordance (free mode) — Right: transcript toggle */}
        <div className="flex w-full items-end justify-between gap-3">
          {isFreeMode && (
            <ResumeStoryButton
              className="pointer-events-auto"
              progressLabel={chapterInfo}
            />
          )}

          <div className="pointer-events-auto ml-auto">
            <StoryTranscript
              timeline={timeline}
              currentStepIndex={currentStepIndex}
              onJumpToStep={(stepIdx) => {
                // Picking a moment in the transcript is an explicit intent to
                // read the story, so it resumes narration even in free mode.
                if (isIdle) {
                  start(stepIdx);
                } else {
                  jumpToStep(stepIdx);
                }
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
