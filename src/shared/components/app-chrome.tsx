"use client";

import { usePathname } from "next/navigation";
import { ModeSwitcher } from "./mode-switcher";

export interface AppChromeProps {
	children: React.ReactNode;
}

export function AppChrome({ children }: AppChromeProps) {
	const pathname = usePathname();
	const isRecruiter = pathname === "/recruiter";

	if (isRecruiter) {
		return (
			<div className="flex min-h-dvh flex-col">
				<header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur">
					<span className="font-semibold">Victor Lis Bronzo</span>
					<ModeSwitcher />
				</header>
				<main className="flex-1">{children}</main>
			</div>
		);
	}

	return (
		<div className="relative h-dvh w-screen overflow-hidden">
			<header className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex items-center justify-between bg-none p-4 [&>*]:pointer-events-auto">
				<span className="font-semibold text-white">Victor Lis Bronzo</span>
				<ModeSwitcher />
			</header>
			<main className="h-full w-full">{children}</main>
		</div>
	);
}
