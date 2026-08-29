import type { Project } from "@/core/entities";
import { Badge } from "@/shared/components/ui/badge";

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<article className="rounded-lg border border-border p-4">
			<h3 className="text-lg font-semibold">{project.title}</h3>
			{project.role ? (
				<p className="text-sm text-muted-foreground">{project.role}</p>
			) : null}
			<p className="mt-2 leading-relaxed">{project.summary}</p>
			{project.impact ? (
				<p className="mt-2 text-sm font-medium">{project.impact}</p>
			) : null}
			{project.stack.length > 0 ? (
				<ul className="mt-3 flex flex-wrap gap-2">
					{project.stack.map((tech) => (
						<li key={tech}>
							<Badge variant="outline">{tech}</Badge>
						</li>
					))}
				</ul>
			) : null}
			{project.href || project.repoHref ? (
				<div className="mt-4 flex flex-wrap gap-4 text-sm">
					{project.href ? (
						<a
							href={project.href}
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Ver projeto
						</a>
					) : null}
					{project.repoHref ? (
						<a
							href={project.repoHref}
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Ver código-fonte
						</a>
					) : null}
				</div>
			) : null}
		</article>
	);
}
