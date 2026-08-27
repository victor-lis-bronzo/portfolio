export interface Project {
	id: string;
	title: string;
	summary: string;
	impact?: string;
	stack: string[];
	role?: string;
	href?: string;
	repoHref?: string;
	highlighted?: boolean;
}
