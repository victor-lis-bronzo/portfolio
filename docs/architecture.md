# Arquitetura

Este projeto segue Clean Architecture com separação estrita entre domínio, features e
apresentação, aplicando os princípios SOLID. A estrutura abaixo é o alvo completo da
especificação do produto; Fase 1 e Fase 2 já implementadas (marcadas com ✅), o resto são
diretórios reservados para as próximas fases.

```
src/
├── core/                           # Domínio puro — zero dependência de UI/framework
│   ├── entities/                   # ✅ Project, Skill, Article (Fase 2)
│   ├── data/                       # ✅ dossiê estático — projects/skills/articles/profile (Fase 2)
│   ├── interfaces/                 # (reservado — Fase 3+: ICameraController, IWhiteboardDriver, IStoryScript)
│   └── state/                      # ✅ Zustand Store — mode-store.ts
├── features/
│   ├── storyteller/                # (reservado — Fase 5)
│   ├── scene-3d/                   # ✅ placeholder — Fase 4 implementa de fato
│   ├── whiteboard/                 # (reservado — Fase 3)
│   └── recruiter/                  # ✅ Fase 2 — recruiter-view.tsx + components/
├── shared/
│   ├── components/                 # ✅ mode-switcher.tsx, mode-hydration-boundary.tsx
│   │   └── ui/                     # ✅ componentes shadcn (tabs, button, badge)
│   ├── hooks/                      # ✅ use-mode.ts
│   └── lib/                        # ✅ utils.ts, site-config.ts (SITE_URL)
└── app/
    ├── layout.tsx                  # ✅ Root Shell com o switcher de modo + metadata base
    ├── page.tsx                    # ✅ `/` — sempre a experiência Immersive
    ├── recruiter/
    │   └── page.tsx                # ✅ `/recruiter` — rota SSG dedicada (Fase 2)
    ├── sitemap.ts                  # ✅ Fase 2
    ├── robots.ts                   # ✅ Fase 2
    └── api/chat/route.ts           # (reservado — Fase 5, handler de IA opcional)
```

## Por que cada camada existe

- **`core/`** não pode importar nada de React, Next.js ou qualquer biblioteca de UI. Hoje
  contém só `mode-store.ts`, que é puro Zustand — lógica de estado sem nenhuma dependência
  de renderização. Isso é o que garante que o domínio possa ser testado, reaproveitado ou
  até trocado de framework de UI sem reescrever a lógica de negócio.
- **`features/`** agrupa capacidades verticais do produto (storyteller, scene-3d,
  whiteboard, recruiter). Cada uma pode evoluir de forma independente, sem que uma
  precise conhecer os detalhes internos da outra.
- **`shared/`** é o que várias features/o app usam em comum: componentes de UI puros
  (incluindo os primitivos do shadcn), hooks reutilizáveis e utilitários.
- **`app/`** é a camada de composição/roteamento do Next.js — só monta as peças
  (`core`, `shared`, `features`), não contém lógica de domínio.

### Erro cometido e corrigido: onde vive um componente de UI

Durante a implementação da Fase 1, `ModeHydrationBoundary` (um componente `"use client"`
que apenas dispara `useModeStore.persist.rehydrate()` num `useEffect`) foi criado por
engano dentro de `core/state/`. Uma revisão de código pegou isso: por ser um componente
React que retorna JSX, ele não pertence à camada de domínio puro — foi movido para
`shared/components/mode-hydration-boundary.tsx`, deixando `core/state/mode-store.ts`
como o único arquivo da camada `core/state`, e esse sim 100% livre de React. Esse é o
critério prático para decidir onde um arquivo novo deve morar: **se o arquivo importa
React/JSX/DOM, ele nunca vai em `core/`.**

## Mapeamento aos princípios SOLID

1. **SRP (Single Responsibility)** — `mode-store.ts` faz só uma coisa: gerenciar o
   estado do modo ativo e sua persistência. `mode-switcher.tsx` faz só uma coisa:
   renderizar o controle de UI. `mode-hydration-boundary.tsx` faz só uma coisa: garantir
   que a rehidratação do estado persistido aconteça no momento certo do ciclo de vida.
2. **OCP (Open/Closed)** — novos modos (se algum dia existirem além de
   `IMMERSIVE`/`RECRUITER`) seriam adicionados estendendo o union type `Mode` e o switch
   dentro do store, sem precisar alterar `ModeSwitcher`, `useMode` ou `page.tsx`, que já
   operam sobre o tipo genericamente.
3. **LSP (Liskov Substitution)** — ainda não há uma interface com múltiplas
   implementações trocáveis na Fase 1 (isso chega nas próximas fases, com
   `IWhiteboardDriver`/`ICameraController`). O princípio já está refletido na decisão de
   `core/interfaces/` existir como diretório reservado exatamente para esse propósito.
4. **ISP (Interface Segregation)** — o hook `useMode()` expõe só `mode`, `setMode` e
   `toggleMode`; ele não vaza a API interna do Zustand (`getState`, `subscribe`, etc.)
   para os componentes que só precisam ler/alternar o modo.
5. **DIP (Dependency Inversion)** — `page.tsx` e `mode-switcher.tsx` dependem do hook
   `useMode()` (uma abstração), não diretamente do `useModeStore` do Zustand. Se a
   implementação de estado mudar no futuro, só o hook precisa mudar.

## Fluxo do switch de modo

```
useModeStore (Zustand + persist, skipHydration: true)
        │
        ├── useMode() hook (shared/hooks) — expõe mode/setMode/toggleMode
        │       │
        │       ├── ModeSwitcher (shared/components) — UI (Tabs do shadcn)
        │       └── Home / page.tsx (app) — decide qual placeholder renderizar
        │
        └── ModeHydrationBoundary (shared/components)
                — monta em layout.tsx, chama persist.rehydrate() no useEffect
```

## Fase 2 — Módulo Recrutador & SSR

### `/recruiter` é uma rota própria, não um branch de render em `/`

Na Fase 1, `page.tsx` decidia entre `ImmersivePlaceholder`/`RecruiterPlaceholder` no
client, olhando `useMode().mode` — ou seja, o conteúdo do Recrutador só existia "dentro"
de `/`, nunca era visitado como página própria, e por isso nunca era SSR/indexável de
fato (primeiro paint sempre Immersive; conteúdo real só aparecia após um toggle no
client). Na Fase 2 isso foi corrigido criando `src/app/recruiter/page.tsx` como rota
própria: `pnpm build` confirma que ela sai como `○ (Static)` — SSG real, gerada em build
time, servindo HTML completo (texto de projetos/skills/CV, `<script
type="application/ld+json">`) sem depender de JavaScript no client.

`ModeSwitcher` (`src/shared/components/mode-switcher.tsx`) deixou de só alternar estado
local do Zustand e passou a navegar de verdade: usa `usePathname()` para saber qual aba
está ativa (`pathname === "/recruiter"` → aba "Recrutador") e `useRouter().push(...)`
para trocar de rota ao clicar. `setMode()` continua sendo chamado (mantém o
`useModeStore` como "última preferência do usuário", útil para as Fases 4/5), mas quem
decide o que é renderizado agora é o router do Next, não o estado do store — isso é o
que garante SSR real.

### `core/data/` — por que não fica dentro de `features/recruiter/`

O dossiê estático (`projects.ts`, `skills.ts`, `articles.ts`, `profile.ts`) não é
exclusivo do modo Recrutador: a Fase 5 (Storyteller) vai referenciar os mesmos projetos
nos diálogos do mascote. Colocar em `core/data/`, tipado pelas interfaces de
`core/entities/`, evita duplicação e acoplamento cruzado entre features — `recruiter-view.tsx`
depende das entities (abstração de forma), não de onde o dado mora fisicamente (DIP).

### Só um componente client em `features/recruiter/`

Todos os componentes de `features/recruiter/components/` são Server Components — zero JS
de UI enviado ao browser para eles. A única exceção é `copy-email-button.tsx`
(`"use client"`), porque é o único ponto que precisa de uma API de browser
(`navigator.clipboard.writeText`). Isso mantém o objetivo de bundle mínimo em
`/recruiter`.

### SEO/ATS: metadata, JSON-LD, sitemap, robots

- `generateMetadata()` em `app/recruiter/page.tsx` — `title`, `description` (derivado de
  `profile.summary`, truncado se necessário), `keywords` (nomes das skills), `openGraph`,
  `twitter`, `alternates.canonical`.
- Um `<script type="application/ld+json">` com schema.org `Person` (nome, cargo, links,
  `knowsAbout`) é embutido diretamente pelo Server Component — ajuda tanto motores de
  busca quanto parsers de ATS que leem dados estruturados.
- `app/sitemap.ts`/`app/robots.ts` — expõem `/` e `/recruiter`, apontando pro domínio
  central em `src/shared/lib/site-config.ts` (`SITE_URL`, hoje um placeholder — ver
  `docs/decisions.md`).
- `app/layout.tsx` define `metadata` base (`title.default`/`title.template`,
  `description`, `metadataBase`) para que qualquer rota herde valores sensatos.
- HTML semântico em `recruiter-view.tsx`: um único `<h1>` (nome, em `HeroSection`),
  `<h2>` por seção com `<section aria-labelledby="...">`, todo conteúdo relevante como
  texto visível (sem informação só em ícone/imagem) — requisito prático de parsers de
  ATS.

### Por que não há hydration mismatch

O SSR e o primeiro paint no cliente sempre renderizam `DEFAULT_MODE` ('IMMERSIVE'),
porque `skipHydration: true` impede o Zustand de ler o `localStorage` durante a criação
do store. O valor real salvo pelo usuário só é aplicado depois do mount, dentro de um
`useEffect` (`ModeHydrationBoundary`), como uma atualização de estado normal — não como
parte da árvore hidratada. Isso é validado por `src/app/hydration.test.tsx`, que simula
SSR + hidratação real (com `localStorage` pré-populado) e garante zero warnings de
mismatch, além de confirmar que o modo persistido é aplicado depois do mount.
