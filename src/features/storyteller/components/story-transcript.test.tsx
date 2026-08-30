import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StoryScript } from "@/core/entities/story-script";
import { buildStoryTimeline } from "@/core/entities/story-timeline";
import { StoryTranscript } from "./story-transcript";

/** These cases assert structure, so both locales carry the same text. */
const both = (text: string) => ({ en: text, pt: text });

const script: StoryScript = {
	chapters: [
		{ id: "ch-1", title: both("Origens"), stepIds: ["s1", "s2"] },
		{ id: "ch-2", title: both("IoT"), stepIds: ["s3"] },
	],
	steps: [
		{
			id: "s1",
			waypoint: "OVERVIEW",
			mascotDialogue: both("Bem-vindo ao estúdio."),
		},
		{
			id: "s2",
			waypoint: "DESK",
			mascotDialogue: both("Aqui começa a lógica."),
		},
		{
			id: "s3",
			waypoint: "IOT_BENCH",
			mascotDialogue: both("Bancada de hardware."),
		},
	],
};

const timeline = buildStoryTimeline(script);

function renderTranscript(onJumpToStep = vi.fn()) {
	render(
		<StoryTranscript
			timeline={timeline}
			currentStepIndex={0}
			onJumpToStep={onJumpToStep}
		/>,
	);

	const toggle = screen.getByRole("button", { name: /Transcript \(text\)/i });
	return { toggle, onJumpToStep };
}

describe("StoryTranscript", () => {
	const windowListeners: Array<(event: KeyboardEvent) => void> = [];

	afterEach(() => {
		for (const listener of windowListeners.splice(0)) {
			window.removeEventListener("keydown", listener);
		}
	});

	it("keeps the panel collapsed until the toggle is pressed", () => {
		const { toggle } = renderTranscript();

		expect(toggle).toHaveAttribute("aria-expanded", "false");
		expect(toggle).toHaveAttribute("aria-controls", "story-transcript-panel");
		expect(document.getElementById("story-transcript-panel")).toBeNull();

		fireEvent.click(toggle);

		expect(toggle).toHaveAttribute("aria-expanded", "true");
		expect(document.getElementById("story-transcript-panel")).not.toBeNull();
	});

	it("jumps to the selected step and closes the panel", () => {
		const { toggle, onJumpToStep } = renderTranscript();
		fireEvent.click(toggle);

		fireEvent.click(
			screen.getByText("Bancada de hardware.").closest("button") as HTMLElement,
		);

		expect(onJumpToStep).toHaveBeenCalledWith(2);
		expect(document.getElementById("story-transcript-panel")).toBeNull();
	});

	it("closes on Escape without letting the global story shortcut see it", () => {
		const globalEscape = vi.fn();
		windowListeners.push(globalEscape);
		window.addEventListener("keydown", globalEscape);

		const { toggle } = renderTranscript();
		fireEvent.click(toggle);

		const panel = document.getElementById(
			"story-transcript-panel",
		) as HTMLElement;
		fireEvent.keyDown(panel, { key: "Escape" });

		expect(document.getElementById("story-transcript-panel")).toBeNull();
		expect(globalEscape).not.toHaveBeenCalled();
	});

	it("closes when pointing outside the widget", () => {
		const { toggle } = renderTranscript();
		fireEvent.click(toggle);

		fireEvent.pointerDown(document.body);

		expect(document.getElementById("story-transcript-panel")).toBeNull();
	});

	it("stays open when pointing inside the panel", () => {
		const { toggle } = renderTranscript();
		fireEvent.click(toggle);

		const panel = document.getElementById(
			"story-transcript-panel",
		) as HTMLElement;
		fireEvent.pointerDown(panel);

		expect(document.getElementById("story-transcript-panel")).not.toBeNull();
	});

	it("opens upward and themes its own scrollbar", () => {
		const { toggle } = renderTranscript();
		fireEvent.click(toggle);

		const panel = document.getElementById(
			"story-transcript-panel",
		) as HTMLElement;

		// Anchored above the toggle (desktop) instead of pushing the dialogue box.
		expect(panel.className).toContain("md:bottom-full");
		// Viewport-correct unit on mobile, not `vh`.
		expect(panel.className).not.toContain("70vh");

		const scroller = panel.querySelector(".overflow-y-auto");
		expect(scroller).not.toBeNull();
		expect(scroller?.className).toContain("scrollbar-themed");
	});
});
