"use client";

import { useStorytellerStore } from "@/core/state/storyteller-store";
import {
	useSceneFocusStore,
	useWhiteboardViewStore,
} from "@/features/scene-3d";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

/**
 * Persistent shortcut that drops a visitor straight into the whiteboard's
 * assistant, skipping the guided story. Always available on the immersive
 * route, whether the story was never started, is playing, or was closed.
 *
 * Lives in the app chrome (outside the <Canvas>) and reaches the scene through
 * the two bridge stores, exactly like the storyteller overlay does.
 */
export function AskMeLauncher() {
	const ui = useUiStrings();

	function handleClick() {
		// Non-reactive `getState()`: this is a one-shot command, so there is
		// nothing to subscribe to — and `focusWaypoint` is swapped in at runtime
		// by the camera controller inside the Canvas.
		// Deliberately not awaited: the assistant should already be on the board
		// while the camera is still flying towards it.
		void useSceneFocusStore.getState().focusWaypoint("WHITEBOARD_FOCUS");
		useWhiteboardViewStore.getState().setView("assistant");
		// Free-navigation mode: clears the intro card (never-started visitor) and
		// the dialogue box + playback controls (mid-story visitor), so nothing
		// covers the board. The orchestrator clears the dialogue line itself on
		// the transition into IDLE.
		useStorytellerStore.getState().dismiss();
	}

	return (
		// Right edge, vertically centred: the only large region of the shell that
		// no other surface claims. The header (LocaleToggle/ModeSwitcher, z-40)
		// owns the top strip, and the storyteller overlay owns the whole bottom
		// row — dialogue box and playback controls centred, the resume affordance
		// left, the transcript toggle right. `z-40` puts it above that overlay
		// (z-30). The wrapper carries `px-safe` so the button clears a notch in
		// landscape without fighting its own horizontal padding.
		<div className="-translate-y-1/2 fixed top-1/2 right-0 z-40 px-safe">
			<button
				type="button"
				onClick={handleClick}
				aria-label={ui.askMeLauncherAriaLabel}
				title={ui.askMeLauncherAriaLabel}
				className="flex min-h-11 items-center gap-2 rounded-l-xl border border-border border-r-0 bg-card/90 px-3 py-2 font-medium text-card-foreground text-xs backdrop-blur-md transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4"
			>
				<svg
					className="h-4 w-4 shrink-0 text-primary"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>{ui.iconChat}</title>
					<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
				</svg>
				{ui.askMeLauncherLabel}
			</button>
		</div>
	);
}
