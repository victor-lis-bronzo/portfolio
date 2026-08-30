export interface TechEvent {
	id: string;
	name: string;
	date: string;
	role: string;
	description: string;
	logoUrl?: string;
	link?: string;
}

export const TECH_EVENTS: TechEvent[] = [
	{
		id: "gdg-cloud-sp-2026",
		name: "GDG Cloud SP",
		date: "2026",
		role: "Participante",
		description: "A melhor experiência até hoje! Workshop de IA com Mario Souto e desenvolvimento + deploy de um RAG completo no GCP com Pedro Lara. O empurrão definitivo pra Cloud!",
		link: "https://www.linkedin.com/posts/victor-lis-bronzo_bom-dia-rede-mais-um-gdg-para-a-conta-activity-7463944404332855296-M6Id?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELJq10BcksiHQP1HQtQTWN0UoYK65bMkDQ"
	},
	{
		id: "gdg-americana-2026",
		name: "GDG Americana",
		date: "2026",
		role: "Participante",
		description: "Trilha focada no NotebookLM e macetes práticos com Victor Pugliese. Aprendizado super leve e eficiente sobre como utilizar a IA de forma inteligente no dia a dia.",
		link: "https://www.linkedin.com/posts/victor-lis-bronzo_gdg-notebooklm-inteligenciaartificial-activity-7456334179258032128-YZTY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELJq10BcksiHQP1HQtQTWN0UoYK65bMkDQ"
	},
	{
		id: "sql-saturday-2026",
		name: "SQL Saturday SP",
		date: "2026",
		role: "Participante",
		description: "Retorno a eventos de dados! Acompanhei palestras enriquecedoras sobre o ecossistema de IAs, Clouds, Databricks e MCP Servers. Ótima visão do mercado atual.",
		link: "https://www.linkedin.com/posts/victor-lis-bronzo_sqlsaturday-cloudcomputing-inteligenciaartificial-activity-7446187330949787648-fvcZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELJq10BcksiHQP1HQtQTWN0UoYK65bMkDQ"
	},
	{
		id: "dev-gringa-2025",
		name: "Dev na Gringa Summit",
		date: "2025",
		role: "Participante",
		description: "Uma experiência emocionante de networking! Conheci grandes referências como Erick Wendel e Ana Neri, além de palestras inspiradoras para continuar motivado na carreira.",
		link: "https://www.linkedin.com/posts/victor-lis-bronzo_devnagringasummit-devnagringa-networking-activity-7398413100695089152-4s2e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELJq10BcksiHQP1HQtQTWN0UoYK65bMkDQ"
	},
	{
		id: "aws-summit-2025",
		name: "AWS Summit SP",
		date: "2025",
		role: "Participante",
		description: "Meu grande passo de aproximação com Cloud! Explorei estandes, vi soluções como MongoDB de perto e acompanhei tendências de nuvem em um dos maiores eventos globais.",
		link: "https://www.linkedin.com/posts/victor-lis-bronzo_que-experi%C3%AAncia-incr%C3%ADvel-foi-o-aws-summit-activity-7362845664386367488-BMwH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELJq10BcksiHQP1HQtQTWN0UoYK65bMkDQ"
	},
	{
		id: "startup-day-2025",
		name: "Startup Day Sebrae",
		date: "2025",
		role: "Palestrante",
		description: "Apresentei meu projeto TCC (Eco-Play) no primeiro Startup Day de Atibaia! Recebi feedbacks riquíssimos de profissionais de mercado que abriram novas portas.",
		link: "https://www.linkedin.com/posts/victor-lis-bronzo_ol%C3%A1-rede-bom-dia-hoje-vim-compartilhar-activity-7322243130546618368-WdBi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELJq10BcksiHQP1HQtQTWN0UoYK65bMkDQ"
	},
	{
		id: "sql-tuesday-2024",
		name: "SQL Tuesday",
		date: "2024",
		role: "Participante",
		description: "Meu primeiro evento na Microsoft (Microsoft Reactor). Fascinante imersão na área de dados com palestras sobre GenAI, Cloud Computing, Criptografia e Machine Learning.",
		link: "https://www.linkedin.com/posts/victor-lis-bronzo_sqltuesday-activity-7276219882394783745-8V-P?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELJq10BcksiHQP1HQtQTWN0UoYK65bMkDQ"
	}
];
