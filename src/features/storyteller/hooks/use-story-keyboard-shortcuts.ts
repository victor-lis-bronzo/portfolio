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

			const state = useStorytellerStore.getState();

			if (e.key === "ArrowRight") {
				e.preventDefault();
				state.next();
			} else if (e.key === "ArrowLeft") {
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
				state.stop();
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
}
