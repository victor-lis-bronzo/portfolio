import type { StoryChapter, StoryScript, StoryStep } from "./story-script";

export interface StoryTimelineOptions {
	includeDrafts?: boolean;
}

export interface StoryTimeline {
	steps: StoryStep[];
	chapters: StoryChapter[];
	totalSteps: number;
	totalChapters: number;
	getStep: (index: number) => StoryStep | undefined;
	getStepIndex: (stepId: string) => number;
	getChapter: (chapterId: string) => StoryChapter | undefined;
	getChapterForStepIndex: (stepIndex: number) => StoryChapter | undefined;
	getChapterIndexForStepIndex: (stepIndex: number) => number;
	getFirstStepIndexOfChapter: (chapterId: string) => number;
	isFirstStep: (index: number) => boolean;
	isLastStep: (index: number) => boolean;
}

export function buildStoryTimeline(
	script: StoryScript,
	options: StoryTimelineOptions = {},
): StoryTimeline {
	const includeDrafts = options.includeDrafts ?? false;

	// Filter steps
	const validSteps = script.steps.filter((step) => {
		if (!includeDrafts && step.draft) {
			return false;
		}
		return true;
	});

	const validStepIds = new Set(validSteps.map((s) => s.id));
	const stepIndexMap = new Map<string, number>();
	validSteps.forEach((step, idx) => {
		stepIndexMap.set(step.id, idx);
	});

	// Filter chapters to only include chapters that have at least one valid step
	const filteredChapters: StoryChapter[] = [];
	const stepToChapterMap = new Map<string, StoryChapter>();

	for (const chapter of script.chapters) {
		const activeStepIds = chapter.stepIds.filter((id) => validStepIds.has(id));
		if (activeStepIds.length > 0) {
			const sanitizedChapter: StoryChapter = {
				...chapter,
				stepIds: activeStepIds,
			};
			filteredChapters.push(sanitizedChapter);
			for (const stepId of activeStepIds) {
				stepToChapterMap.set(stepId, sanitizedChapter);
			}
		}
	}

	const totalSteps = validSteps.length;
	const totalChapters = filteredChapters.length;

	return {
		steps: validSteps,
		chapters: filteredChapters,
		totalSteps,
		totalChapters,
		getStep: (index: number) => validSteps[index],
		getStepIndex: (stepId: string) => stepIndexMap.get(stepId) ?? -1,
		getChapter: (chapterId: string) =>
			filteredChapters.find((c) => c.id === chapterId),
		getChapterForStepIndex: (stepIndex: number) => {
			const step = validSteps[stepIndex];
			if (!step) return undefined;
			return stepToChapterMap.get(step.id);
		},
		getChapterIndexForStepIndex: (stepIndex: number) => {
			const step = validSteps[stepIndex];
			if (!step) return -1;
			const chapter = stepToChapterMap.get(step.id);
			if (!chapter) return -1;
			return filteredChapters.findIndex((c) => c.id === chapter.id);
		},
		getFirstStepIndexOfChapter: (chapterId: string) => {
			const chapter = filteredChapters.find((c) => c.id === chapterId);
			if (!chapter || chapter.stepIds.length === 0) return -1;
			return stepIndexMap.get(chapter.stepIds[0]) ?? -1;
		},
		isFirstStep: (index: number) => index === 0,
		isLastStep: (index: number) => index === totalSteps - 1 && totalSteps > 0,
	};
}
