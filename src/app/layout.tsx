import type { Metadata } from "next";
import { ModeHydrationBoundary } from "@/shared/components/mode-hydration-boundary";
import { ModeSwitcher } from "@/shared/components/mode-switcher";
import "./globals.css";

export const metadata: Metadata = {
	title: "Victor Lis Bronzo — Portfolio",
	description: "Portfolio 3D & Whiteboard Assistant",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body>
				<ModeHydrationBoundary>
					<header className="flex items-center justify-between border-b p-4">
						<span className="font-semibold">Victor Lis Bronzo</span>
						<ModeSwitcher />
					</header>
					<main className="min-h-[calc(100vh-65px)]">{children}</main>
				</ModeHydrationBoundary>
			</body>
		</html>
	);
}
