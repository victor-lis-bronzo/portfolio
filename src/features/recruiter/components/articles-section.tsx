"use client";

import type { Article } from "@/core/entities";
import { ArticleCard } from "@/features/recruiter/components/article-card";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

interface ArticlesSectionProps {
	articles: Article[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
	const ui = useUiStrings();

	return (
		<section
			aria-labelledby="publicacoes"
			className="mx-auto max-w-3xl px-6 py-10"
		>
			<h2 id="publicacoes" className="text-2xl font-semibold tracking-tight">
				{ui.sectionArticles}
			</h2>
			<div className="mt-4 space-y-4">
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>
		</section>
	);
}
