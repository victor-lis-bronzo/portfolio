import { create } from "zustand";
import type { StoryCta } from "@/core/entities/story-script";
import type {
	DialogSayOptions,
	IDialogController,
} from "@/core/interfaces/dialog-controller";
import type { Localized } from "@/shared/i18n/types";

export interface DialogueState {
	/** Both languages of the current phrase; `null` while nothing is being said. */
	text: Localized | null;
	isTyping: boolean;
	ctas: StoryCta[];
	say: (text: Localized, options?: DialogSayOptions) => void;
	setCtas: (ctas?: StoryCta[]) => void;
	clear: () => void;
}

export const useDialogueStore = create<DialogueState>((set) => ({
	text: null,
	isTyping: false,
	ctas: [],

	say: (text: Localized, _options?: DialogSayOptions) => {
		set({
			text,
			isTyping: false,
		});
	},

	setCtas: (ctas?: StoryCta[]) => {
		set({ ctas: ctas ?? [] });
	},

	clear: () => {
		set({
			text: null,
			isTyping: false,
			ctas: [],
		});
	},
}));

export const dialogueController: IDialogController = {
	say: (text: Localized, options?: DialogSayOptions) => {
		useDialogueStore.getState().say(text, options);
	},
	clear: () => {
		useDialogueStore.getState().clear();
	},
};
