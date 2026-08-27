import type { Article } from "@/core/entities";
import { ArticleCard } from "@/features/recruiter/components/article-card";

interface ArticlesSectionProps {
	articles: Article[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
	return (
		<section
			aria-labelledby="publicacoes"
			className="mx-auto max-w-3xl px-6 py-10"
		>
			<h2 id="publicacoes" className="text-2xl font-semibold tracking-tight">
				Publicações
			</h2>
			<div className="mt-4 space-y-4">
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>
		</section>
	);
}
