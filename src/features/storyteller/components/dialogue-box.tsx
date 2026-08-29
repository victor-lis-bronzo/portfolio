"use client";

import Link from "next/link";
import { useDialogueStore } from "../state/dialogue-store";
import { MascotAvatar } from "./mascot-avatar";

export interface DialogueBoxProps {
  chapterTitle?: string;
  stepInfo?: string;
  className?: string;
}

export function DialogueBox({
  chapterTitle,
  stepInfo,
  className = "",
}: DialogueBoxProps) {
  const text = useDialogueStore((state) => state.text);
  const cta = useDialogueStore((state) => state.cta);

  if (!text) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-card-foreground md:p-5 ${className}`}
    >
      {/* Chapter header (outside live region so screen reader does not repeat title on each phrase) */}
      {(chapterTitle || stepInfo) && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border pb-2 text-xs text-foreground/60 font-medium tracking-wide">
          <span className="flex min-w-0 flex-1 items-center gap-1.5 font-semibold text-foreground">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span className="truncate">{chapterTitle ?? "Storyteller"}</span>
          </span>
          {stepInfo && (
            <span className="shrink-0 rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground sm:text-[11px]">
              {stepInfo}
            </span>
          )}
        </div>
      )}

      <div className="flex items-start gap-3 sm:gap-4">
        <MascotAvatar isSpeaking={Boolean(text)} />

        {/* `min-w-0` is required: a `flex-1` child otherwise refuses to shrink
				    below its intrinsic content width and blows out the card. */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* Live Region for Screen Readers & Visitor text */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="max-h-[32dvh] overflow-y-auto scrollbar-themed pr-0.5 text-sm leading-relaxed text-foreground/85 selection:bg-primary/30 sm:max-h-[40dvh] sm:min-h-[3rem] md:text-base"
          >
            {text}
          </div>

          {cta && (
            <div className="mt-1 pt-2 border-t border-border">
              <Link
                href={cta.href}
                className="inline-flex max-w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{cta.label}</span>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Seta</title>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
