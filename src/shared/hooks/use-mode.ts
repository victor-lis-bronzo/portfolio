"use client";
import { useModeStore } from "@/core/state/mode-store";

export function useMode() {
	const mode = useModeStore((s) => s.mode);
	const setMode = useModeStore((s) => s.setMode);
	const toggleMode = useModeStore((s) => s.toggleMode);
	return { mode, setMode, toggleMode };
}
