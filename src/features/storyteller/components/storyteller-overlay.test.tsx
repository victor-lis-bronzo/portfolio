import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	findStoryScript,
	IDLE_BOARD_DIAGRAM,
	STORY_SCRIPTS,
} from "@/core/data/story-scripts";
import { useWhiteboardStore } from "@/features/whiteboard/state/whiteboard-store";
import { useStorytellerStore } from "../state/storyteller-store";
import { StorytellerOverlay } from "./storyteller-overlay";

/**
 * Integration test on purpose: it drives the real storyteller/whiteboard
 * stores, not mocks of them, so the wiring between the container, the hooks
 * and the state machine is actually exercised.
 *
 * The only mock is the motion preference. `useAutoplayPreference()` reads it
 * and, with no preference, leaves `autoAdvance` on — a live setTimeout would
 * then advance steps out from under the assertions. Forcing "reduced motion"
 * keeps the tour strictly manual here (same mocking pattern as
 * use-autoplay-preference.test.tsx).
 *
 * `focusWaypoint` from scene-focus-store needs no mock: outside the R3F
 * <Canvas> nothing registers a real camera controller, so it stays the
 * store's default `noopFocusWaypoint` — an already-resolved async no-op.
 */
vi.mock("@/shared/hooks/use-prefers-reduced-motion", () => ({
	usePrefersReducedMotion: () => true,
}));

const SCRIPT_ID = "SOLID_ARCHITECTURE" as const;

const script = findStoryScript(SCRIPT_ID);
if (!script) {
	throw new Error("SOLID_ARCHITECTURE script is missing from STORY_SCRIPTS");
}
if (script.steps.length < 2) {
	throw new Error("This test needs a script with at least two steps");
}

function chipButton(title: string): HTMLElement {
	const label = screen.getByText(title);
	const button = label.closest("button");
	if (!button) {
		throw new Error(`No chip button found for "${title}"`);
	}
	return button;
}

describe("StorytellerOverlay", () => {
	beforeEach(() => {
		useStorytellerStore.setState({
			activeScriptId: null,
			stepIndex: 0,
			status: "IDLE",
			autoAdvance: false,
		});
		useWhiteboardStore.setState({
			elements: IDLE_BOARD_DIAGRAM,
			revision: 0,
		});
	});

	afterEach(() => {
		// Never let a tour (or its timers) leak into the next test.
		useStorytellerStore.getState().stop();
	});

	it("lists every story script as a clickable chip while idle", () => {
		render(<StorytellerOverlay />);

		for (const candidate of STORY_SCRIPTS) {
			expect(chipButton(candidate.title)).toBeInTheDocument();
		}
		expect(
			screen.queryByRole("img", { name: "Mascote" }),
		).not.toBeInTheDocument();
	});

	it("starts the tour on the first step when a chip is clicked", async () => {
		const user = userEvent.setup();
		render(<StorytellerOverlay />);

		await user.click(chipButton(script.title));

		expect(await screen.findByText(script.steps[0].speech)).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Mascote" })).toBeInTheDocument();
		expect(screen.getByText(`1 / ${script.steps.length}`)).toBeInTheDocument();
	});

	it("advances to the next step's speech", async () => {
		const user = userEvent.setup();
		render(<StorytellerOverlay />);

		await user.click(chipButton(script.title));
		await screen.findByText(script.steps[0].speech);

		await user.click(screen.getByRole("button", { name: "Próximo" }));

		expect(await screen.findByText(script.steps[1].speech)).toBeInTheDocument();
		expect(screen.getByText(`2 / ${script.steps.length}`)).toBeInTheDocument();
	});

	it("goes back to the idle chips when the tour is closed", async () => {
		const user = userEvent.setup();
		render(<StorytellerOverlay />);

		await user.click(chipButton(script.title));
		await screen.findByText(script.steps[0].speech);

		await user.click(screen.getByRole("button", { name: "Fechar" }));

		expect(await screen.findByText(STORY_SCRIPTS[0].title)).toBeInTheDocument();
		for (const candidate of STORY_SCRIPTS) {
			expect(chipButton(candidate.title)).toBeInTheDocument();
		}
		expect(screen.queryByText(script.steps[0].speech)).not.toBeInTheDocument();
	});
});
