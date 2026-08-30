"use client";

import type { Skill, SkillCategory } from "@/core/entities";
import { Badge } from "@/shared/components/ui/badge";
import type { UiStrings } from "@/shared/i18n/ui-strings";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

interface SkillBadgeListProps {
	skills: Skill[];
}

const CATEGORY_LABEL_KEYS = {
	frontend: "skillCategoryFrontend",
	backend: "skillCategoryBackend",
	database: "skillCategoryDatabase",
	devops: "skillCategoryDevops",
	iot: "skillCategoryIot",
	language: "skillCategoryLanguage",
} as const satisfies Record<SkillCategory, keyof UiStrings>;

function groupByCategory(skills: Skill[]) {
	const groups = new Map<SkillCategory, Skill[]>();
	for (const skill of skills) {
		const group = groups.get(skill.category) ?? [];
		group.push(skill);
		groups.set(skill.category, group);
	}
	return groups;
}

export function SkillBadgeList({ skills }: SkillBadgeListProps) {
	const ui = useUiStrings();
	const groups = groupByCategory(skills);

	return (
		<section aria-labelledby="skills" className="mx-auto max-w-3xl px-6 py-10">
			<h2 id="skills" className="text-2xl font-semibold tracking-tight">
				{ui.sectionSkills}
			</h2>
			<div className="mt-4 space-y-4">
				{Array.from(groups.entries()).map(([category, categorySkills]) => (
					<div key={category}>
						<h3 className="text-sm font-medium text-muted-foreground">
							{ui[CATEGORY_LABEL_KEYS[category]]}
						</h3>
						<ul className="mt-2 flex flex-wrap gap-2">
							{categorySkills.map((skill) => (
								<li key={skill.id}>
									<Badge variant="secondary">{skill.name}</Badge>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
