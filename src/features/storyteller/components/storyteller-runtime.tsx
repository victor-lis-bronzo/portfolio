"use client";

import { useMemo } from "react";
import type { StoryTimeline } from "@/core/entities/story-timeline";
import type { ICameraController } from "@/core/interfaces";
import { useSceneFocusStore } from "@/features/scene-3d";
import { useWhiteboardDriver } from "@/features/whiteboard";
import { useStoryOrchestrator } from "../hooks/use-story-orchestrator";
import { dialogueController } from "../state/dialogue-store";

export interface StorytellerRuntimeProps {
	timeline: StoryTimeline;
}

export function StorytellerRuntime({ timeline }: StorytellerRuntimeProps) {
	const focusWaypoint = useSceneFocusStore((state) => state.focusWaypoint);
	const whiteboardDriver = useWhiteboardDriver();

	const cameraController: ICameraController = useMemo(
		() => ({
			focusWaypoint,
			getCurrentWaypoint: () => useSceneFocusStore.getState().currentWaypoint,
			isTransitioning: () => useSceneFocusStore.getState().isTransitioning,
		}),
		[focusWaypoint],
	);

	useStoryOrchestrator({
		cameraController,
		dialogController: dialogueController,
		whiteboardDriver,
		timeline,
	});

	return null;
}
