"use client";

import { useState } from "react";
import type { StoryTimeline } from "@/core/entities/story-timeline";

export interface StoryTranscriptProps {
	timeline: StoryTimeline;
	currentStepIndex: number;
	onJumpToStep: (stepIndex: number) => void;
	className?: string;
}

export function StoryTranscript({
	timeline,
	currentStepIndex,
	onJumpToStep,
	className = "",
}: StoryTranscriptProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`flex flex-col items-end ${className}`}>
			{/* Toggle button */}
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-controls="story-transcript-panel"
				className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs font-medium text-slate-300 shadow-lg backdrop-blur-xl transition hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
			>
				<svg
					className="h-4 w-4 text-cyan-400"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>Documento</title>
					<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
					<polyline points="14 2 14 8 20 8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
					<line x1="10" y1="9" x2="8" y2="9" />
				</svg>
				<span>{isOpen ? "Fechar Transcrição" : "Transcrição (Texto)"}</span>
			</button>

			{/* Expandable panel */}
			{isOpen && (
				<div
					id="story-transcript-panel"
					className="mt-2 max-h-[70vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/15 bg-slate-950/95 p-5 text-slate-100 shadow-2xl backdrop-blur-2xl"
				>
					<div className="flex items-center justify-between border-b border-white/10 pb-3">
						<div>
							<h3 className="text-sm font-bold text-white">
								Transcrição Completa da Narrativa
							</h3>
							<p className="text-xs text-slate-400">
								Clique em qualquer momento para navegar
							</p>
						</div>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							aria-label="Fechar transcrição"
							className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
						>
							<svg
								className="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Fechar</title>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

					<div className="mt-4 flex flex-col gap-6">
						{timeline.chapters.map((chapter, chapterIdx) => {
							return (
								<section key={chapter.id} className="flex flex-col gap-2">
									<h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
										<span className="flex h-4 w-4 items-center justify-center rounded bg-cyan-500/20 text-[10px] text-cyan-300">
											{chapterIdx + 1}
										</span>
										{chapter.title}
									</h4>
									{chapter.description && (
										<p className="text-xs text-slate-400 italic">
											{chapter.description}
										</p>
									)}

									<div className="mt-1 flex flex-col gap-1.5">
										{chapter.stepIds.map((stepId) => {
											const stepIndex = timeline.getStepIndex(stepId);
											const step = timeline.getStep(stepIndex);
											if (!step) return null;

											const isCurrent = stepIndex === currentStepIndex;

											return (
												<button
													key={stepId}
													type="button"
													onClick={() => {
														onJumpToStep(stepIndex);
														setIsOpen(false);
													}}
													className={`flex flex-col gap-1 rounded-xl p-3 text-left transition ${
														isCurrent
															? "bg-gradient-to-r from-blue-600/30 to-cyan-500/20 ring-1 ring-cyan-400"
															: "bg-white/5 hover:bg-white/10"
													}`}
												>
													<div className="flex items-center justify-between text-[11px] font-semibold">
														<span
															className={
																isCurrent ? "text-cyan-300" : "text-slate-400"
															}
														>
															Passo {stepIndex + 1} • {step.waypoint}
														</span>
														{isCurrent && (
															<span className="rounded bg-cyan-400/20 px-1.5 py-0.5 text-[10px] text-cyan-300">
																Atual
															</span>
														)}
													</div>
													<p className="text-xs leading-relaxed text-slate-200">
														{step.mascotDialogue}
													</p>
												</button>
											);
										})}
									</div>
								</section>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
