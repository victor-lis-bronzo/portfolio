# Arquitetura

Este projeto segue Clean Architecture com separação estrita entre domínio, features e
apresentação, aplicando os princípios SOLID. A estrutura abaixo é o alvo completo da
especificação do produto; a Fase 1 implementou apenas o essencial (marcado com ✅), o
resto são diretórios reservados para as próximas fases.

```
src/
├── core/                           # Domínio puro — zero dependência de UI/framework
│   ├── entities/                   # (reservado — Fase 2+: Project, Skill, StoryScene, DiagramPayload)
│   ├── interfaces/                 # (reservado — Fase 3+: ICameraController, IWhiteboardDriver, IStoryScript)
│   └── state/                      # ✅ Zustand Store — mode-store.ts
├── features/
│   ├── storyteller/                # (reservado — Fase 5)
│   ├── scene-3d/                   # ✅ placeholder — Fase 4 implementa de fato
│   ├── whiteboard/                 # (reservado — Fase 3)
│   └── recruiter/                  # ✅ placeholder — Fase 2 implementa de fato
├── shared/
│   ├── components/                 # ✅ mode-switcher.tsx, mode-hydration-boundary.tsx
│   │   └── ui/                     # ✅ componentes shadcn (tabs, button)
│   ├── hooks/                      # ✅ use-mode.ts
│   └── lib/                        # ✅ utils.ts (cn helper do shadcn)
└── app/
    ├── layout.tsx                  # ✅ Root Shell com o switcher de modo
    ├── page.tsx                    # ✅ renderiza o placeholder do modo ativo
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

### Por que não há hydration mismatch

O SSR e o primeiro paint no cliente sempre renderizam `DEFAULT_MODE` ('IMMERSIVE'),
porque `skipHydration: true` impede o Zustand de ler o `localStorage` durante a criação
do store. O valor real salvo pelo usuário só é aplicado depois do mount, dentro de um
`useEffect` (`ModeHydrationBoundary`), como uma atualização de estado normal — não como
parte da árvore hidratada. Isso é validado por `src/app/hydration.test.tsx`, que simula
SSR + hidratação real (com `localStorage` pré-populado) e garante zero warnings de
mismatch, além de confirmar que o modo persistido é aplicado depois do mount.
