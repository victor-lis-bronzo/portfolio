import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Locale } from "@/shared/i18n/types";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "portfolio:locale";

interface LocaleState {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	toggleLocale: () => void;
	reset: () => void;
}

export const useLocaleStore = create<LocaleState>()(
	persist(
		(set) => ({
			locale: DEFAULT_LOCALE,
			setLocale: (locale) => set({ locale }),
			toggleLocale: () =>
				set((state) => ({ locale: state.locale === "en" ? "pt" : "en" })),
			reset: () => set({ locale: DEFAULT_LOCALE }),
		}),
		{
			name: LOCALE_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			// Same contract as `mode-store`: the server always renders the default
			// locale, and the persisted choice is applied after mount so hydration
			// never mismatches.
			skipHydration: true,
		},
	),
);

/**
 * Reactive read of the active locale. Use this (instead of `useLocalized`) when
 * a component has to resolve several values at once — e.g. mapping over a list,
 * where a hook per item is not allowed.
 */
export function useLocale(): Locale {
	return useLocaleStore((state) => state.locale);
}
