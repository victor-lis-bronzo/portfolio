"use client";

import type { Locale } from "@/shared/i18n/types";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";
import { useLocaleStore } from "@/shared/state/locale-store";

const OPTIONS: readonly Locale[] = ["en", "pt"];

/**
 * EN/PT switcher. Lives in the app header next to `ModeSwitcher`, so it is
 * reachable from both the immersive route and the recruiter route without
 * inventing a new floating control.
 */
export function LocaleToggle({ className = "" }: { className?: string }) {
	const locale = useLocaleStore((state) => state.locale);
	const setLocale = useLocaleStore((state) => state.setLocale);
	const ui = useUiStrings();

	const labels: Record<Locale, string> = {
		en: ui.localeEnglish,
		pt: ui.localePortuguese,
	};

	return (
		<fieldset
			aria-label={ui.localeToggleLabel}
			className={`inline-flex items-center gap-0.5 rounded-lg border border-border bg-card/90 p-0.5 backdrop-blur-md ${className}`}
		>
			{OPTIONS.map((option) => {
				const isActive = option === locale;
				return (
					<button
						key={option}
						type="button"
						lang={option}
						onClick={() => setLocale(option)}
						aria-pressed={isActive}
						className={`min-h-[1.75rem] rounded-md px-2 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-xs ${
							isActive
								? "bg-primary text-primary-foreground"
								: "text-foreground/60 hover:text-foreground"
						}`}
					>
						{labels[option]}
					</button>
				);
			})}
		</fieldset>
	);
}
