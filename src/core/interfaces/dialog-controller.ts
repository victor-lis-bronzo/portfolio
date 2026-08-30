import type { Localized } from "@/shared/i18n/types";

export interface DialogSayOptions {
	animate?: boolean;
	durationMs?: number;
}

export interface IDialogController {
	/**
	 * Takes the phrase in both languages and hands it to the presentation layer
	 * untouched. Resolving it against the active locale is the dialogue box's
	 * job, so flipping the toggle re-renders the current line in place instead of
	 * restarting the step.
	 */
	say(text: Localized, options?: DialogSayOptions): void;
	clear(): void;
}
