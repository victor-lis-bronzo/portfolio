import { create } from "zustand";
import type { StoryCta } from "@/core/entities/story-script";
import type {
	DialogSayOptions,
	IDialogController,
} from "@/core/interfaces/dialog-controller";

export interface DialogueState {
	text: string;
	isTyping: boolean;
	cta?: StoryCta;
	say: (text: string, options?: DialogSayOptions) => void;
	setCta: (cta?: StoryCta) => void;
	clear: () => void;
}

export const useDialogueStore = create<DialogueState>((set) => ({
	text: "",
	isTyping: false,
	cta: undefined,

	say: (text: string, _options?: DialogSayOptions) => {
		set({
			text,
			isTyping: false,
		});
	},

	setCta: (cta?: StoryCta) => {
		set({ cta });
	},

	clear: () => {
		set({
			text: "",
			isTyping: false,
			cta: undefined,
		});
	},
}));

export const dialogueController: IDialogController = {
	say: (text: string, options?: DialogSayOptions) => {
		useDialogueStore.getState().say(text, options);
	},
	clear: () => {
		useDialogueStore.getState().clear();
	},
};
