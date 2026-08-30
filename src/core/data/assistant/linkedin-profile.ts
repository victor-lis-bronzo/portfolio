import type { Localized } from "@/shared/i18n/types";

/**
 * Career record that backs the whiteboard assistant, condensed from the
 * curated LinkedIn source of truth.
 *
 * This is deliberately separate from `data/profile.ts` and `data/projects.ts`:
 * those are *shown* on the site and stay short, while this is only ever read by
 * the model. It carries the long tail — every certification, every course,
 * every side project, the recommendations — so the assistant can answer
 * specifics instead of hedging.
 *
 * Written as compact prose and one-line-per-item lists rather than the original
 * tables: the model reads it as context, not as a document to render. The
 * Portuguese is the curated source text; the English is a rewrite in the site's
 * own voice, not a literal translation.
 */
export const LINKEDIN_PROFILE: Record<string, Localized<string>> = {
	experience: {
		en: `## StarSeg — Junior Full-Stack Developer (Mar 2025 – present, Piracaia, SP)
I work the full lifecycle: requirements, architecture, implementation, deploy, maintenance.
- Architecture and back end: I lead the standardization effort, folding an ecosystem split across Fastify, Express and NestJS into one coherent Node.js model that is actually maintainable.
- Front end: I run the refactor of critical Next.js applications — Star-Condomine chief among them — targeting performance and the cost of changing the code later.
- IoT: I build and integrate the software side of hardware products — Star-Lockers (smart lockers) and Star-Gates (access control).
- Real time: hardware-to-software over MQTT and WebSockets, so physical devices can be monitored and driven from the web with low latency.
- DevOps: I brought Docker into the team and led the migration of the legacy systems onto containers, which gave us a deploy path that is the same everywhere.
- Internal tooling: I built a custom Chrome extension for the team, aimed at productivity and at keeping the digital workspace aligned with company policy.
- Beyond the code: I map operational bottlenecks and work with other departments to turn them into things worth building.

## Freelance — Independent developer (Sep 2024 – present, remote)
Registered company (CNPJ 62.416.012/0001-59). End-to-end delivery, on my own.
- Whole-project ownership: requirements, pricing, build, deploy.
- Direct client contact for scope, goals and deadlines.
- Balancing the engineering — scalable applications — against actually running the business side of it.
Formally the company is recent, but I have been taking freelance work for more than three years.`,
		pt: `## StarSeg — Desenvolvedor Full-Stack Júnior (mar/2025 – atual, Piracaia, SP)
Atuo no ciclo de vida completo: análise de requisitos, arquitetura, implementação, deploy e manutenção contínua.
- Arquitetura e back-end: lidero a padronização da infraestrutura, unificando um ecossistema espalhado entre Fastify, Express e NestJS em um modelo Node.js coeso e escalável.
- Front-end: conduzo a refatoração de aplicações críticas em Next.js (o Star-Condomine entre elas), com foco em performance e manutenibilidade da base de código.
- IoT: desenvolvo e integro o lado de software de produtos de hardware — Star-Lockers (armários inteligentes) e Star-Gates (controle de acesso).
- Tempo real: comunicação hardware/software via MQTT e WebSockets, viabilizando monitoramento e controle web de dispositivos físicos com baixa latência.
- DevOps: introduzi Docker no time e liderei a migração dos sistemas legados para contêineres, padronizando o ambiente de deploy.
- Ferramentas internas: desenvolvi uma extensão para Chrome voltada à produtividade e ao alinhamento das políticas da empresa.
- Além do código: mapeio gargalos operacionais e colaboro com outros setores para transformá-los em soluções tecnológicas.

## Freelance — Desenvolvedor autônomo (set/2024 – atual, remoto)
CNPJ 62.416.012/0001-59. Entrega de soluções fim a fim, por conta própria.
- Gerenciamento integral do projeto: levantamento de requisitos, precificação, construção e deploy.
- Comunicação direta com o cliente para escopo, metas e prazos.
- Equilíbrio entre a excelência técnica das aplicações e a gestão administrativa do negócio.
Formalmente a empresa é recente, mas atuo com freelances há mais de três anos.`,
	},

	education: {
		en: `## IFSP — Federal Institute of São Paulo, Bragança Paulista (Feb 2025 – Dec 2027, in progress)
Technology degree in Systems Analysis and Development.
First semester was mostly about adapting — new place, new people — plus administration and outreach coursework. The second semester was the steep part: patterns, architecture and the concepts the market actually asks for, including Clean Architecture and how to run deliveries in a team.

## Etec Prof. Carmine Biagio Tundisi, Atibaia (2022 – 2024)
Integrated technical course in Systems Development.
I did not stay inside my own course. I sought out students and staff from Administration and Marketing, built systems that cut down the school's own processes, turned ideas into finished projects, and spent a lot of time on communication — promoting events, organizing projects, passing information around. The practical projects were built to feel like real work: varied demands, real deadlines, different people.`,
		pt: `## IFSP — Instituto Federal de São Paulo, Bragança Paulista (fev/2025 – dez/2027, em andamento)
Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas.
O primeiro semestre foi sobre adaptação — ambiente novo, pessoas novas — além das matérias de administração e extensão. No segundo semestre veio a evolução vertical: patterns, arquitetura e os conceitos que o mercado cobra, incluindo Clean Architecture e gestão de entregas em equipe.

## Etec Prof. Carmine Biagio Tundisi, Atibaia (2022 – 2024)
Curso Técnico Integrado em Desenvolvimento de Sistemas.
Não fiquei restrito ao meu curso: busquei contato com alunos e profissionais de Administração e Marketing, desenvolvi sistemas para otimizar processos da própria instituição, transformei ideias em projetos concretos e trabalhei muito comunicação — divulgação de eventos, organização de projetos, repasse de informação. Os projetos práticos foram feitos para se aproximar da realidade do mercado: demandas variadas, prazos reais, pessoas diferentes.`,
	},

	skills: {
		en: `69 skills listed on LinkedIn, by area.
- Front end / UI: React.js, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, shadcn/ui, Zod, React Hook Form, React Hooks, NextAuth, responsive layout, colour theory, typography.
- Back end / architecture: Node.js, REST APIs, SOLID, Clean Code, Clean Architecture, software architecture, design patterns, Swagger, webhooks, Mercado Pago API, Stripe.
- Databases and ORMs: PostgreSQL, MySQL, SQL, MongoDB, Firebase, Cloud Firestore, Drizzle ORM, Prisma ORM.
- DevOps and infrastructure: Docker, Turborepo, pnpm and npm workspaces, CI/CD, Nginx, SSL certificates, Google Cloud Platform, cloud storage.
- IoT and embedded: C, embedded systems, Internet of Things.
- Data and AI: Python, Microsoft Power BI, artificial intelligence.
- Tools and general: Git, GitHub, programming logic, web applications, web development, problem solving, project management.
- Soft skills: leadership, public speaking, communication, teamwork, team management, scientific research.

17 endorsements, from: Lybio Moraes Junior (Python, Jun 2026); João Otávio Schonarth (TypeScript, Next.js, React.js, Node.js — Apr 2026); Paulo Cavalcante (Turborepo, Mar 2026); Gustavo Brun (Git, Zod, React Hook Form, PostgreSQL, NextAuth, Firebase, HTML — Oct 2024); Maria Tagomori (React, programming logic, TypeScript, embedded systems — May 2024).

Languages: Portuguese (native), English (professional working proficiency).`,
		pt: `69 competências listadas no LinkedIn, por área.
- Front-end / UI: React.js, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, shadcn/ui, Zod, React Hook Form, React Hooks, Next Auth, responsividade, teoria das cores, tipografia.
- Back-end / arquitetura: Node.js, APIs REST, S.O.L.I.D., Clean Code, Clean Architecture, arquitetura de software, padrões de projeto, Swagger, webhooks, Mercado Pago API, Stripe.
- Bancos de dados e ORMs: PostgreSQL, MySQL, SQL, MongoDB, Firebase, Cloud Firestore, Drizzle ORM, Prisma ORM.
- DevOps e infraestrutura: Docker, Turborepo, pnpm e npm workspaces, CI/CD, Nginx, certificados SSL, Google Cloud Platform, armazenamento em nuvem.
- IoT e embarcados: C, sistemas embarcados, Internet das Coisas.
- Dados e IA: Python, Microsoft Power BI, inteligência artificial.
- Ferramentas e geral: Git, GitHub, lógica de programação, aplicativos web, desenvolvimento web, resolução de problemas, gestão de projetos.
- Soft skills: liderança, oratória, comunicação, trabalho em equipe, gestão de equipes, pesquisa científica.

17 endorsements, de: Lybio Moraes Junior (Python, jun/2026); João Otávio Schonarth (TypeScript, Next.js, React.js, Node.js — abr/2026); Paulo Cavalcante (Turborepo, mar/2026); Gustavo Brun (Git, Zod, React Hook Form, PostgreSQL, Next Auth, Firebase, HTML — out/2024); Maria Tagomori (React, lógica de programação, TypeScript, sistemas embarcados — mai/2024).

Idiomas: português (nativo), inglês (profissional).`,
	},

	certifications: {
		en: `91 certifications. Grouped by issuer; dates are when each was completed.

- DIO (44). Data and BI, Jun–Jul 2024: BI fundamentals, data analysis with SQL, ETL theory, KPIs and metrics, first steps with Power BI, Power BI fundamentals, working with visuals, analysing a sales dashboard, building interactive dashboards, Coding the Future Sysvision opening class, complementary material; plus Git and GitHub versioning, contributing to open source, building a winning portfolio, code challenges for computational thinking, and the DIO bootcamps track. GitHub Copilot bootcamp with Microsoft, Jan 2025 (11 modules: what Copilot is, setup and use, prompt engineering for Copilot, Copilot Chat, a credit-card flag validator built with Copilot, Copilot beyond the IDE, licensing, Copilot for Business and beta, plus the bootcamp intro and certificate). TypeScript track, Jan 2025: introduction, OOP with TypeScript, a simple banking app, fundamentals and complementary material. React + TypeScript track, Jan–Feb 2025: introduction (twice), building pages, a homepage, state and API consumption, routing, global state, local storage, a user-detail page, advanced React with TypeScript.
- Fundação Bradesco (9), Aug 2024: a simple site with HTML/CSS/JS, professional development, LGPD (Brazilian data protection law), resilience, PowerPoint 2016 basic and advanced, graphic design fundamentals, written communication, improving your presentations (62h).
- IFSP (5): AI driving digital transformation (Oct 2025), the energy transition and opportunities for young professionals (Oct 2025), Tokyokê at ExpoEXT 2025 as exhibitor (Nov 2025), 1st IFSP Bragança programming challenge (Nov 2025), Coding Dojo workshop at the freshman welcome week (Feb 2026).
- TOTVS (5), Nov 2024: BPM process management (basic), TOTVS Fluig Dev Start, TOTVS Identity Express, TOTVS Identity Intermediate, WCM portal management.
- Etec Prof. Carmine Biagio Tundisi (3): WordPress rapid site development (Sep 2022), data analysis with SharePoint and Power BI (Oct 2022), promoting the 2023 and 2024 entrance exams (Dec 2024).
- Uniube Atibaia (3): HTML5 (Nov 2023), IT fundamentals (Nov 2023), web design / front-end and robotics (Jan 2025).
- UNIFAAT (2): VI Multidisciplinary Technology Project Show (Jun 2024), V Research and Scientific Initiation Congress (Nov 2024).
- Google Developer Groups (2): Build with AI Colab, GDG Americana & Caraguá (Apr 2026) and GDG São Paulo (May 2026).
- LinkedIn Learning (2), Jan 2025: Next.js fundamentals, React fundamentals.
- Sebrae (2), Mar 2025: 11th Startup Day and its training track.
- Santander Open Academy (2), Sep 2024: Internet of Things, storytelling for digital marketing.
- SENAI Bragança Paulista (1): Microsoft AI-900, Nov 2023 (licence 1005993).
- Cod3r (1): complete modern web with JavaScript + projects, Feb 2024.
- Sujeito Programador (1): Next.js from zero to advanced, Feb 2024.
- Iuri Code (1): FrontCode, Jan 2025.
- JavaScript Mastery (1): complete JavaScript, basics to advanced, with practical projects, Oct 2025.
- Full Stack Club (1): Self-Checkout, Full-Stack Week, Sep 2025.
- Rocketseat (1): NLW Pocket, intermediate full-stack JavaScript, Sep 2024.
- OneBitCode (1): Start — HTML, CSS and JavaScript, Oct 2024.
- Grow with Google on Coursera (1): UX design foundations, Jul 2023.
- Fatec Atibaia (1): AI in the classroom, Feb 2025.
- Fluency Academy (1): English — Basic, Dec 2025.
- Expo Empreendedor (1): Expo Empreendedor 2026, Jul 2026.`,
		pt: `91 certificações. Agrupadas por instituição; as datas são de conclusão.

- DIO (44). Dados e BI, jun–jul/2024: fundamentos de BI, análise de dados com SQL, fundamentos teóricos de ETL, KPIs e métricas, primeiros passos com Power BI, fundamentos de Power BI, visuais no Power BI, análise de dashboard de vendas, dashboards interativos, aula inaugural Coding The Future Sysvision e materiais complementares; além de versionamento com Git e GitHub, contribuição em projeto open source, portfólio vencedor, desafios de código para pensamento computacional e a trilha de bootcamps da DIO. Bootcamp Microsoft AI for Tech — GitHub Copilot, jan/2025 (11 módulos: o que é o Copilot, configuração e uso, prompt engineering para Copilot, Copilot Chat, validador de bandeiras de cartão com Copilot, Copilot além da IDE, licenciamento, Copilot para negócios e beta, introdução e certificado do bootcamp). Trilha TypeScript, jan/2025: introdução, POO com TypeScript, app simples de banco, fundamentos e materiais complementares. Trilha React + TypeScript, jan–fev/2025: introdução (dois módulos), criação de páginas, homepage, estado e consumo de APIs, rotas, estados globais, local storage, página de detalhes do usuário e conceitos avançados.
- Fundação Bradesco (9), ago/2024: site simples com HTML, CSS e JavaScript; desenvolvimento profissional; LGPD; resiliência; PowerPoint 2016 básico e avançado; fundamentos do design gráfico; comunicação escrita; aprimorando suas apresentações (62 horas).
- IFSP (5): a IA impulsionando a transformação digital (out/2025), transição energética e oportunidades para jovens profissionais (out/2025), Tokyokê na ExpoEXT 2025 como expositor (nov/2025), 1º Desafio de Programação IFSP Bragança (nov/2025), oficina de Coding Dojo na semana de acolhimento (fev/2026).
- TOTVS (5), nov/2024: gestão de processos (BPM) básico, TOTVS Fluig Dev Start, TOTVS Identity Express, TOTVS Identity Intermediate, WCM — gestão de portais.
- Etec Prof. Carmine Biagio Tundisi (3): WordPress para desenvolvimento rápido de sites (set/2022), análise de dados com SharePoint e Power BI (out/2022), divulgação dos vestibulinhos de 2023 e 2024 (dez/2024).
- Uniube Atibaia (3): HTML5 (nov/2023), informática (nov/2023), web designer / front-end e robótica (jan/2025).
- UNIFAAT (2): VI Mostra de Projetos Multidisciplinares de Tecnologia (jun/2024), V Congresso de Pesquisa e Iniciação Científica (nov/2024).
- Google Developer Groups (2): Build with AI Colab, GDG Americana & Caraguá (abr/2026) e GDG São Paulo (mai/2026).
- LinkedIn Learning (2), jan/2025: fundamentos de Next.js, fundamentos de React.
- Sebrae (2), mar/2025: 11ª edição do Startup Day e a capacitação do evento.
- Santander Open Academy (2), set/2024: Internet das Coisas, storytelling para marketing digital.
- SENAI Bragança Paulista (1): Microsoft AI-900, nov/2023 (licença 1005993).
- Cod3r (1): curso web moderno completo com JavaScript + projetos, fev/2024.
- Sujeito Programador (1): Next.js do zero ao avançado, fev/2024.
- Iuri Code (1): FrontCode, jan/2025.
- JavaScript Mastery (1): JavaScript completo do básico ao avançado com projetos práticos, out/2025.
- Full Stack Club (1): Self-Checkout, Full-Stack Week, set/2025.
- Rocketseat (1): NLW Pocket, JavaScript full-stack intermediário, set/2024.
- OneBitCode (1): Start — HTML, CSS e JavaScript, out/2024.
- Grow with Google no Coursera (1): fundamentos do design de experiência do usuário (UX), jul/2023.
- Fatec Atibaia (1): inteligência artificial na sala de aula, fev/2025.
- Fluency Academy (1): inglês básico, dez/2025.
- Expo Empreendedor (1): Expo Empreendedor 2026, jul/2026.`,
	},

	projectArchive: {
		en: `23 documented projects, newest first. The site's featured list is a subset of this.

- Legal Eagle RAG on GCP (May 2026). A retrieval-augmented generation app over legal documents, built at a GDG workshop: Cloud Storage, Firestore as the vector database, Cloud Run with Eventarc for serverless compute, Vertex AI and LangChain orchestrating the LLM. https://github.com/victor-lis-bronzo/legal-eagle-rag-review
- Git Assets, v2 (Feb–May 2026). The rebuild and rebrand of Git Cards. Monorepo on pnpm workspaces and Turborepo, split into @database (Prisma), @packages (DTOs and schemas), @core (business logic), @api (routes and webhooks) and @web (Next.js). Server Actions call @core directly, which cut a network hop and kept the logic server-side. https://gitassets.victorlisbronzo.me — https://github.com/victor-lis-bronzo/gitassets
- Git Cards, v1 (Dec 2025–Jan 2026). Dynamic charts and assets for GitHub READMEs, edited visually. Next.js front end, Node.js back end, monetised through Mercado Pago webhooks. https://gitcards.victorlisbronzo.me
- Self-Checkout, FSW (Sep–Oct 2025). Self-service ordering for multiple restaurants. Next.js 15, Prisma, PostgreSQL, Docker, Stripe with webhooks. https://self-checkout-by-victor-lis.vercel.app/fsw-donalds — https://github.com/victor-lis-bronzo/self-checkout
- Mercado Pago API template (Aug 2025). A back-end starter for Mercado Pago integrations: Node.js, TypeScript, Fastify, Swagger, Docker, Ngrok, and webhook signature validation. https://github.com/victor-lis-bronzo/mercado-pago-api
- CodeUp (Jun–Jul 2025). A Python coding-challenge platform. Next.js + TypeScript + Tailwind + shadcn/ui on the front, Node.js + Fastify on the back, a PHP validator, PostgreSQL + Prisma, NextAuth, all under Docker Compose. https://github.com/victor-lis-bronzo/CodeUp
- Cap-Dunk: recycle by playing (Apr–Jul 2025). Gamified bottle-cap collector. ESP32, KY-008 laser sensor and LDR, LED feedback, TCP to a server, web app for monitoring. A 135-person survey said 98.5% would take part. Aligned with UN SDGs 11 and 12.
- Tokyokê (Mar–Jun 2025). Karaoke web platform for a fictional venue in Liberdade, São Paulo, with queue management. HTML, CSS, JavaScript, deployed on Vercel. IFSP outreach project.
- Eco-Play, final-year project (Oct 2023–Dec 2024). Gamified bottle-cap recycling with Arduino, a laser sensor and an LDR. The scientific paper was published in the UNIFAAT proceedings (Bienal 2024), backed by the same 135-person survey.
- Eco-Play: gamification for sustainability (Jun–Nov 2024). The version presented at UNIFAAT's V Research and Scientific Initiation Congress: Arduino prototype, sensor, LED scoreboard, built from low-cost recyclable materials.
- in.orbit (Sep 2024). Weekly goal tracking, built during Rocketseat's NLW on the intermediate full-stack JavaScript track.
- Spring Festival 2024 project portal (Sep 2024). Project registration and student sign-up for Etec. Next.js + Supabase, shipped in under a day.
- Etec Chamados (May–Jun 2024). Queue system for student requests at the school office. TypeScript, React, Next.js, Tailwind, NextAuth, Prisma, PostgreSQL.
- FETEPS — Eco-Play (Oct 2023–Mar 2024). The Centro Paula Souza project fair. First contact with SWOT analysis, Business Model Canvas and writing a scientific paper.
- Resistor Calculator (Mar 2024). Reads resistor colour bands to power and back again. Built for embedded-systems coursework.
- StudyPlus on Next.js (Feb 2024). The rebuild of StudyPlus with Next.js, Google auth and server-side rendering.
- Dev Controle (Jan–Feb 2024). Support-ticket management. Next.js 14, TypeScript, Tailwind, Prisma, MongoDB Atlas, NextAuth.
- Daly Games (Jan 2024). Game catalogue mixing client- and server-side rendering. Next.js 14, TypeScript, Tailwind.
- My Links in Three.js (Jan 2024). An interactive 3D link page, built in a week.
- Study-Plus (Dec 2023–Jan 2024). Study-organisation platform. React, styled-components, Node.js, Prisma.
- Stop Matemático (Sep–Dec 2023). Mobile maths game with login and rankings. React Native, Firebase Realtime Database.
- Vestibulinho project, web and mobile (Sep–Nov 2023). Etec entrance-exam outreach platform. React on the web, React Native on mobile, Firebase.
- Lanches+ , web and mobile (May–Jun 2023). Dynamic snack shop with QR-code ordering. React on the web, React Native for the admin app, Firebase.`,
		pt: `23 projetos documentados, do mais recente ao mais antigo. A lista em destaque do site é um recorte desta.

- Legal Eagle RAG no GCP (mai/2026). Aplicação RAG sobre documentos jurídicos, feita em um workshop do GDG: Cloud Storage, Firestore como vector database, Cloud Run com Eventarc para computação serverless, Vertex AI e LangChain orquestrando o LLM. https://github.com/victor-lis-bronzo/legal-eagle-rag-review
- Git Assets, v2 (fev–mai/2026). Evolução e rebranding do Git Cards. Monorepo com pnpm workspaces e Turborepo, dividido em @database (Prisma), @packages (DTOs e schemas), @core (lógica central), @api (rotas e webhooks) e @web (Next.js). Server Actions consomem o @core direto, o que tirou um hop de rede e manteve a lógica no servidor. https://gitassets.victorlisbronzo.me — https://github.com/victor-lis-bronzo/gitassets
- Git Cards, v1 (dez/2025–jan/2026). Gráficos e assets dinâmicos para READMEs do GitHub, com edição visual. Front-end Next.js, back-end Node.js, monetização via webhooks do Mercado Pago. https://gitcards.victorlisbronzo.me
- Self-Checkout, FSW (set–out/2025). Autoatendimento para múltiplos restaurantes. Next.js 15, Prisma, PostgreSQL, Docker, Stripe com webhooks. https://self-checkout-by-victor-lis.vercel.app/fsw-donalds — https://github.com/victor-lis-bronzo/self-checkout
- Template da API do Mercado Pago (ago/2025). Base de back-end para integrações com o Mercado Pago: Node.js, TypeScript, Fastify, Swagger, Docker, Ngrok e validação de assinatura de webhooks. https://github.com/victor-lis-bronzo/mercado-pago-api
- CodeUp (jun–jul/2025). Plataforma de desafios de programação em Python. Next.js + TypeScript + Tailwind + shadcn/ui no front, Node.js + Fastify no back, validador em PHP, PostgreSQL + Prisma, NextAuth, tudo sob Docker Compose. https://github.com/victor-lis-bronzo/CodeUp
- Cap-Dunk: recicle jogando (abr–jul/2025). Coletor gamificado de tampas plásticas. ESP32, sensor laser KY-008 e LDR, LED, comunicação TCP com o servidor e aplicação web de monitoramento. Pesquisa com 135 pessoas: 98,5% participariam. Alinhado aos ODS 11 e 12 da ONU.
- Tokyokê (mar–jun/2025). Plataforma web de karaokê para uma casa fictícia no bairro da Liberdade, em São Paulo, com gerenciamento de filas. HTML, CSS e JavaScript, deploy na Vercel. Projeto de extensão do IFSP.
- Eco-Play, TCC (out/2023–dez/2024). Reciclagem gamificada de tampas plásticas com Arduino, sensor laser e LDR. Artigo científico publicado nos anais da UNIFAAT (Bienal 2024), apoiado na mesma pesquisa com 135 pessoas.
- Eco-Play: gamificação para sustentabilidade (jun–nov/2024). Versão apresentada no V Congresso de Pesquisa e Iniciação Científica da UNIFAAT: protótipo com Arduino, sensor e placar de LED, feito com materiais recicláveis de baixo custo.
- in.orbit (set/2024). Organização de metas semanais, desenvolvido na NLW da Rocketseat, trilha JavaScript full-stack intermediário.
- Portal de Projetos do Festival da Primavera 2024 (set/2024). Cadastro de projetos e inscrição de alunos da Etec. Next.js + Supabase, entregue em menos de um dia.
- Etec Chamados (mai–jun/2024). Sistema de fila para atendimento de alunos na secretaria da Etec. TypeScript, React, Next.js, Tailwind, Next Auth, Prisma, PostgreSQL.
- FETEPS — Eco-Play (out/2023–mar/2024). Feira de projetos do Centro Paula Souza. Primeiro contato com análise SWOT, Canvas e escrita de artigo científico.
- Resistor Calculator (mar/2024). Converte as cores de um resistor em potência e vice-versa. Feito para os estudos de sistemas embarcados.
- StudyPlus com Next.js (fev/2024). Nova versão do StudyPlus com Next.js, autenticação Google e SSR.
- Dev Controle (jan–fev/2024). Sistema de gerenciamento de chamados. Next.js 14, TypeScript, Tailwind, Prisma, MongoDB Atlas, NextAuth.
- Daly Games (jan/2024). Catálogo de jogos combinando renderização client-side e server-side. Next.js 14, TypeScript, Tailwind.
- Meus Links com Three.js (jan/2024). Página 3D interativa de divulgação de links, construída em uma semana.
- Study-Plus (dez/2023–jan/2024). Plataforma de organização de estudos. React, styled-components, Node.js, Prisma.
- Stop Matemático (set–dez/2023). Jogo matemático mobile com login e rankings. React Native, Firebase Realtime Database.
- Projeto Vestibulinho, web e mobile (set–nov/2023). Plataforma de divulgação da Etec. React na web, React Native no mobile, Firebase.
- Lanches+, web e mobile (mai–jun/2023). Loja de lanches dinâmica com pedidos por QR Code. React na web, React Native no app administrativo, Firebase.`,
	},

	recommendations: {
		en: `Four written recommendations received on LinkedIn.

- Lucas Almeida de Souza, Full-Stack Developer at StarSeg (19 Aug 2025): "Victor is an excellent professional, he has a broad knowledge as a web programmer, and on top of that he communicates well, handles pressure and teaches very well. A professional with strong hard skills and soft skills alike — a great balance. Victor is an excellent developer, and I had the honour of both studying and working with him. I recommend him without reservation."
- Mariana Mourão Sampaio, Database Developer, PL/SQL at Reply (6 Aug 2025): "I met Victor at ETEC during secondary school and, even in different year groups, we built a real partnership. He was always welcoming and open with everyone. We now study together at IFSP, and learning alongside him is a great experience — beyond being an incredible person, he works very well in a team and is always willing to help."
- Pedro Sanches, Maintenance Planning Assistant at Castelatto (6 May 2025): "I studied with Victor in secondary school and I can say I learned a lot from him. He is genuinely one of the most talented people I know — I can recommend him and vouch that he is, and will be, a remarkable professional."
- Iago Rodrigues, Junior Fluig Developer at Boa Digital (7 Feb 2025): "I had the chance to study with Victor and to watch his dedication and skill as a developer up close. He always stood out for solving problems efficiently and for wanting to learn new things. I recommend Victor as a talented and committed professional."

Four recommendations written for others, for the same people: Pedro Sanches, Mariana Mourão Sampaio, Lucas Almeida de Souza and Iago Rodrigues.`,
		pt: `Quatro recomendações recebidas no LinkedIn.

- Lucas Almeida de Souza, Desenvolvedor Full Stack na StarSeg (19/08/2025): "Victor é um profissional excelente, tem um vasto conhecimento como um programador web, e além disso tem ótima comunicação, sabe lidar sob pressão e sabe ensinar muito bem! Um profissional que tem tanto fortes hard skills como soft skills, ótimo equilíbrio! Victor é um excelente desenvolvedor com quem tive a honra de estudar e trabalhar, recomendo demais!"
- Mariana Mourão Sampaio, Database Developer | PL/SQL na Reply (06/08/2025): "Conheci o Victor na ETEC durante o ensino médio e, mesmo estando em períodos diferentes, construímos uma grande parceria. Ele sempre foi muito acolhedor e comunicativo com todos. Atualmente, estudamos juntos no IFSP, e é uma ótima experiência poder aprender ao lado dele, além de ser uma pessoa incrível, ele trabalha muito bem em equipe e está sempre disposto a colaborar."
- Pedro Sanches, Assistente de PCM na Castelatto (06/05/2025): "Durante o ensino médio estudei com o Victor e posso dizer que aprendi muito com ele! Definitivamente é uma das pessoas mais talentosas que eu conheço, posso recomendar e assegurar que ele é/será um profissional espetacular!"
- Iago Rodrigues, Desenvolvedor Junior Fluig na Boa Digital (07/02/2025): "Tive a oportunidade de estudar com Victor e pude acompanhar de perto sua dedicação e habilidades como desenvolvedor. Ele sempre se destacou pela capacidade de resolver problemas eficientemente e pela vontade de aprender coisas novas. Recomendo o Victor como um profissional talentoso e comprometido."

Quatro recomendações escritas para outras pessoas, as mesmas quatro: Pedro Sanches, Mariana Mourão Sampaio, Lucas Almeida de Souza e Iago Rodrigues.`,
	},

	learning: {
		en: `48 LinkedIn Learning courses, by area. Entries marked "saved" are queued rather than finished.

- Web and front end: React fundamentals (Jan 2025), Next.js fundamentals (Jan 2025), advanced JavaScript functions (Sep 2025), programming foundations beyond the basics (Jan 2025), ASP.NET Core fundamentals (Mar 2026), Learning RxJS (Aug 2026), discovering CSS (saved).
- Back end and languages: Node.js essential training (Sep 2024), Java basics (Jan 2025), advanced Java (Sep 2024), Python basics (Sep 2023), advanced Python (Aug 2023), Python files and I/O (Apr 2026), Python with Kivy (May 2026), Python code challenge (Apr 2026), data visualisation with Python (Jan 2025), Rust fundamentals (Apr 2026), PHP fundamentals (Sep 2025).
- Databases: SQL programming (Sep 2024), SQL Server basics (saved).
- DevOps and infrastructure: Kubernetes fundamentals (Aug 2025), GitHub Actions basics (Sep 2024), Git and GitHub basics (Feb 2025), Windows Server fundamentals (Jun 2025).
- Data structures and algorithms: programming foundations — data structures (Dec 2023).
- AI and generative AI: generative AI for creative professionals — opportunity, challenge and ethics (Sep 2024), AI beyond the engineering (Jan 2024), AI strategies for immediate and sustainable results (Apr 2025), AI-900 generative AI overview and use cases (Jan 2025), building applications with v0 (May 2026), building applications with Lovable (Jun 2026), prompt engineering (Oct 2024).
- Security: cybersecurity fundamentals (Aug 2024), IT security — network security (Jul 2024), IT security basics (Sep 2023).
- Quality and testing: programming foundations — software testing and QA (Sep 2024).
- Project management and productivity: software project management fundamentals (Jun 2024), project management with Microsoft Teams (Jul 2024), Power BI dashboards for beginners (Jan 2024), advanced Excel VBA (Jan 2025).
- Leadership and soft skills: assertive communication for high-performing managers (Mar 2025), standing out in your first leadership role (Apr 2024), one-minute habits for successful leadership (Mar 2025), driving innovation with test and learn (Jan 2024), plus creative leadership, high-impact leadership strategies, agile leadership and empowerment in leadership 4.0 (saved).
- Design and UX: design thinking — method, stages and applications (Apr 2025), design thinking in practice inside a company (Apr 2025).
- Career: LinkedIn for job searching (Nov 2023), building your professional image (Nov 2023), plus finding a job in IT and iOS app development basics (saved).
- Business and ESG: strategic negotiation for sales (Aug 2024), introduction to ESG (Nov 2023), green skills for a sustainable economy (Jun 2024).
- Diversity and inclusion: embracing the LGBTQ+ community at work (Feb 2025), building alliances to lead an organisation (Aug 2024).
- Software architecture: moving from development into architecture (saved).`,
		pt: `48 cursos do LinkedIn Learning, por área. Os marcados como "salvo" estão na fila, ainda não concluídos.

- Web e front-end: fundamentos de React (jan/2025), fundamentos de Next.js (jan/2025), funções avançadas de JavaScript (set/2025), fundamentos de programação além dos conceitos básicos (jan/2025), fundamentos de ASP.NET Core (mar/2026), Learning RxJS (ago/2026), descubra o CSS (salvo).
- Back-end e linguagens: Node.js Essential Training (set/2024), Java formação básica (jan/2025), técnicas avançadas de Java (set/2024), Python formação básica (set/2023), técnicas avançadas de Python (ago/2023), fundamentos de Python — arquivos e I/O (abr/2026), fundamentos de Python — Kivy (mai/2026), desafio de programação Python (abr/2026), visualização de dados com Python (jan/2025), fundamentos de Rust (abr/2026), fundamentos de PHP (set/2025).
- Bancos de dados: programação SQL (set/2024), SQL Server formação básica (salvo).
- DevOps e infraestrutura: fundamentos de Kubernetes (ago/2025), GitHub Actions formação básica (set/2024), Git e GitHub formação básica (fev/2025), fundamentos de Windows Server (jun/2025).
- Estruturas de dados e algoritmos: fundamentos de programação — estruturas de dados (dez/2023).
- IA e IA generativa: IA generativa para profissionais criativos — oportunidades, desafios e ética (set/2024), IA além da engenharia (jan/2024), estratégias inovadoras para resultados imediatos e sustentáveis (abr/2025), IA-900 visão geral da IA generativa e casos de uso (jan/2025), criando aplicações com o v0 (mai/2026), criando aplicações com o Lovable (jun/2026), prompt engineering (out/2024).
- Segurança: fundamentos de cibersegurança (ago/2024), segurança de TI — segurança de rede (jul/2024), segurança de TI — noções básicas (set/2023).
- Qualidade e testes: fundamentos de programação — teste de software e garantia de qualidade (set/2024).
- Gestão de projetos e produtividade: fundamentos de gestão de projetos de software (jun/2024), gestão de projetos com Microsoft Teams (jul/2024), Power BI dashboards para iniciantes (jan/2024), Excel VBA avançado (jan/2025).
- Liderança e soft skills: comunicação assertiva para gestores de alto desempenho (mar/2025), como se destacar no primeiro cargo de liderança (abr/2024), hábitos de 1 minuto para uma liderança de sucesso (mar/2025), potencializar a inovação com Test & Learn (jan/2024), além de liderança criativa, liderança de alto impacto, liderança ágil e empoderamento na liderança 4.0 (salvos).
- Design e UX: design thinking — metodologia, etapas e aplicações (abr/2025), design thinking na prática dentro da empresa (abr/2025).
- Carreira: LinkedIn para busca de oportunidades (nov/2023), como desenvolver sua imagem profissional (nov/2023), além de como encontrar emprego em TI e desenvolvimento de aplicativos iOS (salvos).
- Negócios e ESG: negociação estratégica para vendas (ago/2024), introdução ao ESG (nov/2023), competências verdes para uma economia sustentável (jun/2024).
- Diversidade e inclusão: como abraçar a comunidade LGBTQ+ nas empresas (fev/2025), como desenvolver alianças para liderar a organização (ago/2024).
- Arquitetura de software: transição do desenvolvimento para a arquitetura (salvo).`,
	},

	numbers: {
		en: `Figures worth quoting when someone asks for the shape of the record: 4+ years building software, 91 certifications, 23 documented projects, 69 skills listed on LinkedIn, 17 endorsements, 4 recommendations received and 4 written, 48 LinkedIn Learning courses, 1 published scientific paper (UNIFAAT proceedings, Bienal 2024).

What actually differentiates the record:
- Full stack in the literal sense: modern front end (React, Next.js), a back end built on Fastify/Express with Clean Architecture, and the DevOps to ship it (Docker, CI/CD).
- Hardware, not just software: ESP32, Arduino, sensors, MQTT and WebSockets in production products.
- Current AI work: RAG on GCP with Vertex AI, LangChain and a vector database.
- Serious monorepos: Turborepo and pnpm workspaces with strict package boundaries.
- Research that got published, plus FETEPS and CONFAAT.
- Own company, and more than three years of freelance work run end to end.
- Every recommendation independently mentions teaching, communication and teamwork.`,
		pt: `Números para quando alguém quiser a dimensão do histórico: 4+ anos criando software, 91 certificações, 23 projetos documentados, 69 competências listadas no LinkedIn, 17 endorsements, 4 recomendações recebidas e 4 escritas, 48 cursos do LinkedIn Learning, 1 artigo científico publicado (anais da UNIFAAT, Bienal 2024).

O que de fato diferencia o histórico:
- Full-stack no sentido literal: front-end moderno (React, Next.js), back-end em Fastify/Express com Clean Architecture e o DevOps para colocar isso no ar (Docker, CI/CD).
- Hardware, não só software: ESP32, Arduino, sensores, MQTT e WebSockets em produtos de verdade.
- IA atual: RAG no GCP com Vertex AI, LangChain e vector database.
- Monorepos levados a sério: Turborepo e pnpm workspaces com fronteiras estritas entre pacotes.
- Pesquisa que virou publicação, além de FETEPS e CONFAAT.
- CNPJ próprio e mais de três anos de freelance tocado de ponta a ponta.
- Todas as recomendações citam, por conta própria, didática, comunicação e trabalho em equipe.`,
	},
};
