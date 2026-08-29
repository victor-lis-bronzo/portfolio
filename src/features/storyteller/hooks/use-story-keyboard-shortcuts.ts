"use client";

import { useEffect } from "react";
import { useStorytellerStore } from "@/core/state/storyteller-store";

export function useStoryKeyboardShortcuts() {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			// Don't intercept if user is typing in an input or using modifier keys
			const target = e.target as HTMLElement | null;
			if (
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.isContentEditable)
			) {
				return;
			}

			if (e.metaKey || e.ctrlKey || e.altKey) {
				return;
			}

			// The transcript panel owns its own Esc handling (and stops propagation
			// when focus is inside it); when focus lands elsewhere (e.g. the body),
			// bail out here too so the panel doesn't get outrun by a global shortcut.
			if (document.getElementById("story-transcript-panel")) {
				return;
			}

			const state = useStorytellerStore.getState();
			const isIdle = state.status === "IDLE";

			// Free-navigation mode (story closed mid-way): every playback shortcut
			// stays inert so the scene can be explored without accidentally
			// reopening the narration — that is the resume button's job.
			if (isIdle && state.hasStarted) {
				return;
			}

			if (e.key === "ArrowRight") {
				// Nothing to step through until the story is on screen.
				if (isIdle) {
					return;
				}
				e.preventDefault();
				state.next();
			} else if (e.key === "ArrowLeft") {
				if (isIdle) {
					return;
				}
				e.preventDefault();
				state.prev();
			} else if (e.key === " " || e.key === "k" || e.key === "K") {
				e.preventDefault();
				if (state.status === "PLAYING") {
					state.pause();
				} else {
					state.resume();
				}
			} else if (e.key === "Escape") {
				e.preventDefault();
				// Closes the story preserving the current step, matching the exit
				// button in the playback controls.
				state.stop();
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
}
