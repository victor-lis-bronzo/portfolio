import { useEffect, useRef } from "react";
import type { StoryTimeline } from "@/core/entities/story-timeline";
import type {
	ICameraController,
	IDialogController,
	IWhiteboardDriver,
} from "@/core/interfaces";
import { calculateStepDwellMs, useStorytellerStore } from "@/core/state";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";
import { useDialogueStore } from "../state/dialogue-store";

export interface StoryOrchestratorParams {
	cameraController: ICameraController;
	dialogController: IDialogController;
	whiteboardDriver: IWhiteboardDriver;
	timeline: StoryTimeline;
}

export function useStoryOrchestrator({
	cameraController,
	dialogController,
	whiteboardDriver,
	timeline,
}: StoryOrchestratorParams) {
	const status = useStorytellerStore((state) => state.status);
	const currentStepIndex = useStorytellerStore(
		(state) => state.currentStepIndex,
	);
	const prefersReducedMotion = usePrefersReducedMotion();

	const runIdRef = useRef(0);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Sync timeline length with store
	useEffect(() => {
		useStorytellerStore.getState().setTotalSteps(timeline.totalSteps);
	}, [timeline.totalSteps]);

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}

		if (status === "IDLE") {
			dialogController.clear();
			return;
		}

		if (status === "PAUSED" || status === "ENDED") {
			return;
		}

		if (status === "PLAYING") {
			runIdRef.current += 1;
			const epoch = runIdRef.current;

			const step = timeline.getStep(currentStepIndex);
			if (!step) {
				return;
			}

			// 1. Emit dialogue immediately (while camera is still flying)
			dialogController.say(step.mascotDialogue);
			useDialogueStore.getState().setCta(step.cta);

			// 2. Fly camera to waypoint
			cameraController.focusWaypoint(step.waypoint).then(() => {
				// 3. Epoch Guard: discard if a newer transition was started while in flight
				if (runIdRef.current !== epoch) {
					return;
				}

				// 4. Render or clear whiteboard
				if (step.diagramElements && step.diagramElements.length > 0) {
					whiteboardDriver.render(step.diagramElements);
				} else {
					whiteboardDriver.clear();
				}

				// 5. Arm Dwell timer for auto-advancing
				const dwellMs = calculateStepDwellMs(step, { prefersReducedMotion });
				const isAutoAdvancing = useStorytellerStore.getState().autoAdvance;
				const currentStatus = useStorytellerStore.getState().status;

				if (isAutoAdvancing && currentStatus === "PLAYING") {
					timerRef.current = setTimeout(() => {
						if (runIdRef.current !== epoch) {
							return;
						}
						if (useStorytellerStore.getState().status === "PLAYING") {
							useStorytellerStore.getState().next();
						}
					}, dwellMs);
				}
			});
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [
		status,
		currentStepIndex,
		prefersReducedMotion,
		cameraController,
		dialogController,
		whiteboardDriver,
		timeline,
	]);
}
