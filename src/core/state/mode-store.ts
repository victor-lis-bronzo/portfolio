import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Mode = "IMMERSIVE" | "RECRUITER";

export const DEFAULT_MODE: Mode = "IMMERSIVE";
export const MODE_STORAGE_KEY = "portfolio:mode";

interface ModeState {
	mode: Mode;
	setMode: (mode: Mode) => void;
	toggleMode: () => void;
	reset: () => void;
}

export const useModeStore = create<ModeState>()(
	persist(
		(set) => ({
			mode: DEFAULT_MODE,
			setMode: (mode) => set({ mode }),
			toggleMode: () =>
				set((state) => ({
					mode: state.mode === "IMMERSIVE" ? "RECRUITER" : "IMMERSIVE",
				})),
			reset: () => set({ mode: DEFAULT_MODE }),
		}),
		{
			name: MODE_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			skipHydration: true,
		},
	),
);
