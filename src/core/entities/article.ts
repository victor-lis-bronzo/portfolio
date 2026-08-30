import type { Localized } from "@/shared/i18n/types";

export interface Article {
	id: string;
	title: Localized;
	summary: Localized;
	href: string;
	publishedAt: string;
	tags?: string[];
}
