// TODO: substituir pelo conteúdo real fornecido pelo usuário
export interface Profile {
	name: string;
	role: string;
	summary: string;
	email: string;
	githubHref: string;
	linkedinHref: string;
	cvHref: string;
	location?: string;
}

export const profile: Profile = {
	name: "[PLACEHOLDER] Nome Completo",
	role: "[PLACEHOLDER] Full-stack & IoT Developer",
	summary:
		"[PLACEHOLDER] Bio curta a ser substituída pelo conteúdo real fornecido pelo usuário.",
	email: "placeholder@example.com",
	githubHref: "https://github.com/placeholder",
	linkedinHref: "https://linkedin.com/in/placeholder",
	cvHref: "/cv.pdf",
	location: "[PLACEHOLDER] Cidade, País",
};
