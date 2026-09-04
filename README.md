# Portfolio

Portfólio pessoal em Next.js com dois modos de apresentação: uma experiência 3D imersiva (React Three Fiber, com um assistente narrador "storyteller") e uma visão estática para recrutadores, otimizada para SEO/ATS.

## Arquitetura

Aplicação Next.js única (App Router) organizada em Clean Architecture, com separação estrita entre domínio, features e apresentação:

- **`src/core/`** — domínio puro, sem dependência de React/Next.js/WebGL: entidades (`Project`, `Skill`, `Article`, `StoryScript`, `StoryTimeline`), dados estáticos do perfil, interfaces (`ICameraController`, `IWhiteboardDriver`, `IDialogController`) e stores Zustand puros.
- **`src/features/`** — capacidades verticais isoladas: `recruiter` (view para recrutadores), `scene-3d` (cena 3D voxel com React Three Fiber), `whiteboard` (canvas desenhado com Rough.js), `storyteller` (orquestração do mascote narrador), `events` e `whiteboard-assistant` (chat com IA).
- **`src/shared/`** — componentes de UI (shadcn), hooks e utilitários reutilizáveis.
- **`src/app/`** — rotas do Next.js (`/`, `/recruiter`, `sitemap.ts`, `robots.ts`, `api/chat/route.ts`).

Mais detalhes de decisões arquiteturais em `docs/architecture.md` e `docs/decisions.md`.

## Pré-requisitos

- Node.js (compatível com Next.js 16 / React 19)
- pnpm 11.18.0

## Variáveis de ambiente

Definidas em `.env.example`:

```
GROQ_API_KEY          # obrigatória apenas para o assistente do whiteboard (/api/chat)
GROQ_MODEL            # opcional, sobrescreve o modelo padrão (openai/gpt-oss-20b)
NEXT_PUBLIC_SITE_URL  # opcional, origem canônica do site (padrão: https://victorlisbronzo.me)
```

## Instalação e execução

```bash
pnpm install

pnpm dev      # inicia o servidor de desenvolvimento (Turbopack)
pnpm build    # build de produção
pnpm start    # inicia o servidor de produção
pnpm lint     # lint com Biome
pnpm format   # formata o código com Biome
```

## Testes

```bash
pnpm test        # roda os testes com Vitest
pnpm test:watch  # roda os testes em modo watch
```
