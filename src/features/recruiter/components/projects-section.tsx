"use client";

import type { Project } from "@/core/entities";
import { ProjectCard } from "@/features/recruiter/components/project-card";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

interface ProjectsSectionProps {
	projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
	const ui = useUiStrings();

	return (
		<section
			aria-labelledby="projetos"
			className="mx-auto max-w-3xl px-6 py-10"
		>
			<h2 id="projetos" className="text-2xl font-semibold tracking-tight">
				{ui.sectionProjects}
			</h2>
			<div className="mt-4 space-y-4">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
}
