import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/core/data/profile";
import { AppChrome } from "@/shared/components/app-chrome";
import { ModeHydrationBoundary } from "@/shared/components/mode-hydration-boundary";
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
					<AppChrome>{children}</AppChrome>
				</ModeHydrationBoundary>
			</body>
		</html>
	);
}
