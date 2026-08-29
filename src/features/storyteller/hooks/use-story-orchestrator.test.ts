import { renderHook } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildStoryTimeline } from "@/core/entities/story-timeline";
import type {
	ICameraController,
	IDialogController,
	IWhiteboardDriver,
} from "@/core/interfaces";
import { useStorytellerStore } from "@/core/state/storyteller-store";
import { useStoryOrchestrator } from "./use-story-orchestrator";

const testTimeline = buildStoryTimeline({
	chapters: [
		{
			id: "ch1",
			title: "Capítulo 1",
			stepIds: ["s1", "s2"],
		},
	],
	steps: [
		{
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: "Primeiro passo",
			diagramElements: [
				{ id: "d1", type: "box", x: 10, y: 10, label: "Diag 1" },
			],
		},
		{
			id: "s2",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue: "Segundo passo",
			diagramElements: [
				{ id: "d2", type: "box", x: 20, y: 20, label: "Diag 2" },
			],
		},
	],
});

describe("useStoryOrchestrator", () => {
	let cameraController: ICameraController;
	let dialogController: IDialogController;
	let whiteboardDriver: IWhiteboardDriver;

	beforeEach(() => {
		vi.useFakeTimers();
		useStorytellerStore.getState().reset();
		useStorytellerStore.getState().setTotalSteps(testTimeline.totalSteps);

		cameraController = {
			focusWaypoint: vi.fn().mockResolvedValue(undefined),
			getCurrentWaypoint: vi.fn().mockReturnValue("OVERVIEW"),
			isTransitioning: vi.fn().mockReturnValue(false),
		};

		dialogController = {
			say: vi.fn(),
			clear: vi.fn(),
		};

		whiteboardDriver = {
			render: vi.fn(),
			clear: vi.fn(),
		};
	});

	it("says dialogue immediately, moves camera, and renders whiteboard when starting tour", async () => {
		renderHook(() =>
			useStoryOrchestrator({
				cameraController,
				dialogController,
				whiteboardDriver,
				timeline: testTimeline,
			}),
		);

		act(() => {
			useStorytellerStore.getState().start(0);
		});

		// 1. Dialogue emitted immediately
		expect(dialogController.say).toHaveBeenCalledWith("Primeiro passo");
		expect(cameraController.focusWaypoint).toHaveBeenCalledWith("OVERVIEW");

		// 2. Wait for camera promise resolution
		await act(async () => {
			await Promise.resolve();
		});

		// 3. Whiteboard renders diagram
		expect(whiteboardDriver.render).toHaveBeenCalledWith([
			expect.objectContaining({ id: "d1" }),
		]);
	});

	it("guards against race conditions (Epoch Guard) when user advances during in-flight camera transition", async () => {
		let resolveStep0Camera: () => void = () => {};
		const step0Promise = new Promise<void>((res) => {
			resolveStep0Camera = res;
		});

		let resolveStep1Camera: () => void = () => {};
		const step1Promise = new Promise<void>((res) => {
			resolveStep1Camera = res;
		});

		vi.mocked(cameraController.focusWaypoint).mockImplementation((waypoint) => {
			if (waypoint === "OVERVIEW") {
				return step0Promise;
			}
			return step1Promise;
		});

		renderHook(() =>
			useStoryOrchestrator({
				cameraController,
				dialogController,
				whiteboardDriver,
				timeline: testTimeline,
			}),
		);

		// Start step 0
		act(() => {
			useStorytellerStore.getState().start(0);
		});

		expect(dialogController.say).toHaveBeenCalledWith("Primeiro passo");

		// User clicks next while camera is still flying for step 0
		act(() => {
			useStorytellerStore.getState().next();
		});

		expect(dialogController.say).toHaveBeenCalledWith("Segundo passo");

		// Now step 0 camera finishes AFTER step 1 was triggered
		await act(async () => {
			resolveStep0Camera();
			await Promise.resolve();
		});

		// Whiteboard must NOT have rendered step 0's diagram (d1)
		expect(whiteboardDriver.render).not.toHaveBeenCalledWith([
			expect.objectContaining({ id: "d1" }),
		]);

		// Now resolve step 1 camera
		await act(async () => {
			resolveStep1Camera();
			await Promise.resolve();
		});

		// Whiteboard renders step 1's diagram (d2)
		expect(whiteboardDriver.render).toHaveBeenCalledWith([
			expect.objectContaining({ id: "d2" }),
		]);
	});
});
