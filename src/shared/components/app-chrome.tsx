"use client";

import { usePathname } from "next/navigation";
import { AskMeLauncher } from "./ask-me-launcher";
import { EventsLauncher } from "@/features/events/components/events-launcher";
import { LocaleToggle } from "./locale-toggle";
import { ModeSwitcher } from "./mode-switcher";

export interface AppChromeProps {
	children: React.ReactNode;
}

export function AppChrome({ children }: AppChromeProps) {
	const pathname = usePathname();
	const isRecruiter = pathname === "/recruiter";

	if (isRecruiter) {
		return (
			<div className="flex min-h-dvh w-full flex-col">
				<header className="sticky top-0 z-40 h-(--app-header-height) border-b bg-background px-safe pt-safe">
					<div className="flex h-full w-full items-center justify-between gap-2 px-3 sm:px-4">
						<span className="min-w-0 truncate font-semibold text-sm sm:text-base">
							Victor Lis Bronzo
						</span>
						<div className="flex shrink-0 items-center gap-2">
							<LocaleToggle />
							<ModeSwitcher />
						</div>
					</div>
				</header>
				<main className="w-full flex-1">{children}</main>
			</div>
		);
	}

	return (
		// `w-full` (not `w-screen`/100vw, which counts the scrollbar gutter and
		// overflows horizontally) and `h-dvh` so the shell tracks the dynamic
		// viewport on mobile browsers. `overflow-hidden` lives here only: this is
		// the non-scrolling 3D viewport shell. Descendants that need to scroll
		// (the storyteller overlay) do so inside their own scroll container.
		<div className="relative h-dvh w-full overflow-hidden">
			{/*
			 * Fixed strip of exactly `--app-header-height` (globals.css). The
			 * storyteller overlay is `absolute inset-0` and offsets itself by the
			 * same variable, so the two never collide on narrow screens.
			 * pointer-events: the strip and its wrapper stay transparent to the
			 * pointer so the 3D scene behind it is still draggable; only the
			 * interactive leaves opt back in.
			 */}
			<header className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-(--app-header-height) bg-none px-safe pt-safe">
				<div className="flex h-full w-full items-center justify-between gap-2 px-3 sm:px-4 [&>*]:pointer-events-auto">
					<span className="min-w-0 truncate font-semibold text-white text-xs sm:text-base">
						Victor Lis Bronzo
					</span>
					<div className="flex shrink-0 items-center gap-2">
						<LocaleToggle />
						<ModeSwitcher />
					</div>
				</div>
			</header>
			<main className="h-full w-full">{children}</main>
			{/*
			 * Immersive-only: it drives the 3D scene (camera + embedded whiteboard),
			 * which the recruiter route does not render. Sibling of <main> so it
			 * stays outside the <Canvas> and is never unmounted by the scene.
			 */}
			<div className="-translate-y-1/2 fixed top-1/2 right-0 z-40 px-safe flex flex-col gap-2 pointer-events-none">
				<AskMeLauncher />
				<EventsLauncher />
			</div>
		</div>
	);
}
