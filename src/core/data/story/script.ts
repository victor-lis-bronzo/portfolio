import type { StoryScript } from "../../entities/story-script";
import {
	D1_LEARNING_TRACK,
	D2_ECOPLAY_IOT_ARCHITECTURE,
	D3_STARSEG_ARCHITECTURE,
} from "./diagrams";

export const BIOGRAPHICAL_STORY_SCRIPT: StoryScript = {
	version: "1.0.0",
	chapters: [
		{
			id: "ch-origins",
			title: "Origens & Lógica",
			description: "O início da paixão por sistemas e computação no Minecraft.",
			stepIds: ["step-origins-1", "step-origins-2", "step-origins-3"],
			entryWaypoint: "OVERVIEW",
		},
		{
			id: "ch-etec",
			title: "Etec & Dedicação",
			description: "Formação técnica, método de estudo e liderança.",
			stepIds: ["step-etec-1", "step-etec-2", "step-etec-3"],
			entryWaypoint: "DESK",
		},
		{
			id: "ch-ecoplay",
			title: "Eco-Play & Hardware",
			description: "Conexão de sensores, IoT, FETEPS e prototipagem 3D.",
			stepIds: ["step-ecoplay-1", "step-ecoplay-2", "step-ecoplay-3"],
			entryWaypoint: "IOT_BENCH",
		},
		{
			id: "ch-impact",
			title: "Impacto & Ciência",
			description:
				"Sistemas para a comunidade, Sebrae e publicação científica.",
			stepIds: ["step-impact-1", "step-impact-2"],
			entryWaypoint: "DESK",
		},
		{
			id: "ch-starseg",
			title: "StarSeg & Engenharia",
			description:
				"Carreira profissional, arquitetura backend, IoT e tempo real.",
			stepIds: ["step-starseg-1", "step-starseg-2", "step-starseg-3"],
			entryWaypoint: "DESK",
		},
		{
			id: "ch-events",
			title: "Eventos Tech & Comunidade",
			description: "Participação em eventos, networking e aprendizado contínuo.",
			stepIds: ["step-events-1"],
			entryWaypoint: "EVENTS_BOARD",
		},
		{
			id: "ch-future",
			title: "IFSP & Oportunidades",
			description: "Graduação, pesquisa em segurança MQTT e próximos passos.",
			stepIds: ["step-future-1", "step-future-2"],
			entryWaypoint: "IFSP_BOARD",
		},
	],
	steps: [
		// --- Capítulo 1: Origens & Lógica ---
		{
			id: "step-origins-1",
			waypoint: "OVERVIEW",
			mascotDialogue:
				"Oi! Eu sou o Victor. Minha curiosidade pela computação começou no Minecraft, construindo circuitos lógicos de redstone!",
		},
		{
			id: "step-origins-2",
			waypoint: "DESK",
			mascotDialogue:
				"Fazia farms automáticas, portas com senhas e separadores de itens. Ali nasceu minha paixão por entender sistemas a fundo.",
		},
		{
			id: "step-origins-3",
			waypoint: "DESK",
			mascotDialogue:
				"No final de 2021, aos 14 anos, comecei a estudar programação por conta própria antes mesmo de entrar no ensino técnico.",
		},

		// --- Capítulo 2: Etec & Dedicação ---
		{
			id: "step-etec-1",
			waypoint: "DESK",
			mascotDialogue:
				"Em fev/2022 entrei no curso técnico de Desenvolvimento de Sistemas na Etec. Comprei meu PC com esforço para estudar muito.",
		},
		{
			id: "step-etec-2",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue:
				"Criei o hábito de estudar um semestre à frente da grade. Enquanto via lógica na aula, já dominava bancos de dados e APIs.",
			diagramElements: D1_LEARNING_TRACK,
		},
		{
			id: "step-etec-3",
			waypoint: "ETEC_STAGE",
			mascotDialogue:
				"Fui eleito representante de classe por 3 anos seguidos e tive a honra de ser o juramentista da formatura da turma!",
		},

		// --- Capítulo 3: Eco-Play & Hardware ---
		{
			id: "step-ecoplay-1",
			waypoint: "ECOPLAY_ARCADE",
			mascotDialogue:
				"Em 2023, numa conversa sobre o Vestibulinho, nasceu o Eco-Play: e se a gente gamificasse a coleta de tampinhas plásticas?",
		},
		{
			id: "step-ecoplay-2",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue:
				"Integramos sensores, microcontroladores e broker MQTT. Enfrentamos 2 seleções da FETEPS com muita persistência e evolução.",
			diagramElements: D2_ECOPLAY_IOT_ARCHITECTURE,
		},
		{
			id: "step-ecoplay-3",
			waypoint: "PRINTER_3D",
			mascotDialogue:
				"Adquiri a impressora 3D para prototipar cases e peças físicas dos projetos de hardware, eletrônica e automação.",
		},

		// --- Capítulo 4: Impacto & Ciência ---
		{
			id: "step-impact-1",
			waypoint: "DESK",
			mascotDialogue:
				"Para o Festival de Primavera 2024 da Etec, desenvolvi em um único final de semana o sistema de gestão com Next.js + Supabase.",
		},
		{
			id: "step-impact-2",
			waypoint: "OVERVIEW",
			mascotDialogue:
				"Apresentei no StartUp Day 2025 do Sebrae e publiquei artigo nos anais do congresso acadêmico CONFAAT 2024 da UNIFAAT.",
		},

		// --- Capítulo 5: StarSeg & Engenharia ---
		{
			id: "step-starseg-1",
			waypoint: "DESK",
			mascotDialogue:
				"Em 2025 entrei como Júnior na StarSeg e evoluí para responsabilidades de Pleno, atuando na arquitetura de ponta a ponta.",
		},
		{
			id: "step-starseg-2",
			waypoint: "WHITEBOARD_FOCUS",
			mascotDialogue:
				"Padronizo ecossistemas Node.js, integro Star-Lockers e Star-Gates via MQTT e WebSockets, e migrei sistemas legados para Docker.",
			diagramElements: D3_STARSEG_ARCHITECTURE,
		},
		{
			id: "step-starseg-3",
			waypoint: "DESK",
			mascotDialogue:
				"Refatorei sistemas críticos em Next.js e criei extensões de produtividade para o time, unindo comunicação ágil e código limpo.",
		},

		// --- Capítulo 5.5: Eventos ---
		{
			id: "step-events-1",
			waypoint: "EVENTS_BOARD",
			mascotDialogue:
				"Participo ativamente de eventos como AWS Summit e encontros de tecnologia para expandir conexões e conhecimentos.",
		},

		// --- Capítulo 6: IFSP & Oportunidades ---
		{
			id: "step-future-1",
			waypoint: "IFSP_BOARD",
			mascotDialogue:
				"Hoje curso ADS no IFSP Bragança Paulista e realizo Iniciação Científica em vulnerabilidades e segurança no protocolo MQTT.",
		},
		{
			id: "step-future-2",
			waypoint: "OVERVIEW",
			mascotDialogue:
				"Estou sempre aberto a bons desafios e projetos estratégicos. Conheça meus projetos detalhados na visão do recrutador!",
			cta: {
				label: "Ver Visão do Recrutador",
				href: "/recruiter",
			},
		},
	],
};
