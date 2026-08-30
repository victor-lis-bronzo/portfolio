"use client";

import { useStorytellerStore } from "@/core/state/storyteller-store";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

export interface ResumeStoryButtonProps {
	/**
	 * Human readable progress, already formatted (and localized) by the caller
	 * (e.g. `"Ch. 2 of 5"`). Surfaced in the accessible name and tooltip.
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
	const ui = useUiStrings();

	const label = progressLabel
		? `${ui.resumeStory} — ${progressLabel}`
		: ui.resumeStory;

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
				<title>{ui.iconResume}</title>
				<polygon points="5 3 19 12 5 21 5 3" />
			</svg>
			<span className="hidden sm:inline">{ui.resumeStory}</span>
			{progressLabel && (
				<span className="hidden text-foreground/60 sm:inline">
					{progressLabel}
				</span>
			)}
		</button>
	);
}
