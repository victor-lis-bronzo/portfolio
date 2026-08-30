import type { Localized } from "@/shared/i18n/types";

export interface Profile {
	name: string;
	/**
	 * ISO `YYYY-MM-DD`. Deliberately not `Localized`: a date is the same fact in
	 * every language. Age is derived from it at render time (see
	 * `data/assistant/system-prompt.ts`) so nothing goes stale on a birthday.
	 */
	birthDate: string;
	role: Localized;
	summary: Localized;
	email: string;
	githubHref: string;
	linkedinHref: string;
	cvHref: string;
	location?: Localized;
}

export const profile: Profile = {
	name: "Victor Lis Bronzo",
	birthDate: "2007-02-16",
	role: {
		en: "Full-Stack Developer | TypeScript · React · Next.js · Node.js",
		pt: "Desenvolvedor Full-Stack | TypeScript · React · Next.js · Node.js",
	},
	summary: {
		en:
			"Full-stack developer working in TypeScript/React/Next.js on the front end and " +
			"Node.js (Fastify, Clean Architecture, SOLID) on the back. At StarSeg I unify " +
			"system architecture and integrate ESP32 hardware over MQTT and WebSockets. " +
			"On my own time I build and maintain Git Assets, a micro-SaaS, and write about " +
			"SOLID and the engineering practices behind maintainable code.",
		pt:
			"Desenvolvedor full-stack com TypeScript/React/Next.js no front-end e Node.js " +
			"(Fastify, Clean Architecture, SOLID) no back-end. Na StarSeg, unifico a " +
			"arquitetura dos sistemas e integro hardware ESP32 via MQTT e WebSockets. " +
			"Por fora, construo e mantenho o Git Assets, um micro-SaaS autoral, e escrevo " +
			"sobre SOLID e as práticas de engenharia por trás de código sustentável.",
	},
	email: "victorlisbronzo1@gmail.com",
	githubHref: "https://github.com/victor-lis-bronzo",
	linkedinHref: "https://linkedin.com/in/victorlisbronzo",
	cvHref: "/cv.pdf", // TODO: public/cv.pdf doesn't exist yet — add it before this link works in production
	location: { en: "Atibaia, São Paulo — Brazil", pt: "Atibaia, SP" },
};
