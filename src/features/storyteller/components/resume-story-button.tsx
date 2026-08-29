"use client";

import { useStorytellerStore } from "@/core/state/storyteller-store";

export interface ResumeStoryButtonProps {
	/**
	 * Human readable progress, already formatted by the caller
	 * (e.g. `"Cap. 2 de 5"`). Surfaced in the accessible name and tooltip.
	 */
	progressLabel?: string;
	className?: string;
}

/**
 * Discreet affordance shown while the story is closed but half-told
 * (free-navigation mode): picks the narration back up on the exact step it
 * was left at, via the store's `resume()`.
 */
export function ResumeStoryButton({
	progressLabel,
	className = "",
}: ResumeStoryButtonProps) {
	const resume = useStorytellerStore((state) => state.resume);

	const label = progressLabel
		? `Retomar a história — ${progressLabel}`
		: "Retomar a história";

	return (
		<button
			type="button"
			onClick={resume}
			aria-label={label}
			title={label}
			className={`flex items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-2 text-xs font-medium text-card-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3.5 ${className}`}
		>
			<svg
				className="h-4 w-4 shrink-0 text-primary"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<title>Retomar</title>
				<polygon points="5 3 19 12 5 21 5 3" />
			</svg>
			<span className="hidden sm:inline">Retomar a história</span>
			{progressLabel && (
				<span className="hidden text-foreground/60 sm:inline">
					{progressLabel}
				</span>
			)}
		</button>
	);
}
