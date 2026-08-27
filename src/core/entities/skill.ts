export type SkillCategory =
	| "frontend"
	| "backend"
	| "database"
	| "devops"
	| "iot"
	| "language";

export interface Skill {
	id: string;
	name: string;
	category: SkillCategory;
}
