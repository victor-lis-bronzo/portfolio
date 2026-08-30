"use client";

import { useStorytellerStore } from "@/core/state/storyteller-store";
import { useSceneFocusStore } from "@/features/scene-3d";
import { useEventsStore } from "../state/events-store";

export function EventsLauncher() {
	function handleClick() {
		void useSceneFocusStore.getState().focusWaypoint("EVENTS_BOARD");
		useStorytellerStore.getState().dismiss();
		useEventsStore.getState().open();
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label="Ver Eventos"
			title="Ver Eventos"
			className="flex min-h-11 items-center gap-2 rounded-l-xl border border-border border-r-0 bg-card/90 px-3 py-2 font-medium text-card-foreground text-xs backdrop-blur-md transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 pointer-events-auto"
		>
			<svg
				className="h-4 w-4 shrink-0 text-amber-500"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<title>Eventos</title>
				<rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
				<line x1="16" x2="16" y1="2" y2="6" />
				<line x1="8" x2="8" y1="2" y2="6" />
				<line x1="3" x2="21" y1="10" y2="10" />
				<path d="M8 14h.01" />
				<path d="M12 14h.01" />
				<path d="M16 14h.01" />
				<path d="M8 18h.01" />
				<path d="M12 18h.01" />
				<path d="M16 18h.01" />
			</svg>
			Eventos
		</button>
	);
}
