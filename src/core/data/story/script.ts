import type { StoryScript } from "../../entities/story-script";
import {
  D1_LEARNING_TRACK,
  D2_ECOPLAY_IOT_ARCHITECTURE,
  D3_STARSEG_ARCHITECTURE,
} from "./diagrams";

export const BIOGRAPHICAL_STORY_SCRIPT: StoryScript = {
  version: "2.0.0",
  chapters: [
    {
      id: "ch-origins",
      title: { en: "Origins & Logic", pt: "Origens & Lógica" },
      description: {
        en: "Where the instinct for systems started: redstone circuits in Minecraft.",
        pt: "Onde o instinto por sistemas começou: circuitos de redstone no Minecraft.",
      },
      stepIds: ["step-origins-1", "step-origins-2", "step-origins-3"],
      entryWaypoint: "OVERVIEW",
    },
    {
      id: "ch-etec",
      title: { en: "Etec & Discipline", pt: "Etec & Disciplina" },
      description: {
        en: "Technical training, a study method built on purpose, and leading a class.",
        pt: "Formação técnica, um método de estudo próprio e liderança de turma.",
      },
      stepIds: ["step-etec-1", "step-etec-2", "step-etec-3"],
      entryWaypoint: "DESK",
    },
    {
      id: "ch-ecoplay",
      title: { en: "Eco-Play & Hardware", pt: "Eco-Play & Hardware" },
      description: {
        en: "Sensors, IoT, two FETEPS selection rounds, and 3D-printed prototypes.",
        pt: "Sensores, IoT, duas seleções da FETEPS e protótipos impressos em 3D.",
      },
      stepIds: ["step-ecoplay-1", "step-ecoplay-2", "step-ecoplay-3"],
      entryWaypoint: "IOT_BENCH",
    },
    {
      id: "ch-impact",
      title: { en: "Impact & Research", pt: "Impacto & Pesquisa" },
      description: {
        en: "Software people actually used, a Sebrae stage, and a published paper.",
        pt: "Software que gente de verdade usou, palco no Sebrae e artigo publicado.",
      },
      stepIds: ["step-impact-1", "step-impact-2"],
      entryWaypoint: "DESK",
    },
    {
      id: "ch-starseg",
      title: { en: "StarSeg & Engineering", pt: "StarSeg & Engenharia" },
      description: {
        en: "Backend architecture, IoT integration and real-time systems in production.",
        pt: "Arquitetura backend, integração IoT e sistemas em tempo real em produção.",
      },
      stepIds: ["step-starseg-1", "step-starseg-2", "step-starseg-3"],
      entryWaypoint: "DESK",
    },
    {
      id: "ch-events",
      title: { en: "Events & Community", pt: "Eventos & Comunidade" },
      description: {
        en: "Community meetups, tech conferences, and the energy of showing up in person.",
        pt: "Encontros da comunidade, conferências de tecnologia e a energia de participar presencialmente.",
      },
      stepIds: ["step-events-1"],
      entryWaypoint: "EVENTS_BOARD",
    },
    {
      id: "ch-future",
      title: { en: "IFSP & What's Next", pt: "IFSP & Próximos Passos" },
      description: {
        en: "A degree, MQTT security research, and the problems I want to take on next.",
        pt: "Graduação, pesquisa em segurança MQTT e os problemas que quero pegar agora.",
      },
      stepIds: ["step-future-1", "step-future-2"],
      entryWaypoint: "IFSP_BOARD",
    },
  ],
  steps: [
    // --- Chapter 1: Origins & Logic ---
    {
      id: "step-origins-1",
      waypoint: "OVERVIEW",
      mascotDialogue: {
        en: "Hi, I'm Victor. I started out building logic circuits in Minecraft redstone — that's where systems became my thing.",
        pt: "Oi, eu sou o Victor. Comecei montando circuitos lógicos de redstone no Minecraft — ali entender sistemas virou hábito.",
      },
    },
    {
      id: "step-origins-2",
      waypoint: "DESK",
      mascotDialogue: {
        en: "Automated farms, password-locked doors, item sorters. Toys on the surface — each one a system I had to design and debug.",
        pt: "Farms automáticas, portas com senha, separadores de itens. Brinquedo por fora, mas cada um era um sistema pra projetar e depurar.",
      },
    },
    {
      id: "step-origins-3",
      waypoint: "DESK",
      mascotDialogue: {
        en: "At 14, in late 2021, I started teaching myself to code — a year before any course would have required it of me.",
        pt: "Aos 14 anos, no fim de 2021, comecei a estudar programação sozinho — um ano antes de qualquer curso me cobrar isso.",
      },
    },

    // --- Chapter 2: Etec & Discipline ---
    {
      id: "step-etec-1",
      waypoint: "DESK",
      mascotDialogue: {
        en: "Feb 2022: Systems Development at Etec. I paid for my own PC so the study time would have no excuses attached.",
        pt: "Fev/2022: técnico em Desenvolvimento de Sistemas na Etec. Comprei meu próprio PC pra não sobrar desculpa pra não estudar.",
      },
    },
    {
      id: "step-etec-2",
      waypoint: "WHITEBOARD_FOCUS",
      mascotDialogue: {
        en: "I ran a semester ahead of the syllabus on purpose. While class covered logic, I was already shipping databases and APIs.",
        pt: "Estudei de propósito um semestre à frente da grade. Enquanto a aula via lógica, eu já entregava bancos de dados e APIs.",
      },
      diagramElements: D1_LEARNING_TRACK,
    },
    {
      id: "step-etec-3",
      waypoint: "ETEC_STAGE",
      mascotDialogue: {
        en: "Elected class representative three years running, then chosen to give the graduation oath. Trust earned, not assigned.",
        pt: "Eleito representante de classe três anos seguidos e escolhido juramentista da formatura. Confiança conquistada.",
      },
    },

    // --- Chapter 3: Eco-Play & Hardware ---
    {
      id: "step-ecoplay-1",
      waypoint: "ECOPLAY_ARCADE",
      mascotDialogue: {
        en: "In 2023 I turned a hallway conversation into Eco-Play: recycling bottle caps, scored like a basketball arcade game.",
        pt: "Em 2023 transformei uma conversa de corredor no Eco-Play: reciclar tampinhas com o placar de um jogo de basquete.",
      },
      ctas: [
        {
          label: {
            en: "Read: how Eco-Play works",
            pt: "Publicação: como o Eco-Play funciona",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_eco-play-activity-7266495833804558336-cO3f-",
        },
        {
          label: {
            en: "Read: Eco-Play took the top capstone grade",
            pt: "Publicação: nota máxima no TCC com o Eco-Play",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_nota-m%C3%A1xima-no-tcceco-play-boa-tarde-activity-7268707865601744898--VMD",
        },
      ],
    },
    {
      id: "step-ecoplay-2",
      waypoint: "WHITEBOARD_FOCUS",
      mascotDialogue: {
        en: "We wired sensors and microcontrollers to an MQTT broker, then carried the project through two FETEPS selection rounds.",
        pt: "Ligamos sensores e microcontroladores a um broker MQTT e levamos o projeto por duas seleções da FETEPS.",
      },
      diagramElements: D2_ECOPLAY_IOT_ARCHITECTURE,
      ctas: [
        {
          label: {
            en: "Read: what FETEPS taught me",
            pt: "Publicação: o que a FETEPS me ensinou",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_feteps-uma-jornada-de-aprendizado-e-crescimento-activity-7207668250569039872-m_bY",
        },
        {
          label: {
            en: "Read: the first public demo",
            pt: "Publicação: a primeira demo pública do TCC",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_pr%C3%A9via-do-tcc-um-sucesso-de-p%C3%BAblico-e-aprendizado-activity-7210204912771624960-7Pdy",
        },
        {
          label: {
            en: "Read: presenting the capstone at FAAT",
            pt: "Publicação: apresentação do TCC na FAAT",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_tcc-na-faculdades-atibaia-faat-uma-jornada-activity-7214915997688864769-DylW",
        },
        {
          label: {
            en: "Read: another capstone milestone",
            pt: "Publicação: mais uma etapa do TCC",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_mais-uma-etapa-do-meu-tcc-bom-dia-rede-activity-7243605015930515458-R81F",
        },
      ],
    },
    {
      id: "step-ecoplay-3",
      waypoint: "PRINTER_3D",
      mascotDialogue: {
        en: "I bought a 3D printer so hardware ideas stopped waiting on suppliers: cases and parts go from CAD to bench in hours.",
        pt: "Comprei uma impressora 3D pra não depender de fornecedor: cases e peças saem do CAD para a bancada em poucas horas.",
      },
    },

    // --- Chapter 4: Impact & Research ---
    {
      id: "step-impact-1",
      waypoint: "DESK",
      mascotDialogue: {
        en: "Etec's 2024 Spring Festival needed a management system. I scoped, built and shipped it in one weekend, on Next.js and Supabase.",
        pt: "O Festival de Primavera 2024 da Etec precisava de gestão. Especifiquei, construí e entreguei em um fim de semana, com Next.js e Supabase.",
      },
      ctas: [
        {
          label: {
            en: "Read: my first system in real use",
            pt: "Publicação: minha primeira aplicação real",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_minha-primeira-aplica%C3%A7%C3%A3o-real-bom-dia-tudo-activity-7245416917513981954-ZLM1",
        },
      ],
    },
    {
      id: "step-impact-2",
      waypoint: "OVERVIEW",
      mascotDialogue: {
        en: "I presented at Sebrae's StartUp Day 2025 and published a paper in the CONFAAT 2024 proceedings at UNIFAAT.",
        pt: "Apresentei no StartUp Day 2025 do Sebrae e publiquei um artigo nos anais do CONFAAT 2024, na UNIFAAT.",
      },
      ctas: [
        {
          label: {
            en: "Read: on stage at StartUp Day",
            pt: "Publicação: no palco do StartUp Day",
          },
          href: "https://www.linkedin.com/posts/victor-lis-bronzo_ol%C3%A1-rede-bom-dia-hoje-vim-compartilhar-activity-7322243130546618368-WdBi",
        },
      ],
    },

    // --- Chapter 5: StarSeg & Engineering ---
    {
      id: "step-starseg-1",
      waypoint: "DESK",
      mascotDialogue: {
        en: "I joined StarSeg in 2025 as a junior dev and grew into mid-level scope, owning architecture decisions end to end.",
        pt: "Entrei na StarSeg em 2025 como júnior e cresci para o escopo de pleno, respondendo pela arquitetura de ponta a ponta.",
      },
    },
    {
      id: "step-starseg-2",
      waypoint: "WHITEBOARD_FOCUS",
      mascotDialogue: {
        en: "I standardize our Node.js stack, integrate Star-Lockers and Star-Gates over MQTT and WebSockets, and moved legacy onto Docker.",
        pt: "Padronizo nosso ecossistema Node.js, integro Star-Lockers e Star-Gates via MQTT e WebSockets e migrei o legado para Docker.",
      },
      diagramElements: D3_STARSEG_ARCHITECTURE,
    },
    {
      id: "step-starseg-3",
      waypoint: "DESK",
      mascotDialogue: {
        en: "I refactored business-critical Next.js systems and built internal extensions that took repetitive work off the team's day.",
        pt: "Refatorei sistemas críticos em Next.js e criei extensões internas que tiraram trabalho repetitivo do dia a dia do time.",
      },
    },

    // --- Capítulo 5.5: Eventos ---
    {
      id: "step-events-1",
      waypoint: "EVENTS_BOARD",
      mascotDialogue: {
        pt: "Participo ativamente de eventos como AWS Summit e encontros de tecnologia para expandir conexões e conhecimentos.",
        en: "I actively participate in events like AWS Summit and technology meetups to expand connections and knowledge.",
      },
    },

    // --- Chapter 6: IFSP & What's Next ---
    {
      id: "step-future-1",
      waypoint: "IFSP_BOARD",
      mascotDialogue: {
        en: "I'm studying Systems Analysis at IFSP Bragança Paulista and running undergraduate research on MQTT security flaws.",
        pt: "Curso Análise e Desenvolvimento de Sistemas no IFSP Bragança Paulista e faço iniciação científica em falhas do MQTT.",
      },
    },
    {
      id: "step-future-2",
      waypoint: "OVERVIEW",
      mascotDialogue: {
        en: "That's the short version. If you want the evidence — projects, stack and results — it's all in the recruiter view.",
        pt: "Essa é a versão curta. Se quiser as evidências — projetos, stack e resultados — está tudo na visão do recrutador.",
      },
      ctas: [
        {
          label: {
            en: "Open the recruiter view",
            pt: "Abrir a visão do recrutador",
          },
          href: "/recruiter",
        },
      ],
    },
  ],
};
