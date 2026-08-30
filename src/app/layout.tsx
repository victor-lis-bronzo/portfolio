import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/core/data/profile";
import { AppChrome } from "@/shared/components/app-chrome";
import { LocaleHydrationBoundary } from "@/shared/components/locale-hydration-boundary";
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
		default: `${profile.name} — ${profile.role.en}`,
		template: `%s | ${profile.name}`,
	},
	// Known limitation: metadata is built on the server, which has no access to
	// the client-side locale store, so it always reflects the default locale.
	// The i18n toggle is client-only by design (no route-based i18n).
	description: profile.summary.en,
	metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	// The immersive route is a full-bleed `h-dvh` 3D canvas; "cover" lets it
	// paint under the notch/home indicator. The header and overlay pull the
	// content back into the safe area via `env(safe-area-inset-*)` (globals.css).
	viewportFit: "cover",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		// `en` is the default locale; `LocaleHydrationBoundary` rewrites this
		// attribute on the client whenever the visitor switches to Portuguese.
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
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
