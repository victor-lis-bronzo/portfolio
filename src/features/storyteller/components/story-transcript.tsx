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
				className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-card-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<svg
					className="h-4 w-4 text-primary"
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
					className="mt-2 max-h-[70vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-card p-5 text-card-foreground"
				>
					<div className="flex items-center justify-between border-b border-border pb-3">
						<div>
							<h3 className="text-sm font-semibold text-foreground">
								Transcrição Completa da Narrativa
							</h3>
							<p className="text-xs text-foreground/60">
								Clique em qualquer momento para navegar
							</p>
						</div>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							aria-label="Fechar transcrição"
							className="rounded-lg p-1 text-foreground/60 transition-colors hover:bg-secondary hover:text-foreground"
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
									<h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
										<span className="flex h-4 w-4 items-center justify-center rounded bg-primary/20 text-[10px] text-foreground">
											{chapterIdx + 1}
										</span>
										{chapter.title}
									</h4>
									{chapter.description && (
										<p className="text-xs text-foreground/60 italic">
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
													className={`flex flex-col gap-1 rounded-xl p-3 text-left transition-colors ${
														isCurrent
															? "border-l-2 border-primary bg-primary/15"
															: "bg-secondary hover:bg-secondary/80"
													}`}
												>
													<div className="flex items-center justify-between text-[11px] font-semibold">
														<span
															className={
																isCurrent
																	? "text-foreground"
																	: "text-foreground/60"
															}
														>
															Passo {stepIndex + 1} • {step.waypoint}
														</span>
														{isCurrent && (
															<span className="rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
																Atual
															</span>
														)}
													</div>
													<p className="text-xs leading-relaxed text-foreground/85">
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
