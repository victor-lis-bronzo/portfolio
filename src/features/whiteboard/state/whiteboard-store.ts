import { create } from "zustand";
import { D1_LEARNING_TRACK } from "@/core/data/story";
import type { DiagramElement } from "@/core/entities/diagram-element";

export interface WhiteboardState {
	elements: DiagramElement[];
	render: (elements: DiagramElement[]) => void;
	clear: () => void;
	reset: () => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
	elements: D1_LEARNING_TRACK,
	render: (elements) => set({ elements }),
	clear: () => set({ elements: [] }),
	reset: () => set({ elements: D1_LEARNING_TRACK }),
}));
