import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StoryControls } from "./story-controls";

describe("StoryControls", () => {
	it("renders the progress label", () => {
		render(
			<StoryControls
				stepIndex={1}
				totalSteps={4}
				isLastStep={false}
				onNext={vi.fn()}
				onClose={vi.fn()}
			/>,
		);

		expect(screen.getByText("2 / 4")).toBeInTheDocument();
	});

	it('shows "Próximo" and calls onNext when not the last step', async () => {
		const user = userEvent.setup();
		const onNext = vi.fn();

		render(
			<StoryControls
				stepIndex={0}
				totalSteps={3}
				isLastStep={false}
				onNext={onNext}
				onClose={vi.fn()}
			/>,
		);

		const nextButton = screen.getByRole("button", { name: /próximo/i });
		await user.click(nextButton);

		expect(onNext).toHaveBeenCalledTimes(1);
	});

	it('shows "Concluir" when isLastStep is true', () => {
		render(
			<StoryControls
				stepIndex={2}
				totalSteps={3}
				isLastStep={true}
				onNext={vi.fn()}
				onClose={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole("button", { name: /concluir/i }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: /^próximo$/i }),
		).not.toBeInTheDocument();
	});

	it("calls onClose when the close button is clicked", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();

		render(
			<StoryControls
				stepIndex={0}
				totalSteps={3}
				isLastStep={false}
				onNext={vi.fn()}
				onClose={onClose}
			/>,
		);

		await user.click(screen.getByRole("button", { name: /fechar/i }));

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
