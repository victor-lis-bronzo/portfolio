"use client";

import type { Project } from "@/core/entities";
import { Badge } from "@/shared/components/ui/badge";
import { useLocalized } from "@/shared/i18n/use-localized";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const ui = useUiStrings();
	const title = useLocalized(project.title);
	const summary = useLocalized(project.summary);
	const impact = useLocalized(project.impact);
	const role = useLocalized(project.role);

	return (
		<article className="rounded-lg border border-border p-4">
			<h3 className="text-lg font-semibold">{title}</h3>
			{role ? <p className="text-sm text-muted-foreground">{role}</p> : null}
			<p className="mt-2 leading-relaxed">{summary}</p>
			{impact ? <p className="mt-2 text-sm font-medium">{impact}</p> : null}
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
							{ui.viewProject}
						</a>
					) : null}
					{project.repoHref ? (
						<a
							href={project.repoHref}
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							{ui.viewSource}
						</a>
					) : null}
				</div>
			) : null}
		</article>
	);
}
