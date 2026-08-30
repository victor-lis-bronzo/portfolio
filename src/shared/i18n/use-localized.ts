"use client";

import { useLocaleStore } from "@/shared/state/locale-store";
import type { Locale, Localized } from "./types";

/** Locale-agnostic resolver, for code that already holds a `Locale`. */
export function localize<T>(value: Localized<T>, locale: Locale): T;
export function localize<T>(
	value: Localized<T> | undefined,
	locale: Locale,
): T | undefined;
export function localize<T>(
	value: Localized<T> | undefined,
	locale: Locale,
): T | undefined {
	return value?.[locale];
}

/** Resolves one `Localized` value against the active locale. */
export function useLocalized<T>(value: Localized<T>): T;
export function useLocalized<T>(value: Localized<T> | undefined): T | undefined;
export function useLocalized<T>(
	value: Localized<T> | undefined,
): T | undefined {
	return useLocaleStore((state) => value?.[state.locale]);
}
