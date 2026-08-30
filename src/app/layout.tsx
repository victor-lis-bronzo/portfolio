import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/core/data/profile";
import { AppChrome } from "@/shared/components/app-chrome";
import { LocaleHydrationBoundary } from "@/shared/components/locale-hydration-boundary";
import { ModeHydrationBoundary } from "@/shared/components/mode-hydration-boundary";
import { PortfolioJsonLd } from "@/shared/components/portfolio-json-ld";
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
		default: `${profile.name} - ${profile.role.en}`,
		template: `%s | ${profile.name}`,
	},
	description: profile.summary.en,
	metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<head>
				<PortfolioJsonLd />
			</head>
			<body>
				<ModeHydrationBoundary>
					<LocaleHydrationBoundary>
						<AppChrome>{children}</AppChrome>
					</LocaleHydrationBoundary>
				</ModeHydrationBoundary>
			</body>
		</html>
	);
}
