import type { Project } from "@/core/entities";
import { ProjectCard } from "@/features/recruiter/components/project-card";

interface ProjectsSectionProps {
	projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
	return (
		<section
			aria-labelledby="projetos"
			className="mx-auto max-w-3xl px-6 py-10"
		>
			<h2 id="projetos" className="text-2xl font-semibold tracking-tight">
				Projetos
			</h2>
			<div className="mt-4 space-y-4">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
}
