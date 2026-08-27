import type { Article } from "@/core/entities";

export const articles: Article[] = [
	{
		id: "release-engineering-github-actions",
		title: "De 'Merge é Deploy' para Release Engineering com GitHub Actions",
		summary:
			"Defende o abandono do modelo de 'merge é deploy' automático em favor de uma " +
			"arquitetura de Release Engineering robusta com GitHub Actions, onde apenas " +
			"tags SemVer anotadas acionam o deploy através de seis estágios de validação " +
			"— testes, verificação de migrações em banco descartável e smoke tests.",
		href: "https://dev.to/victorlisbronzo/de-merge-e-deploy-para-release-engineering-com-github-actions-1a8h",
		publishedAt: "2026-08-25",
		tags: ["performance", "security", "development", "productivity"],
	},
	{
		id: "dependency-inversion-principle",
		title: "Princípio da Inversão de Dependência",
		summary:
			"Ensina que módulos de negócio não devem depender diretamente de ferramentas " +
			"externas concretas, mas sim de interfaces abstratas que você controla, " +
			"permitindo trocar implementações sem alterar a lógica central.",
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
		title: "Princípio da Segregação de Interfaces",
		summary:
			"Ensina que interfaces devem ser pequenas e específicas, evitando forçar " +
			"classes a implementarem métodos desnecessários — a solução é dividir " +
			"interfaces grandes em contratos menores e bem-definidos, resultando em " +
			"código mais modular e menos acoplado.",
		href: "https://dev.to/victorlisbronzo/principio-da-segregacao-de-interfaces-72a",
		publishedAt: "2026-08-20",
		tags: ["solidprinciples", "isp", "programming"],
	},
	{
		id: "liskov-substitution-principle",
		title: "Princípio da Substituição de Liskov",
		summary:
			"Explica que uma classe mãe deve poder ser substituída por suas classes " +
			"filhas sem que a aplicação quebre, evitando implementações que lançam erros " +
			"ou removem funcionalidades herdadas — o que exige melhor planejamento da " +
			"hierarquia de classes.",
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
		title: "Princípio de Aberto/Fechado",
		summary:
			"Explica que o código deve ser 'aberto para extensão e fechado para " +
			"modificações', evitando cadeias de if-else e switch através de polimorfismo " +
			"e abstrações, permitindo adicionar novos comportamentos sem alterar código " +
			"existente.",
		href: "https://dev.to/victorlisbronzo/principio-de-abertofechado-55kc",
		publishedAt: "2026-07-14",
		tags: ["ocp", "openclosedprinciple", "solidprinciples", "programming"],
	},
	{
		id: "single-responsibility-principle",
		title: "Princípio da Responsabilidade Única",
		summary:
			"Explica que cada classe deve ter apenas uma razão para ser modificada, " +
			"evitando as chamadas 'God Classes' que acumulam múltiplas responsabilidades, " +
			"e demonstra como dividir funcionalidades em classes especializadas alinhadas " +
			"com arquiteturas como Clean Architecture.",
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
		title: "SOLID",
		summary:
			"Apresenta os 5 princípios SOLID como diretrizes fundamentais para melhorar " +
			"a qualidade, escalabilidade e manutenibilidade do código, com exemplos " +
			"práticos em TypeScript que demonstram anti-padrões e boas práticas para " +
			"cada princípio.",
		href: "https://dev.to/victorlisbronzo/solid-3b5c",
		publishedAt: "2026-07-11",
		tags: ["architecture", "beginners", "softwareengineering", "typescript"],
	},
];
