# Decisões — Fase 1 (Setup do Core & Shell)

Registro das decisões e desvios tomados durante a implementação da Fase 1, com contexto
e justificativa. Serve como referência para quem for revisar o PR ou continuar as
próximas fases.

## Sem monorepo

**Decisão:** um único app Next.js na raiz do repositório — sem `web/`, sem
`pnpm-workspace.yaml` de fato configurando workspaces, sem Turborepo, sem workspace
`api/`.

**Por quê:** o repositório foi zerado pelo usuário antes desta fase (greenfield). A
versão anterior do projeto tinha um monorepo com `web`/`api` (backend Fastify/MCP), mas
essa complexidade não é necessária para o escopo do portfólio — o usuário confirmou
explicitamente que quer só um Next.js na raiz.

## Biome em vez de ESLint + Prettier

**Decisão:** lint e format ficam só no Biome (`biome.json` na raiz, script `lint`/`format`).

**Por quê:** um binário só, mais rápido, menos configuração para manter num projeto que
ainda vai crescer bastante (React Three Fiber, Rough.js nas próximas fases).

## Vitest + Testing Library agora, Playwright adiado

**Decisão:** testes unitários/integração com Vitest + Testing Library + jsdom nesta
fase. Nenhum framework de e2e (Playwright) foi adicionado ainda.

**Por quê:** o comportamento coberto na Fase 1 (store, switcher, hidratação, integração
da home) é bem servido por Testing Library com custo de infraestrutura baixo. E2E real
faz mais sentido a partir da Fase 3 (Whiteboard) ou Fase 6 (deploy), quando existem
fluxos de usuário mais ricos para validar contra um browser real.

## CLI do shadcn mudou de major — Base UI em vez de Radix "new-york"

**Decisão:** os componentes de UI (`tabs`, `button`) foram gerados com
`shadcn@latest init -d`, que hoje usa o preset `base-nova` sobre **Base UI**
(`@base-ui/react`, sucessor do Radix mantido pelo mesmo time), não mais Radix UI puro. O
campo `"style"` em `components.json` ficou `"base-nova"` — o plano original assumia
`"new-york"`, que não existe mais como opção na CLI atual.

**Por quê:** a CLI instalada (`shadcn@latest`) já não oferece mais os prompts antigos de
`style`/`baseColor` no formato esperado; `base-nova` é o preset padrão/recomendado
atual. `baseColor: "neutral"` e `cssVariables: true` foram respeitados como pedido; os
aliases (`components`, `utils`, `ui`, `hooks` → `@/shared/...`) foram ajustados
manualmente no `components.json`.

**Como reverter, se necessário:** fixar uma versão antiga da CLI (`shadcn@2.x`) para
voltar ao fluxo Radix/"new-york" clássico. Não foi feito por padrão porque não havia
pedido explícito para isso e a CLI nova é a atual/recomendada pelo próprio projeto
shadcn.

## Ajustes de ambiente

**`vitest.config.ts` — `execArgv: ['--no-experimental-webstorage']` + `pool: 'forks'`:**
o ambiente de desenvolvimento local roda Node 26, que expõe um `localStorage` global
experimental nativo que conflita com o `window.localStorage` do jsdom usado nos testes
(os testes falhavam com `window.localStorage` undefined). A flag desliga esse global
nativo do Node durante os testes.

> ⚠️ **Pendente de validação:** essa flag não foi confirmada rodando de fato no runner
> do GitHub Actions (Node 22, via `actions/setup-node` em `.github/workflows/verify.yml`).
> O flag `--experimental-webstorage` existe desde o Node 22.4, então a expectativa é que
> `--no-experimental-webstorage` seja aceito também lá, mas isso deve ser confirmado no
> primeiro PR real antes de considerar 100% garantido.

**`biome.json` — `css.parser.tailwindDirectives: true`:** o `globals.css` gerado pelo
Tailwind v4 usa `@apply`, que o parser CSS do Biome rejeita por padrão. Sem essa opção,
`pnpm lint`/`pnpm format` falhavam em `src/app/globals.css`.

## `src/app/api/chat/route.ts` não foi criado

**Decisão:** a rota de chat (handler de IA opcional, citada na especificação geral do
produto) não foi criada nesta fase.

**Por quê:** ela só faz sentido quando o Storyteller (Fase 5) existir para consumi-la.
Criar a rota agora deixaria um endpoint vazio/morto no código, sem nenhum consumidor.

## Correção pós-revisão: `ModeHydrationBoundary` fora de `core/`

**Decisão:** movido de `src/core/state/mode-hydration-boundary.tsx` para
`src/shared/components/mode-hydration-boundary.tsx`.

**Por quê:** é um componente React (`"use client"`, retorna JSX) — não pertence à
camada de domínio puro (`core/`). Ver [`architecture.md`](./architecture.md#erro-cometido-e-corrigido-onde-vive-um-componente-de-ui)
para o critério usado.

## Correção pós-revisão: teste de hidratação não exercitava rehidratação real

**Decisão:** `src/app/hydration.test.tsx` foi reescrito para montar
`ModeHydrationBoundary` (não só `Home` isolado), pré-popular o `localStorage` com um
modo diferente do default, e verificar tanto ausência de warning de mismatch quanto a
aplicação real do valor persistido após o mount.

**Por quê:** a primeira versão do teste renderizava só `<Home />`, que nunca chama
`persist.rehydrate()` — o teste passaria mesmo com um bug real de rehidratação, porque
nunca lia o `localStorage`.
