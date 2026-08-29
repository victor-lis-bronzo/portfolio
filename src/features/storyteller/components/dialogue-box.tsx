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
			className={`flex flex-col gap-3 rounded-2xl border border-white/15 bg-slate-950/85 p-4 text-slate-100 shadow-2xl backdrop-blur-xl md:p-5 ${className}`}
		>
			{/* Chapter header (outside live region so screen reader does not repeat title on each phrase) */}
			{(chapterTitle || stepInfo) && (
				<div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs text-slate-400 font-medium tracking-wide">
					<span className="flex items-center gap-1.5 font-semibold text-cyan-400">
						<span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
						{chapterTitle ?? "Storyteller"}
					</span>
					{stepInfo && (
						<span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
							{stepInfo}
						</span>
					)}
				</div>
			)}

			<div className="flex items-start gap-4">
				<MascotAvatar isSpeaking={Boolean(text)} />

				<div className="flex flex-1 flex-col gap-3">
					{/* Live Region for Screen Readers & Visitor text */}
					<div
						role="status"
						aria-live="polite"
						aria-atomic="true"
						className="min-h-[3rem] text-sm leading-relaxed text-slate-200 md:text-base selection:bg-cyan-500/30"
					>
						{text}
					</div>

					{cta && (
						<div className="mt-1 pt-2 border-t border-white/10">
							<Link
								href={cta.href}
								className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:from-blue-500 hover:to-cyan-500 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
