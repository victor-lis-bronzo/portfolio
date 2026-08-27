"use client";

import { STORY_SCRIPTS } from "@/core/data/story-scripts";
import { useAutoplayPreference } from "../hooks/use-autoplay-preference";
import { useStoryteller } from "../hooks/use-storyteller";
import { DialogueBubble } from "./dialogue-bubble";
import { MascotAvatar } from "./mascot-avatar";
import { StoryControls } from "./story-controls";
import { TourChipList } from "./tour-chip-list";

/**
 * The storyteller's single container component: the only file in this feature
 * that touches the store. Everything it renders (MascotAvatar,
 * DialogueBubble, TourChipList, StoryControls) is a pure presentation
 * component driven by props, so each one stays testable in isolation.
 *
 * Mounted by app/page.tsx next to <VoxelStudioLoader />, deliberately not by
 * shared/components/app-chrome.tsx (shared must not depend on features) nor by
 * voxel-studio-loader.tsx (that would couple scene-3d to the storyteller
 * outside the scene-focus-store port). `/recruiter` is its own route and never
 * renders app/page.tsx, so no storyteller JS reaches that bundle.
 *
 * Layered under the AppChrome header (z-40) and under the dev-only
 * DevWaypointDebug (fixed right-4 bottom-4 z-50), which sits in the opposite
 * corner anyway.
 */
export function StorytellerOverlay() {
	useAutoplayPreference();

	const {
		activeScript,
		activeStep,
		stepIndex,
		totalSteps,
		isPlaying,
		isLastStep,
		play,
		next,
		stop,
	} = useStoryteller();

	const containerClassName =
		"fixed bottom-4 left-4 z-30 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-border/50 bg-background/80 p-3 shadow-md backdrop-blur-sm";

	if (activeScript === null) {
		return (
			<aside className={containerClassName} aria-label="Tours guiados">
				<TourChipList
					scripts={STORY_SCRIPTS}
					activeScriptId={null}
					onSelect={play}
				/>
			</aside>
		);
	}

	return (
		<aside className={containerClassName} aria-label={activeScript.title}>
			<div className="flex flex-col gap-3">
				<div className="flex items-end gap-3">
					<MascotAvatar
						isSpeaking={isPlaying}
						// Always animated: the reduced-motion preference is handled one
						// layer up, by useAutoplayPreference() -> the store's autoAdvance.
						animated
					/>
					<DialogueBubble text={activeStep?.speech ?? ""} />
				</div>
				<StoryControls
					stepIndex={stepIndex}
					totalSteps={totalSteps}
					isLastStep={isLastStep}
					onNext={next}
					onClose={stop}
				/>
			</div>
		</aside>
	);
}
