import { articles } from "@/core/data/articles";
import { profile } from "@/core/data/profile";
import { projects } from "@/core/data/projects";
import { skills } from "@/core/data/skills";
import { ArticlesSection } from "@/features/recruiter/components/articles-section";
import { HeroSection } from "@/features/recruiter/components/hero-section";
import { ProjectsSection } from "@/features/recruiter/components/projects-section";
import { QuickActions } from "@/features/recruiter/components/quick-actions";
import { SkillBadgeList } from "@/features/recruiter/components/skill-badge-list";

export function RecruiterView() {
	return (
		<div data-testid="recruiter-view">
			<HeroSection profile={profile} />
			<SkillBadgeList skills={skills} />
			<ProjectsSection projects={projects} />
			<ArticlesSection articles={articles} />
			<QuickActions profile={profile} />
		</div>
	);
}
