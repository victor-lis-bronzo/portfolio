"use client";

import { useId } from "react";
import type { IAssistantClient } from "@/core/interfaces/assistant-client";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";
import { cn } from "@/shared/lib/utils";
import { useWhiteboardAssistant } from "../hooks/use-whiteboard-assistant";

export interface AssistantPanelProps {
	/** Injectable transport — defaults to the `/api/chat` client. */
	client?: IAssistantClient;
	className?: string;
}

/**
 * The chat surface drawn onto the whiteboard prop. It is deliberately plain DOM:
 * it lives inside drei's `<Html transform>` layer, so it is a normal, focusable,
 * screen-reader-visible form that merely happens to be projected onto a 3D board.
 */
export function AssistantPanel({ client, className }: AssistantPanelProps) {
	const ui = useUiStrings();
	const { question, answer, status, setQuestion, submit, reset } =
		useWhiteboardAssistant(client);
	const inputId = useId();

	const isLoading = status === "loading";
	const hasAnswer = answer.length > 0;

	return (
		<form
			className={cn(
				"flex h-full w-full flex-col gap-3 rounded-lg border border-border bg-card/90 p-4 text-foreground",
				className,
			)}
			onSubmit={(event) => {
				event.preventDefault();
				submit();
			}}
		>
			<div>
				<h2 className="font-semibold text-base leading-tight">
					{ui.assistantTitle}
				</h2>
				<p className="mt-0.5 text-foreground/60 text-xs">{ui.assistantHint}</p>
			</div>

			<div className="flex items-center gap-2">
				<label className="sr-only" htmlFor={inputId}>
					{ui.assistantInputLabel}
				</label>
				<input
					id={inputId}
					name="question"
					type="text"
					autoComplete="off"
					maxLength={2000}
					value={question}
					disabled={isLoading}
					placeholder={ui.assistantPlaceholder}
					onChange={(event) => setQuestion(event.target.value)}
					className="min-h-9 flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
				/>
				<button
					type="submit"
					disabled={isLoading || question.trim().length === 0}
					className="min-h-9 rounded-md bg-primary px-3 font-semibold text-primary-foreground text-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
				>
					{isLoading ? ui.assistantLoading : ui.assistantSubmit}
				</button>
			</div>

			{/* One live region for the whole outcome: the answer replaces the
			    loading line in place, so a screen reader announces exactly once. */}
			<output
				aria-live="polite"
				aria-atomic="true"
				className="min-h-0 flex-1 overflow-y-auto rounded-md border border-border/60 bg-background/60 p-3 text-sm leading-relaxed"
			>
				{isLoading ? (
					<p className="text-foreground/60">{ui.assistantLoading}</p>
				) : hasAnswer ? (
					<>
						<span className="sr-only">{ui.assistantAnswerLabel}: </span>
						<p className="whitespace-pre-wrap">{answer}</p>
					</>
				) : null}
			</output>

			{status === "error" ? (
				<p
					role="alert"
					className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-destructive text-xs"
				>
					{ui.assistantError}
				</p>
			) : null}

			{hasAnswer || status === "error" ? (
				<button
					type="button"
					onClick={reset}
					className="self-start rounded-md px-1 text-foreground/60 text-xs underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					{ui.assistantClear}
				</button>
			) : null}
		</form>
	);
}
