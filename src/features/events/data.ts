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
		id: "aws-summit-24",
		name: "AWS Summit SP",
		date: "2024",
		role: "Participante",
		description:
			"Imersão nas novidades de cloud computing e arquiteturas serverless do ecossistema AWS.",
	},
	{
		id: "gdg-sp-23",
		name: "GDG São Paulo",
		date: "2023",
		role: "Participante",
		description:
			"Encontro oficial do Google Developer Groups para troca de conhecimentos em tecnologias Google.",
	},
	{
		id: "sql-sat-sp-23",
		name: "SQL Saturday SP",
		date: "2023",
		role: "Participante",
		description:
			"Evento de comunidade focado em SQL Server, banco de dados, palestras sobre otimização e BI.",
	},
	{
		id: "dev-gringa-23",
		name: "Dev na Gringa",
		date: "2023",
		role: "Participante",
		description:
			"Networking e palestras voltadas para internacionalização da carreira de desenvolvimento.",
	},
	{
		id: "aws-summit-23",
		name: "AWS Summit SP",
		date: "2023",
		role: "Participante",
		description:
			"Descoberta de novas tecnologias e soluções escaláveis para infraestrutura em nuvem.",
	},
];
