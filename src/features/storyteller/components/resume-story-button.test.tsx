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
		render(<ResumeStoryButton progressLabel="Cap. 2 de 5" />);

		const button = screen.getByRole("button", {
			name: "Retomar a história — Cap. 2 de 5",
		});
		expect(button).toHaveAttribute("title", "Retomar a história — Cap. 2 de 5");
	});

	it("falls back to a plain label without progress", () => {
		render(<ResumeStoryButton />);
		expect(
			screen.getByRole("button", { name: "Retomar a história" }),
		).toBeInTheDocument();
	});

	it("resumes the narration on the preserved step", () => {
		useStorytellerStore.getState().start(3);
		useStorytellerStore.getState().stop();

		render(<ResumeStoryButton progressLabel="Cap. 2 de 5" />);
		fireEvent.click(screen.getByRole("button"));

		expect(useStorytellerStore.getState().status).toBe("PLAYING");
		expect(useStorytellerStore.getState().currentStepIndex).toBe(3);
	});
});
