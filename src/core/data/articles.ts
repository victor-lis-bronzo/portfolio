import type { Article } from "@/core/entities";

export const articles: Article[] = [
	{
		id: "release-engineering-github-actions",
		title: {
			en: "From 'Merge Means Deploy' to Release Engineering with GitHub Actions",
			pt: "De 'Merge é Deploy' para Release Engineering com GitHub Actions",
		},
		summary: {
			en:
				"Makes the case for dropping auto-deploy-on-merge in favour of a real release " +
				"pipeline on GitHub Actions, where only annotated SemVer tags ship — through " +
				"six validation stages, including tests, migrations verified against a " +
				"disposable database, and smoke tests.",
			pt:
				"Defende abandonar o deploy automático no merge em favor de um pipeline de " +
				"release de verdade no GitHub Actions, onde só tags SemVer anotadas sobem — " +
				"passando por seis estágios de validação, incluindo testes, migrações " +
				"verificadas em banco descartável e smoke tests.",
		},
		href: "https://dev.to/victorlisbronzo/de-merge-e-deploy-para-release-engineering-com-github-actions-1a8h",
		publishedAt: "2026-08-25",
		tags: ["performance", "security", "development", "productivity"],
	},
	{
		id: "dependency-inversion-principle",
		title: {
			en: "The Dependency Inversion Principle",
			pt: "Princípio da Inversão de Dependência",
		},
		summary: {
			en:
				"Business modules should not depend on concrete external tools, but on " +
				"abstractions you own — so an implementation can be swapped without touching " +
				"the core logic.",
			pt:
				"Módulos de negócio não devem depender de ferramentas externas concretas, e " +
				"sim de abstrações que você controla — assim uma implementação pode ser " +
				"trocada sem tocar na lógica central.",
		},
		href: "https://dev.to/victorlisbronzo/principio-da-inversao-de-dependencia-1n86",
		publishedAt: "2026-08-20",
		tags: [
			"architecture",
			"backend",
			"softwaredevelopment",
			"softwareengineering",
		],
	},
	{
		id: "interface-segregation-principle",
		title: {
			en: "The Interface Segregation Principle",
			pt: "Princípio da Segregação de Interfaces",
		},
		summary: {
			en:
				"Interfaces should be small and specific instead of forcing classes to " +
				"implement methods they never use. Splitting a fat interface into " +
				"well-defined contracts leaves the code modular and loosely coupled.",
			pt:
				"Interfaces devem ser pequenas e específicas, em vez de forçar classes a " +
				"implementar métodos que nunca usam. Quebrar uma interface grande em " +
				"contratos bem definidos deixa o código modular e menos acoplado.",
		},
		href: "https://dev.to/victorlisbronzo/principio-da-segregacao-de-interfaces-72a",
		publishedAt: "2026-08-20",
		tags: ["solidprinciples", "isp", "programming"],
	},
	{
		id: "liskov-substitution-principle",
		title: {
			en: "The Liskov Substitution Principle",
			pt: "Princípio da Substituição de Liskov",
		},
		summary: {
			en:
				"A parent class must be replaceable by any of its children without breaking " +
				"the application — no subclass that throws on inherited behaviour or quietly " +
				"drops it. Getting that right is a hierarchy design problem, not a coding one.",
			pt:
				"Uma classe mãe precisa poder ser substituída por qualquer filha sem quebrar " +
				"a aplicação — nada de subclasse que lança erro no comportamento herdado ou o " +
				"remove em silêncio. Acertar isso é um problema de design de hierarquia.",
		},
		href: "https://dev.to/victorlisbronzo/principio-da-substituicao-de-liskov-4ao9",
		publishedAt: "2026-08-20",
		tags: [
			"architecture",
			"software",
			"softwaredevelopment",
			"softwareengineering",
		],
	},
	{
		id: "open-closed-principle",
		title: {
			en: "The Open/Closed Principle",
			pt: "Princípio de Aberto/Fechado",
		},
		summary: {
			en:
				"Code should be open for extension and closed for modification. Polymorphism " +
				"and abstraction replace growing if-else and switch chains, so new behaviour " +
				"gets added without editing what already works.",
			pt:
				"Código deve ser aberto para extensão e fechado para modificação. Polimorfismo " +
				"e abstrações substituem cadeias crescentes de if-else e switch, permitindo " +
				"somar comportamento sem editar o que já funciona.",
		},
		href: "https://dev.to/victorlisbronzo/principio-de-abertofechado-55kc",
		publishedAt: "2026-07-14",
		tags: ["ocp", "openclosedprinciple", "solidprinciples", "programming"],
	},
	{
		id: "single-responsibility-principle",
		title: {
			en: "The Single Responsibility Principle",
			pt: "Princípio da Responsabilidade Única",
		},
		summary: {
			en:
				"Each class should have exactly one reason to change. Shows how God Classes " +
				"accumulate responsibilities and how to split them into specialised classes " +
				"that fit architectures like Clean Architecture.",
			pt:
				"Cada classe deve ter exatamente uma razão para mudar. Mostra como as God " +
				"Classes acumulam responsabilidades e como dividi-las em classes " +
				"especializadas que encaixam em arquiteturas como a Clean Architecture.",
		},
		href: "https://dev.to/victorlisbronzo/principio-da-responsabilidade-unica-301d",
		publishedAt: "2026-07-13",
		tags: [
			"solidprinciples",
			"singleresponsibility",
			"programming",
			"cleancode",
		],
	},
	{
		id: "solid",
		title: { en: "SOLID", pt: "SOLID" },
		summary: {
			en:
				"The five SOLID principles as practical guidelines for quality, scalability " +
				"and maintainability, with TypeScript examples contrasting the anti-pattern " +
				"and the fix for each one.",
			pt:
				"Os cinco princípios SOLID como diretrizes práticas de qualidade, " +
				"escalabilidade e manutenibilidade, com exemplos em TypeScript contrastando o " +
				"anti-padrão e a correção de cada um.",
		},
		href: "https://dev.to/victorlisbronzo/solid-3b5c",
		publishedAt: "2026-07-11",
		tags: ["architecture", "beginners", "softwareengineering", "typescript"],
	},
];
