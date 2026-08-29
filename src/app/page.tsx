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

export default function Home() {
	const timeline = useMemo(
		() => buildStoryTimeline(BIOGRAPHICAL_STORY_SCRIPT),
		[],
	);

	useStoryKeyboardShortcuts();

	return (
		<main className="relative h-screen w-screen overflow-hidden bg-slate-950">
			{/* Accessible Hidden Main Heading */}
			<h1 className="sr-only">
				Victor Lis Bronzo — Portfólio & Storyteller Interativo 3D
			</h1>

			{/* 3D Voxel Studio Scene (aria-hidden so screen readers consume the narration & transcript) */}
			<div aria-hidden="true" className="h-full w-full">
				<VoxelStudioLoader />
			</div>

			{/* Storyteller Headless Runtime Engine */}
			<StorytellerRuntime timeline={timeline} />

			{/* Storyteller UI Presentation Overlay */}
			<StorytellerOverlay timeline={timeline} />
		</main>
	);
}
