# Decisões — Fase 2 (Módulo Recrutador & SSR)

## `/recruiter` como rota própria em vez de branch client-side

**Decisão:** o plano inicial desta fase previa só transformar os componentes do
Recrutador em Server Components, mantendo a decisão de "qual modo mostrar" client-side
via `useMode()` — adiando SSR/SEO real para a Fase 6. O usuário pediu explicitamente para
já resolver isso agora, criando `src/app/recruiter/page.tsx` como rota dedicada, SSG,
indexável, com metadata/SEO/ATS completos.

**Por quê:** uma URL própria (`/recruiter`) pode ir direto no currículo/LinkedIn e é lida
por qualquer bot (Google, parser de ATS) sem precisar executar JavaScript de troca de
modo. `pnpm build` confirma `/recruiter` como `○ (Static)`.

**Efeito colateral assumido:** `ModeSwitcher` deixou de decidir sozinho o que `page.tsx`
renderiza — agora navega de verdade (`usePathname`/`useRouter`), e `page.tsx` (`/`)
passou a renderizar sempre `ImmersivePlaceholder`, sem branch. Ver
[`architecture.md`](./architecture.md#fase-2--módulo-recrutador--ssr) para o detalhe.

## `core/data/` como local do dossiê estático (não dentro de `features/recruiter/`)

**Decisão:** `projects.ts`, `skills.ts`, `articles.ts`, `profile.ts` ficam em
`src/core/data/`, tipados pelas interfaces novas de `src/core/entities/`.

**Por quê:** a Fase 5 (Storyteller) vai reusar os mesmos projetos nos diálogos do
mascote — colocar o dado dentro de `features/recruiter/` criaria acoplamento cruzado
entre features que não deveriam se conhecer.

## Conteúdo real ainda não fornecido — placeholders explícitos

**Decisão:** `src/core/data/*.ts` foi implementado com exatamente um item placeholder por
arquivo (marcado com `// TODO: substituir pelo conteúdo real fornecido pelo usuário`),
em vez de inventar texto sobre o currículo/projetos reais do usuário.

**Pendência:** o usuário ainda vai fornecer bio/resumo, projetos com métricas reais,
skills, artigos do DEV.to, link do CV em PDF (hoje `profile.cvHref` aponta para
`/cv.pdf`, que não existe em `public/`), e-mail, GitHub e LinkedIn reais. `SITE_URL`
(`src/shared/lib/site-config.ts`) também é um placeholder
(`https://victorlisbronzo.dev`) até a URL de produção real ser definida.

## Bug de teste: `userEvent.setup()` sobrescreve `navigator.clipboard`

**Decisão:** `copy-email-button.test.tsx` usa `vi.spyOn(navigator.clipboard,
"writeText")` **depois** de `userEvent.setup()`, em vez de substituir
`navigator.clipboard` inteiro via `Object.defineProperty` antes do `setup()`.

**Por quê:** `@testing-library/user-event` v14 instala seu próprio stub de clipboard
durante `setup()` — qualquer mock de `navigator.clipboard` atribuído antes disso é
sobrescrito silenciosamente, fazendo o `expect(mock).toHaveBeenCalledWith(...)` falhar
com zero chamadas registradas mesmo com o clique acontecendo normalmente. Espiar
(`vi.spyOn`) o stub que o próprio `user-event` já instala evita a corrida.

## Scope creep revertido: `"type": "module"` no `package.json`

**Decisão:** um subagent, tentando silenciar um warning inofensivo do Vite ("ESM syntax
in a file loaded as CommonJS" em `vitest.config.ts`), adicionou `"type": "module"` ao
`package.json`. Essa alteração foi revertida antes do commit.

**Por quê:** é uma mudança de escopo amplo (afeta resolução de módulos do projeto
inteiro) não pedida nem necessária para esta fase — o warning é cosmético e não quebra
build/lint/testes. Fica registrado aqui como lembrete de que o warning continua
aparecendo (inofensivo) até alguém decidir endereçá-lo deliberadamente.

---

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
