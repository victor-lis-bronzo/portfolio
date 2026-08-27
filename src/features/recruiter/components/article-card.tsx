import type { Article } from "@/core/entities";
import { Badge } from "@/shared/components/ui/badge";

interface ArticleCardProps {
	article: Article;
}

function formatDate(isoDate: string) {
	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) {
		return isoDate;
	}
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	}).format(date);
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<article className="rounded-lg border border-border p-4">
			<h3 className="text-lg font-semibold">{article.title}</h3>
			<p className="text-sm text-muted-foreground">
				<time dateTime={article.publishedAt}>
					{formatDate(article.publishedAt)}
				</time>
			</p>
			<p className="mt-2 leading-relaxed">{article.summary}</p>
			{article.tags && article.tags.length > 0 ? (
				<ul className="mt-3 flex flex-wrap gap-2">
					{article.tags.map((tag) => (
						<li key={tag}>
							<Badge variant="outline">{tag}</Badge>
						</li>
					))}
				</ul>
			) : null}
			<div className="mt-4 text-sm">
				<a
					href={article.href}
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					Ler artigo
				</a>
			</div>
		</article>
	);
}
