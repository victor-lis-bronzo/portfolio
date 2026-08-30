import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useStorytellerStore } from "@/core/state/storyteller-store";
import { ResumeStoryButton } from "./resume-story-button";

describe("ResumeStoryButton", () => {
	beforeEach(() => {
		useStorytellerStore.getState().reset();
		useStorytellerStore.getState().setTotalSteps(5);
	});

	it("exposes the progress in its accessible name and tooltip", () => {
		render(<ResumeStoryButton progressLabel="Ch. 2 of 5" />);

		const button = screen.getByRole("button", {
			name: "Resume the story — Ch. 2 of 5",
		});
		expect(button).toHaveAttribute("title", "Resume the story — Ch. 2 of 5");
	});

	it("falls back to a plain label without progress", () => {
		render(<ResumeStoryButton />);
		expect(
			screen.getByRole("button", { name: "Resume the story" }),
		).toBeInTheDocument();
	});

	it("resumes the narration on the preserved step", () => {
		useStorytellerStore.getState().start(3);
		useStorytellerStore.getState().stop();

		render(<ResumeStoryButton progressLabel="Ch. 2 of 5" />);
		fireEvent.click(screen.getByRole("button"));

		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(3);
	});
});
