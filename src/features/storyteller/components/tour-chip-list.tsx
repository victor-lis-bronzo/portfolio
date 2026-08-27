"use client";

import type { StoryScript, StoryScriptId } from "@/core/entities";
import { Button } from "@/shared/components/ui/button";

export interface TourChipListProps {
	scripts: StoryScript[];
	activeScriptId: StoryScriptId | null;
	onSelect: (id: StoryScriptId) => void;
}

/**
 * Pure presentation component: one chip/button per available story script.
 * Selection state and the select handler are both received via props.
 */
export function TourChipList({
	scripts,
	activeScriptId,
	onSelect,
}: TourChipListProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{scripts.map((script) => {
				const isActive = script.id === activeScriptId;

				return (
					<Button
						key={script.id}
						type="button"
						variant={isActive ? "default" : "outline"}
						aria-pressed={isActive}
						onClick={() => onSelect(script.id)}
						className="h-auto flex-col items-start gap-0 px-3 py-2"
					>
						<span className="text-sm font-medium">{script.title}</span>
						{script.subtitle ? (
							<span className="text-xs font-normal opacity-70">
								{script.subtitle}
							</span>
						) : null}
					</Button>
				);
			})}
		</div>
	);
}
