"use client";

import { useLocaleStore } from "@/shared/state/locale-store";
import { UI_STRINGS, type UiStrings } from "./ui-strings";

/** The chrome dictionary for the active locale. */
export function useUiStrings(): UiStrings {
	return useLocaleStore((state) => UI_STRINGS[state.locale]);
}
