import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/core/data/profile";
import { ModeHydrationBoundary } from "@/shared/components/mode-hydration-boundary";
import { ModeSwitcher } from "@/shared/components/mode-switcher";
import { SITE_URL } from "@/shared/lib/site-config";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: `${profile.name} — ${profile.role}`,
		template: `%s | ${profile.name}`,
	},
	description: profile.summary,
	metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="pt-BR"
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
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
