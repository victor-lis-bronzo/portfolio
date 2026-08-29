"use client";

import type { StorytellerStatus } from "@/core/state/storyteller-store";

export interface PlaybackControlsProps {
	status: StorytellerStatus;
	currentStepIndex: number;
	totalSteps: number;
	autoAdvance: boolean;
	onPlay: () => void;
	onPause: () => void;
	onNext: () => void;
	onPrev: () => void;
	onReset: () => void;
	onToggleAutoAdvance: () => void;
	className?: string;
}

export function PlaybackControls({
	status,
	currentStepIndex,
	totalSteps,
	autoAdvance,
	onPlay,
	onPause,
	onNext,
	onPrev,
	onReset,
	onToggleAutoAdvance,
	className = "",
}: PlaybackControlsProps) {
	const isPlaying = status === "PLAYING";
	const isEnded = status === "ENDED";
	const canPrev = currentStepIndex > 0;
	const canNext = currentStepIndex < totalSteps - 1;

	return (
		<div
			role="toolbar"
			aria-label="Controles de reprodução do Storyteller"
			className={`flex flex-wrap items-center justify-between gap-x-2 gap-y-2 rounded-2xl border border-border bg-card/90 backdrop-blur-md px-2.5 py-2 text-card-foreground sm:gap-x-3 sm:px-4 sm:py-2.5 ${className}`}
		>
			{/* Left side: Step counter & Auto-advance */}
			<div className="flex items-center gap-2 sm:gap-3">
				<span className="shrink-0 tabular-nums text-xs font-semibold text-foreground/80">
					{totalSteps > 0 ? (
						<>
							<span className="text-foreground">{currentStepIndex + 1}</span>
							<span className="text-foreground/50"> / {totalSteps}</span>
						</>
					) : (
						"—"
					)}
				</span>

				<button
					type="button"
					onClick={onToggleAutoAdvance}
					title={
						autoAdvance
							? "Avanço automático ativado (clique para desativar)"
							: "Avanço automático pausado (clique para ativar)"
					}
					aria-label={
						autoAdvance
							? "Desativar avanço automático"
							: "Ativar avanço automático"
					}
					aria-pressed={autoAdvance}
					className={`flex min-h-[2rem] min-w-[2rem] items-center justify-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-2.5 ${
						autoAdvance
							? "bg-primary/15 text-foreground ring-1 ring-border"
							: "bg-secondary text-foreground/60 hover:text-foreground"
					}`}
				>
					<span
						className={`h-1.5 w-1.5 shrink-0 rounded-full ${
							autoAdvance ? "bg-primary animate-pulse" : "bg-foreground/30"
						}`}
					/>
					{/* Label collapses to the indicator dot on narrow screens, but stays
					    in the accessibility tree (plus aria-label/title above). */}
					<span className="sr-only sm:not-sr-only">Auto</span>
				</button>
			</div>

			{/* Center: Main control buttons */}
			<div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
				{/* Previous */}
				<button
					type="button"
					onClick={onPrev}
					disabled={!canPrev}
					aria-label="Passo anterior"
					className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-foreground/80 transition-colors hover:bg-secondary/80 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<svg
						className="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Anterior</title>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>

				{/* Play / Pause / Replay */}
				<button
					type="button"
					onClick={isPlaying ? onPause : onPlay}
					aria-label={
						isEnded
							? "Reiniciar tour"
							: isPlaying
								? "Pausar tour"
								: "Tocar tour"
					}
					className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					{isEnded ? (
						<svg
							className="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<title>Reiniciar</title>
							<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
							<path d="M3 3v5h5" />
						</svg>
					) : isPlaying ? (
						<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
							<title>Pausar</title>
							<rect x="6" y="4" width="4" height="16" rx="1" />
							<rect x="14" y="4" width="4" height="16" rx="1" />
						</svg>
					) : (
						<svg
							className="h-4 w-4 ml-0.5"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<title>Tocar</title>
							<polygon points="5 3 19 12 5 21 5 3" />
						</svg>
					)}
				</button>

				{/* Next */}
				<button
					type="button"
					onClick={onNext}
					disabled={!canNext && !isEnded}
					aria-label="Próximo passo"
					className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-foreground/80 transition-colors hover:bg-secondary/80 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<svg
						className="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Próximo</title>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</button>
			</div>

			{/* Right: Exit / Stop button */}
			<button
				type="button"
				onClick={onReset}
				aria-label="Encerrar tour e voltar para visão geral"
				title="Sair do tour (Esc)"
				className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<svg
					className="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>Fechar</title>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>
	);
}
