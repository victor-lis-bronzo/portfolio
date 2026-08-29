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

		// The "Auto" label is visually collapsed below `sm`, but must stay in the
		// DOM (and in the accessibility tree) rather than being removed.
		const autoLabel = screen.getByText("Auto");
		expect(autoLabel).toBeInTheDocument();
		expect(autoLabel.className).toContain("sr-only");
		expect(autoLabel.className).toContain("sm:not-sr-only");
	});

	it("keeps every touch target at 32px or larger", () => {
		render(
			<PlaybackControls
				status="PAUSED"
				currentStepIndex={0}
				totalSteps={5}
				autoAdvance={false}
				onPlay={vi.fn()}
				onPause={vi.fn()}
				onNext={vi.fn()}
				onPrev={vi.fn()}
				onReset={vi.fn()}
				onToggleAutoAdvance={vi.fn()}
			/>,
		);

		const exitBtn = screen.getByRole("button", {
			name: /Encerrar tour e voltar para visão geral/i,
		});
		expect(exitBtn.className).toContain("h-8");
		expect(exitBtn.className).toContain("w-8");

		const autoBtn = screen.getByRole("button", {
			name: /Ativar avanço automático/i,
		});
		expect(autoBtn.className).toContain("min-h-[2rem]");
		expect(autoBtn.className).toContain("min-w-[2rem]");
	});
});
