import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * One shared log so the *order* of the three commands is assertable: the view
 * has to flip before (or at least without waiting for) the camera flight, and
 * the storyteller must be dismissed so nothing covers the board.
 */
const calls: string[] = [];

const focusWaypoint = vi.fn(async (id: string) => {
	calls.push(`focusWaypoint:${id}`);
});
const setView = vi.fn((view: string) => {
	calls.push(`setView:${view}`);
});
const dismiss = vi.fn(() => {
	calls.push("dismiss");
});

vi.mock("@/features/scene-3d", () => ({
	useSceneFocusStore: { getState: () => ({ focusWaypoint }) },
	useWhiteboardViewStore: { getState: () => ({ setView }) },
}));

vi.mock("@/core/state/storyteller-store", () => ({
	useStorytellerStore: { getState: () => ({ dismiss }) },
}));

const { AskMeLauncher } = await import("./ask-me-launcher");

describe("AskMeLauncher", () => {
	beforeEach(() => {
		calls.length = 0;
		vi.clearAllMocks();
	});

	it("renders a persistent button labelled for the assistant", () => {
		render(<AskMeLauncher />);

		expect(
			screen.getByRole("button", {
				name: "Ask me a question on the whiteboard",
			}),
		).toBeInTheDocument();
	});

	it("flies the camera to the whiteboard and opens the assistant view", async () => {
		const user = userEvent.setup();
		render(<AskMeLauncher />);

		await user.click(screen.getByRole("button"));

		expect(focusWaypoint).toHaveBeenCalledWith("WHITEBOARD_FOCUS");
		expect(setView).toHaveBeenCalledWith("assistant");
		expect(dismiss).toHaveBeenCalledTimes(1);
	});

	it("switches the view without waiting for the camera flight to finish", async () => {
		const user = userEvent.setup();
		render(<AskMeLauncher />);

		await user.click(screen.getByRole("button"));

		expect(calls).toEqual([
			"focusWaypoint:WHITEBOARD_FOCUS",
			"setView:assistant",
			"dismiss",
		]);
	});
});
