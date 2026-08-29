import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlaybackControls } from "./playback-controls";

describe("PlaybackControls", () => {
	it("renders step count and buttons", () => {
		const onNext = vi.fn();
		const onPrev = vi.fn();
		const onPlay = vi.fn();
		const onPause = vi.fn();
		const onReset = vi.fn();
		const onToggleAutoAdvance = vi.fn();

		render(
			<PlaybackControls
				status="PLAYING"
				currentStepIndex={2}
				totalSteps={10}
				autoAdvance={true}
				onPlay={onPlay}
				onPause={onPause}
				onNext={onNext}
				onPrev={onPrev}
				onReset={onReset}
				onToggleAutoAdvance={onToggleAutoAdvance}
			/>,
		);

		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("/ 10")).toBeInTheDocument();

		const nextBtn = screen.getByRole("button", { name: /Próximo passo/i });
		fireEvent.click(nextBtn);
		expect(onNext).toHaveBeenCalledTimes(1);

		const prevBtn = screen.getByRole("button", { name: /Passo anterior/i });
		fireEvent.click(prevBtn);
		expect(onPrev).toHaveBeenCalledTimes(1);

		const pauseBtn = screen.getByRole("button", { name: /Pausar tour/i });
		fireEvent.click(pauseBtn);
		expect(onPause).toHaveBeenCalledTimes(1);

		const autoBtn = screen.getByRole("button", {
			name: /Desativar avanço automático/i,
		});
		fireEvent.click(autoBtn);
		expect(onToggleAutoAdvance).toHaveBeenCalledTimes(1);
	});
});
