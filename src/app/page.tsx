"use client";

import { useMemo } from "react";
import { BIOGRAPHICAL_STORY_SCRIPT } from "@/core/data/story";
import { buildStoryTimeline } from "@/core/entities/story-timeline";
import { VoxelStudioLoader } from "@/features/scene-3d";
import {
	StorytellerOverlay,
	StorytellerRuntime,
	useStoryKeyboardShortcuts,
} from "@/features/storyteller";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

export default function Home() {
	const ui = useUiStrings();
	const timeline = useMemo(
		() => buildStoryTimeline(BIOGRAPHICAL_STORY_SCRIPT),
		[],
	);

	useStoryKeyboardShortcuts();

	return (
		// Fills the AppChrome shell (`h-dvh w-full`) instead of re-declaring
		// `h-screen w-screen`: 100vh is taller than the dynamic viewport on mobile
		// Safari/Chrome, so nesting it inside an `overflow-hidden` h-dvh parent
		// clipped the bottom of the overlay with no way to scroll to it.
		// This is a <div>, not a <main>: AppChrome already renders the <main>
		// landmark around it.
		<div className="relative h-full w-full bg-background">
			{/* Accessible Hidden Main Heading */}
			<h1 className="sr-only">{ui.immersivePageHeading}</h1>

			{/* 3D Voxel Studio Scene (aria-hidden so screen readers consume the narration & transcript) */}
			{/* `overflow-hidden` is scoped to the canvas wrapper: the scene must never
			    scroll, but clipping the sibling overlay would make its content
			    unreachable on short viewports. */}
			<div aria-hidden="true" className="h-full w-full overflow-hidden">
				<VoxelStudioLoader />
			</div>

			{/* Storyteller Headless Runtime Engine */}
			<StorytellerRuntime timeline={timeline} />

			{/* Storyteller UI Presentation Overlay */}
			<StorytellerOverlay timeline={timeline} />
		</div>
	);
}
