import type { Locale } from "./types";

/**
 * Chrome strings — everything rendered by a component rather than authored in
 * `core/data`. Content that describes Victor's work lives in the data files as
 * `Localized` fields; this dictionary only covers labels, tooltips, section
 * headings and accessible names.
 */
export interface UiStrings {
	// --- App chrome ---
	modeSwitcherLabel: string;
	modeImmersive: string;
	modeRecruiter: string;
	localeToggleLabel: string;
	localeEnglish: string;
	localePortuguese: string;

	// --- Immersive page ---
	immersivePageHeading: string;
	loadingStudio: string;

	// --- Storyteller overlay ---
	overlayLabel: string;
	stepWord: string;
	chapterWord: string;
	chapterWordShort: string;
	ofWord: string;
	chapterNavLabel: string;
	dialogueFallbackTitle: string;

	// --- Intro card ---
	introTag: string;
	introRole: string;
	introDescription: string;
	introHighlights: readonly string[];
	introStart: string;
	introRecruiter: string;

	// --- Playback controls ---
	playbackToolbarLabel: string;
	autoAdvanceOnTitle: string;
	autoAdvanceOffTitle: string;
	autoAdvanceDisable: string;
	autoAdvanceEnable: string;
	autoAdvanceShort: string;
	previousStep: string;
	nextStep: string;
	restartTour: string;
	pauseTour: string;
	playTour: string;
	exitTour: string;
	exitTourTitle: string;

	// --- Resume affordance ---
	resumeStory: string;

	// --- Transcript ---
	transcriptOpen: string;
	transcriptClose: string;
	transcriptTitle: string;
	transcriptHint: string;
	transcriptCloseAria: string;
	transcriptCurrentBadge: string;

	// --- Recruiter view ---
	sectionSkills: string;
	sectionProjects: string;
	sectionArticles: string;
	sectionContact: string;
	downloadCv: string;
	copyEmail: string;
	emailCopied: string;
	viewProject: string;
	viewSource: string;
	readArticle: string;
	skillCategoryFrontend: string;
	skillCategoryBackend: string;
	skillCategoryDatabase: string;
	skillCategoryDevops: string;
	skillCategoryIot: string;
	skillCategoryLanguage: string;

	// --- 3D scene ---
	ifspPlaqueTitle: string;
	ifspPlaqueSubtitle: string;

	// --- Whiteboard assistant ---
	whiteboardViewsLabel: string;
	whiteboardViewDiagram: string;
	whiteboardViewAssistant: string;
	assistantTitle: string;
	assistantHint: string;
	assistantInputLabel: string;
	assistantPlaceholder: string;
	assistantSubmit: string;
	assistantLoading: string;
	assistantError: string;
	assistantAnswerLabel: string;
	assistantClear: string;

	// --- Decorative SVG titles (kept out of the a11y tree by their parents) ---
	iconPrevious: string;
	iconNext: string;
	iconPlay: string;
	iconPause: string;
	iconRestart: string;
	iconClose: string;
	iconDocument: string;
	iconArrow: string;
	iconResume: string;
	iconStart: string;
}

export const UI_STRINGS: Record<Locale, UiStrings> = {
	en: {
		modeSwitcherLabel: "Choose a view",
		modeImmersive: "Immersive",
		modeRecruiter: "Recruiter",
		localeToggleLabel: "Language",
		localeEnglish: "EN",
		localePortuguese: "PT",

		immersivePageHeading:
			"Victor Lis Bronzo — Interactive 3D portfolio & storyteller",
		loadingStudio: "Loading the 3D studio…",

		overlayLabel: "Storyteller interface",
		stepWord: "Step",
		chapterWord: "Chapter",
		chapterWordShort: "Ch.",
		ofWord: "of",
		chapterNavLabel: "Story chapter navigation",
		dialogueFallbackTitle: "Storyteller",

		introTag: "Interactive 3D portfolio",
		introRole: "Full-stack developer · IoT · undergraduate research",
		introDescription:
			"A guided walk through the studio: where the systems instinct started, the hardware I built, the work I ship today, and what I'm researching next.",
		introHighlights: [
			"🎮 Redstone & logic",
			"🏫 Etec — Systems Development",
			"🌱 Eco-Play & IoT",
			"🏢 StarSeg",
			"🔬 IFSP · MQTT research",
		],
		introStart: "Start my story",
		introRecruiter: "Recruiter view",

		playbackToolbarLabel: "Storyteller playback controls",
		autoAdvanceOnTitle: "Auto-advance is on (click to turn it off)",
		autoAdvanceOffTitle: "Auto-advance is paused (click to turn it on)",
		autoAdvanceDisable: "Turn off auto-advance",
		autoAdvanceEnable: "Turn on auto-advance",
		autoAdvanceShort: "Auto",
		previousStep: "Previous step",
		nextStep: "Next step",
		restartTour: "Restart the tour",
		pauseTour: "Pause the tour",
		playTour: "Play the tour",
		exitTour: "End the tour and return to the overview",
		exitTourTitle: "Exit the tour (Esc)",

		resumeStory: "Resume the story",

		transcriptOpen: "Transcript (text)",
		transcriptClose: "Close transcript",
		transcriptTitle: "Full narration transcript",
		transcriptHint: "Pick any moment to jump straight to it",
		transcriptCloseAria: "Close transcript",
		transcriptCurrentBadge: "Now",

		sectionSkills: "Skills",
		sectionProjects: "Projects",
		sectionArticles: "Writing",
		sectionContact: "Contact",
		downloadCv: "Download résumé",
		copyEmail: "Copy e-mail",
		emailCopied: "Copied!",
		viewProject: "Open the project",
		viewSource: "View the source",
		readArticle: "Read the article",
		skillCategoryFrontend: "Frontend",
		skillCategoryBackend: "Backend",
		skillCategoryDatabase: "Databases",
		skillCategoryDevops: "DevOps",
		skillCategoryIot: "IoT",
		skillCategoryLanguage: "Languages",

		ifspPlaqueTitle: "IFSP · Bragança Paulista",
		ifspPlaqueSubtitle: "Systems Analysis · MQTT security research",

		whiteboardViewsLabel: "Whiteboard view",
		whiteboardViewDiagram: "Diagram",
		whiteboardViewAssistant: "Ask me",
		assistantTitle: "Ask me directly",
		assistantHint:
			"Projects, stack, experience, what I'm researching — go ahead.",
		assistantInputLabel: "Your question",
		assistantPlaceholder: "What did you build at StarSeg?",
		assistantSubmit: "Ask",
		assistantLoading: "Thinking…",
		assistantError: "That didn't go through. Try again in a moment.",
		assistantAnswerLabel: "Answer",
		assistantClear: "Clear",

		iconPrevious: "Previous",
		iconNext: "Next",
		iconPlay: "Play",
		iconPause: "Pause",
		iconRestart: "Restart",
		iconClose: "Close",
		iconDocument: "Document",
		iconArrow: "Arrow",
		iconResume: "Resume",
		iconStart: "Start",
	},
	pt: {
		modeSwitcherLabel: "Escolher visualização",
		modeImmersive: "Imersivo",
		modeRecruiter: "Recrutador",
		localeToggleLabel: "Idioma",
		localeEnglish: "EN",
		localePortuguese: "PT",

		immersivePageHeading:
			"Victor Lis Bronzo — Portfólio 3D interativo & storyteller",
		loadingStudio: "Carregando o estúdio 3D…",

		overlayLabel: "Interface do storyteller",
		stepWord: "Passo",
		chapterWord: "Capítulo",
		chapterWordShort: "Cap.",
		ofWord: "de",
		chapterNavLabel: "Navegação por capítulos da história",
		dialogueFallbackTitle: "Storyteller",

		introTag: "Portfólio 3D interativo",
		introRole: "Desenvolvedor full-stack · IoT · iniciação científica",
		introDescription:
			"Um passeio guiado pelo estúdio: onde nasceu meu instinto por sistemas, o hardware que construí, o que entrego hoje e o que estou pesquisando agora.",
		introHighlights: [
			"🎮 Redstone & lógica",
			"🏫 Etec — Desenvolvimento de Sistemas",
			"🌱 Eco-Play & IoT",
			"🏢 StarSeg",
			"🔬 IFSP · pesquisa MQTT",
		],
		introStart: "Começar minha história",
		introRecruiter: "Visão do recrutador",

		playbackToolbarLabel: "Controles de reprodução do storyteller",
		autoAdvanceOnTitle: "Avanço automático ligado (clique para desligar)",
		autoAdvanceOffTitle: "Avanço automático pausado (clique para ligar)",
		autoAdvanceDisable: "Desligar avanço automático",
		autoAdvanceEnable: "Ligar avanço automático",
		autoAdvanceShort: "Auto",
		previousStep: "Passo anterior",
		nextStep: "Próximo passo",
		restartTour: "Reiniciar o tour",
		pauseTour: "Pausar o tour",
		playTour: "Tocar o tour",
		exitTour: "Encerrar o tour e voltar para a visão geral",
		exitTourTitle: "Sair do tour (Esc)",

		resumeStory: "Retomar a história",

		transcriptOpen: "Transcrição (texto)",
		transcriptClose: "Fechar transcrição",
		transcriptTitle: "Transcrição completa da narrativa",
		transcriptHint: "Escolha qualquer momento para ir direto até ele",
		transcriptCloseAria: "Fechar transcrição",
		transcriptCurrentBadge: "Agora",

		sectionSkills: "Skills",
		sectionProjects: "Projetos",
		sectionArticles: "Publicações",
		sectionContact: "Contato",
		downloadCv: "Baixar currículo",
		copyEmail: "Copiar e-mail",
		emailCopied: "Copiado!",
		viewProject: "Abrir o projeto",
		viewSource: "Ver o código-fonte",
		readArticle: "Ler o artigo",
		skillCategoryFrontend: "Frontend",
		skillCategoryBackend: "Backend",
		skillCategoryDatabase: "Bancos de dados",
		skillCategoryDevops: "DevOps",
		skillCategoryIot: "IoT",
		skillCategoryLanguage: "Linguagens",

		ifspPlaqueTitle: "IFSP · Bragança Paulista",
		ifspPlaqueSubtitle: "ADS · Iniciação Científica MQTT",

		whiteboardViewsLabel: "Visualização do quadro",
		whiteboardViewDiagram: "Diagrama",
		whiteboardViewAssistant: "Me pergunte",
		assistantTitle: "Pergunte direto pra mim",
		assistantHint:
			"Projetos, stack, experiência, o que estou pesquisando — manda.",
		assistantInputLabel: "Sua pergunta",
		assistantPlaceholder: "O que você construiu na StarSeg?",
		assistantSubmit: "Perguntar",
		assistantLoading: "Pensando…",
		assistantError: "Não deu certo. Tente de novo em instantes.",
		assistantAnswerLabel: "Resposta",
		assistantClear: "Limpar",

		iconPrevious: "Anterior",
		iconNext: "Próximo",
		iconPlay: "Tocar",
		iconPause: "Pausar",
		iconRestart: "Reiniciar",
		iconClose: "Fechar",
		iconDocument: "Documento",
		iconArrow: "Seta",
		iconResume: "Retomar",
		iconStart: "Iniciar",
	},
};
