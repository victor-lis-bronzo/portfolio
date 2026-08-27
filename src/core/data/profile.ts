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
	name: "Victor Lis Bronzo",
	role: "Desenvolvedor Full-Stack | TypeScript · React · Next.js · Node.js",
	summary:
		"Desenvolvedor Full-Stack com foco no ecossistema TypeScript/React/Next.js no " +
		"front-end e Node.js (Fastify, Clean Architecture, princípios SOLID) no back-end. " +
		"Atuo hoje na StarSeg unificando arquitetura de sistemas e integrando hardware IoT " +
		"(ESP32) via MQTT/WebSockets, e mantenho projetos autorais como o micro-SaaS Git " +
		"Assets. Também escrevo artigos técnicos sobre SOLID e boas práticas de engenharia.",
	email: "victorlisbronzo1@gmail.com",
	githubHref: "https://github.com/victor-lis-bronzo",
	linkedinHref: "https://linkedin.com/in/victorlisbronzo",
	cvHref: "/cv.pdf",
	location: "Atibaia, SP",
};
