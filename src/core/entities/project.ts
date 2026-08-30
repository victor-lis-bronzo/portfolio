import type { Localized } from "@/shared/i18n/types";

export interface Project {
	id: string;
	title: Localized;
	summary: Localized;
	impact?: Localized;
	stack: string[];
	role?: Localized;
	href?: string;
	repoHref?: string;
	highlighted?: boolean;
}
