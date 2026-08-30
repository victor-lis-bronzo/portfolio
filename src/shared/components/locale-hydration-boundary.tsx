"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/shared/state/locale-store";

/**
 * The server always renders the default locale (`en`), so the persisted choice
 * has to be applied after mount — otherwise the first paint would not match the
 * server HTML. Also keeps `<html lang>` in sync with the active locale, which
 * screen readers and translation tooling read off the document.
 */
export function LocaleHydrationBoundary({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		useLocaleStore.persist.rehydrate();
	}, []);

	useEffect(() => {
		const apply = (locale: string) => {
			document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
		};

		apply(useLocaleStore.getState().locale);

		return useLocaleStore.subscribe((state) => {
			apply(state.locale);
		});
	}, []);

	return <>{children}</>;
}
