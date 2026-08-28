# Arquitetura

Este projeto segue Clean Architecture com separação estrita entre domínio, features e
apresentação, aplicando os princípios SOLID.

```
src/
├── core/                           # Domínio puro — zero dependência de UI/framework/WebGL
│   ├── entities/                   # ✅ Project, Skill, Article, StoryStep, StoryChapter, StoryScript, StoryTimeline
│   ├── data/                       # ✅ Dossiê estático + roteiro biográfico (story/script.ts, diagrams.ts)
│   ├── interfaces/                 # ✅ ICameraController, IWhiteboardDriver, IDialogController
│   └── state/                      # ✅ Zustand Stores puros (mode-store.ts, storyteller-store.ts, storyteller-pacing.ts)
├── features/
│   ├── storyteller/                # ✅ Fase 5 — useStoryOrchestrator, dialogue-store, componentes de overlay & runtime
│   ├── scene-3d/                   # ✅ Fase 4 — VoxelStudio, câmera isométrica, voxel-desk, voxel-iot-bench, voxel-printer, voxel-whiteboard
│   ├── whiteboard/                 # ✅ Fase 3 — Rough.js canvas, shape-generators, whiteboard-store, use-whiteboard-driver
│   └── recruiter/                  # ✅ Fase 2 — recruiter-view.tsx + components/
├── shared/
│   ├── components/                 # ✅ mode-switcher.tsx, mode-hydration-boundary.tsx, app-chrome.tsx
│   │   └── ui/                     # ✅ componentes shadcn (tabs, button, badge)
│   ├── hooks/                      # ✅ use-mode.ts, use-prefers-reduced-motion.ts
│   └── lib/                        # ✅ utils.ts, site-config.ts (SITE_URL)
└── app/
    ├── layout.tsx                  # ✅ Root Shell com o switcher de modo + metadata base
    ├── page.tsx                    # ✅ `/` — experiência Imersiva 3D com Storyteller integrado
    ├── recruiter/
    │   └── page.tsx                # ✅ `/recruiter` — rota SSG dedicada (Fase 2)
    ├── sitemap.ts                  # ✅ Fase 2
    ├── robots.ts                   # ✅ Fase 2
    └── api/chat/route.ts           # (reservado — handler de IA opcional)
```

## Por que cada camada existe

- **`core/`** não pode importar nada de React, Next.js ou qualquer biblioteca de UI/WebGL. Contém entidades de dados, interfaces polimórficas e reducers de estado puros (`mode-store.ts`, `storyteller-store.ts`, `storyteller-pacing.ts`, `story-timeline.ts`). Isso garante que o domínio possa ser 100% testado em Node/jsdom sem WebGL e reaproveitado independentemente do framework de UI.
- **`features/`** agrupa capacidades verticais do produto (`storyteller`, `scene-3d`, `whiteboard`, `recruiter`). Cada uma evolui de forma independente comunicando-se via stores e interfaces do `core/`.
- **`shared/`** abriga utilitários, hooks reutilizáveis (como detecção de `reduced-motion`) e primitivos de UI compartilhados.
- **`app/`** é a camada de composição e roteamento do Next.js — orquestra os componentes e provê SSR/SSG.

## Mapeamento aos princípios SOLID

1. **SRP (Single Responsibility)**:
   - `storyteller-store.ts`: gerencia estritamente o estado e passos da máquina de reprodução.
   - `use-story-orchestrator.ts`: executa os efeitos colaterais coordenando câmera, diálogo e quadro.
   - `whiteboard-store.ts`: armazena os elementos visuais do diagrama exibido no quadro 3D.
2. **OCP (Open/Closed)**:
   - Novos capítulos e passos do roteiro são adicionados estendendo o `StoryScript` sem modificar a lógica do orquestrador ou da máquina de estados.
3. **LSP (Liskov Substitution)**:
   - Os adaptadores implementam estritamente `ICameraController`, `IWhiteboardDriver` e `IDialogController`, permitindo substituição por implementações mock em testes.
4. **ISP (Interface Segregation)**:
   - Interfaces segregadas e enxutas (`say`/`clear` em `IDialogController`, `render`/`clear` em `IWhiteboardDriver`, `focusWaypoint`/`getCurrentWaypoint` em `ICameraController`).
5. **DIP (Dependency Inversion)**:
   - O orquestrador depende exclusivamente das interfaces (`ICameraController`, `IDialogController`, `IWhiteboardDriver`) e de tipos de entidades do `core/`.

## Fase 5 — Storyteller Biográfico

### Máquina de Estados Pura e Orquestrador de Efeitos
A máquina de estados em `core/state/storyteller-store.ts` é um reducer puro que gerencia o índice do passo e os estados `IDLE`, `PLAYING`, `PAUSED`, `ENDED`.
O hook `useStoryOrchestrator` em `features/storyteller/hooks/` observa as mudanças de passo e executa a sequência:
1. Emite o diálogo na caixa de fala (`dialogController.say()`) de forma imediata.
2. Comanda a transição de câmera via `cameraController.focusWaypoint()`.
3. Valida a **Guarda de Época** (`runIdRef`) após a finalização da movimentação da câmera.
4. Desenha ou limpa o diagrama no quadro branco 3D através de `whiteboardDriver.render()`.
5. Calcula o tempo de leitura (*dwell time*) e arma o avanço automático.

### Guarda de Época (`runIdRef`)
Para prevenir condições de corrida causadas por cliques rápidos do usuário em "Próximo" durante voos de câmera, o orquestrador incrementa um `runId` atômico no início de cada passo. Quando a Promise da câmera resolve, o hook checa se a época atual ainda coincide com o passo. Se o usuário avançou antes do voo terminar, os efeitos defasados são sumariamente descartados, garantindo que o quadro branco nunca retenha o diagrama anterior.

### Acessibilidade (WCAG 2.2.2 / Live Regions)
- Diálogo do mascote veiculado em live region acessível: `role="status"`, `aria-live="polite"`, `aria-atomic="true"`.
- Container da cena 3D marcado com `aria-hidden="true"` para manter o leitor de tela focado no conteúdo relevante.
- `<h1>` semântico acessível (`sr-only`) na home.
- Transcrição completa em texto aberta a bots de busca e leitores de tela, totalmente navegável por cliques diretos nos passos.
- Atalhos de teclado operáveis com guardas (Espaço, K, Setas, Esc).
