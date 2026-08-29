export interface DialogSayOptions {
	animate?: boolean;
	durationMs?: number;
}

export interface IDialogController {
	say(text: string, options?: DialogSayOptions): void;
	clear(): void;
}
