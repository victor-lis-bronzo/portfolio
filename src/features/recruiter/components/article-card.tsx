"use client";

import type { Article } from "@/core/entities";
import { Badge } from "@/shared/components/ui/badge";
import type { Locale } from "@/shared/i18n/types";
import { useLocalized } from "@/shared/i18n/use-localized";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";
import { useLocale } from "@/shared/state/locale-store";

const DATE_LOCALES: Record<Locale, string> = {
	en: "en-US",
	pt: "pt-BR",
};

function formatDate(isoDate: string, locale: Locale) {
	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) {
		return isoDate;
	}
	return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
		day: "2-digit",
		month: "long",
		year: "numeric",
	}).format(date);
}

interface ArticleCardProps {
	article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
	const ui = useUiStrings();
	const locale = useLocale();
	const title = useLocalized(article.title);
	const summary = useLocalized(article.summary);

	return (
		<article className="rounded-lg border border-border p-4">
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">
				<time dateTime={article.publishedAt}>
					{formatDate(article.publishedAt, locale)}
				</time>
			</p>
			<p className="mt-2 leading-relaxed">{summary}</p>
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
					{ui.readArticle}
				</a>
			</div>
		</article>
	);
}
