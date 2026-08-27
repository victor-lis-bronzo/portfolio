import type { Skill, SkillCategory } from "@/core/entities";
import { Badge } from "@/shared/components/ui/badge";

interface SkillBadgeListProps {
	skills: Skill[];
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
	frontend: "Frontend",
	backend: "Backend",
	database: "Banco de dados",
	devops: "DevOps",
	iot: "IoT",
	language: "Linguagens",
};

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
	const groups = groupByCategory(skills);

	return (
		<section aria-labelledby="skills" className="mx-auto max-w-3xl px-6 py-10">
			<h2 id="skills" className="text-2xl font-semibold tracking-tight">
				Skills
			</h2>
			<div className="mt-4 space-y-4">
				{Array.from(groups.entries()).map(([category, categorySkills]) => (
					<div key={category}>
						<h3 className="text-sm font-medium text-muted-foreground">
							{CATEGORY_LABELS[category]}
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
