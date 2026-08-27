"use client";

import { Button } from "@/shared/components/ui/button";

export interface StoryControlsProps {
	stepIndex: number;
	totalSteps: number;
	isLastStep: boolean;
	onNext: () => void;
	onClose: () => void;
}

/**
 * Pure presentation component: tour navigation controls (progress label,
 * next/finish button, close button). All state and handlers are props.
 */
export function StoryControls({
	stepIndex,
	totalSteps,
	isLastStep,
	onNext,
	onClose,
}: StoryControlsProps) {
	return (
		<div className="flex items-center justify-between gap-3">
			<span className="text-xs text-muted-foreground">
				{stepIndex + 1} / {totalSteps}
			</span>
			<div className="flex gap-2">
				<Button type="button" variant="outline" onClick={onClose}>
					Fechar
				</Button>
				<Button type="button" variant="default" onClick={onNext}>
					{isLastStep ? "Concluir" : "Próximo"}
				</Button>
			</div>
		</div>
	);
}
