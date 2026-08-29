# Fase 5 — Storyteller Biográfico (plano de execução)

> **INSTRUÇÃO PERMANENTE DO USUÁRIO (não remover):** quando faltar ~5% do
> orçamento da sessão, escrever um `.md` detalhado de handoff com tudo que
> falta continuar. Este arquivo é mantido atualizado como handoff vivo.

## Contexto

Fases 1–4 estão completas e commitadas (`1ff9e87`). A cena 3D existe, o
quadro branco existe como objeto físico, a câmera sabe se mover por
waypoints — mas **nada orquestra isso**: `features/storyteller/` só tem um
`.gitkeep`. Esta fase constrói a camada que dá vida ao que já foi feito.

O usuário forneceu o conteúdo narrativo: sua trajetória do Minecraft
(circuitos de redstone na infância) até a Iniciação Científica hoje, passando
pela Etec, o PC comprado com esforço, a regra de estudar um semestre à frente,
FETEPS, o TCC Eco-Play, freelances, CLT em 2025 e o IFSP.

## Estado real vs. spec (resumo da análise)

| Fase | Estado |
|---|---|
| 1 — Core & Shell | ✅ Completa |
| 2 — Recrutador & SSR | ✅ Completa (2 gaps pontuais) |
| 3 — Whiteboard Rough.js | ✅ Completa |
| 4 — Estúdio 3D Voxel | ✅ Completa |
| 5 — Storyteller | ❌ **Não iniciada** ← esta fase |
| 6 — Otimização & Deploy | ⚠️ Só o deploy (`release.yml` → Vercel) |

**Desvios do spec, justificados:** modo dual é baseado em rotas (melhor:
garante `/recruiter` sem three.js); quadro branco usa drei `<Html transform>`
(Opção B, aceita pelo usuário — riscos de oclusão/iluminação/CSS-por-frame
conhecidos e aceitos); `IStoryScript` do spec é redundante e **não** será
criado (é entidade de dados, não contrato polimórfico).

## Decisões do usuário

1. **Narrador:** avatar fixo num canto + caixa de diálogo (não personagem que anda).
2. **Navegação:** tour cronológico principal + chips para pular capítulos.
3. **Espaço:** linha do tempo espacial (áreas em ordem cronológica).
4. **Fatiamento: slice vertical primeiro.** Ciclo 1 = motor + UI + roteiro
   curto usando **só os 5 waypoints existentes**, tour funcionando ponta a
   ponta. Ciclo 2 = as 6 novas áreas voxel + capítulos restantes.
5. **Lacunas factuais:** perguntar ao usuário, com espaço aberto (ele lembrou
   de mais momentos). Questionário abaixo; respostas parciais já recebidas.
6. **StarSeg pode ser citada pelo nome** no tour.
7. **Tom do fecho: "aberto a oportunidades"** — não está em busca ativa, mas
   escuta propostas. O passo final menciona contato sem urgência, além do
   link para `/recruiter`.
8. **Freela entra depois do TCC** na montagem narrativa (não pica o beat do
   Eco-Play).
9. **A impressora 3D entra na história** — imprimiu peças de projeto; ganha um
   passo no capítulo do Eco-Play/IoT. Detalhe do *quê* pendente na resposta
   aberta.

## Arquitetura (Ciclo 1)

### Princípio central
**A store é um reducer puro; os efeitos vivem num único hook orquestrador.**
A máquina de estados em `core/state` só move um inteiro (índice do passo). Um
hook em `features/storyteller` observa esse índice e executa os três efeitos,
recebendo `ICameraController` / `IDialogController` / `IWhiteboardDriver` como
parâmetros. Resultado: `core/state` não depende de *nada* (mais forte que
"depende só de abstrações") e a máquina de estados é testável em jsdom sem
WebGL.

Isso difere do padrão de registro do `scene-focus-store.ts` — que existe
porque lá a implementação nasce dentro da árvore R3F e os chamadores estão
fora. Aqui um componente DOM vê todos os colaboradores, então registro seria
cerimônia.

### Guarda de época (obrigatória, não polimento)
`use-camera-controller.ts` resolve a Promise de uma transição substituída
**imediatamente** (foi a correção da Fase 4). Sem uma guarda, clicar
"próximo" no meio de um voo faz o passo abandonado retomar e sobrescrever o
diálogo e o diagrama do passo novo — o quadro trava no diagrama anterior.
Implementar `runIdRef` incrementado no início do efeito e checado após cada
`await`. **Escrever o teste de regressão junto**, não depois.

### Arquivos novos

```
src/core/entities/
  story-script.ts      # StoryStep, StoryChapter, StoryScript
  story-timeline.ts    # buildStoryTimeline() + helpers puros (maior alvo de teste)
src/core/interfaces/
  dialog-controller.ts # IDialogController { say, clear } — gêmeo de IWhiteboardDriver
src/core/state/
  storyteller-pacing.ts  # matemática de dwell, pura
  storyteller-store.ts   # a máquina de estados (não persistida)
src/core/data/story/     # capítulos, um arquivo por capítulo + diagrams/
src/features/whiteboard/state/whiteboard-store.ts  # DOM escreve, cena lê
src/features/storyteller/
  hooks/use-story-orchestrator.ts  # a sequência de efeitos + guarda de época
  state/dialogue-store.ts
  components/  # storyteller-runtime, storyteller-overlay, mascot-avatar,
               # dialogue-box, chapter-chips, playback-controls,
               # story-intro-card, story-transcript
```

### `StoryStep` — extensões além do sketch do spec

O design narrativo provou que o shape do spec não expressa 5 coisas de que a
copy depende. Aprovadas com justificativa:

- **`StoryChapter` como entidade** — chips, "entrar frio" num capítulo e o
  rótulo "Cap. 4 de 13" precisam do agrupamento; derivar por convenção de id
  é frágil e permite capítulos não-contíguos que a UI não representa.
- **`cta?: { label, href }`** — sem isso o tour imersivo é beco sem saída: não
  linka `/recruiter` nem os projetos reais. É o que conecta os dois modos.
- **`draft?: true`** — 6 passos têm `[A CONFIRMAR]`; precisam ser filtrados em
  produção, com teste barrando o vazamento.
- **Persistência/diff de diagrama** — dois passos consecutivos podem comentar
  o mesmo desenho (C4). Diagrama persiste até o próximo passo que declare
  `diagramElements`; diff por `id` para não re-animar o que já foi desenhado.
- **`sceneCue?: string`** — string opaca para a cena interpretar (redstone
  acendendo, LED da bancada). Deixa o roteiro pedir sem conhecer geometria.

Rejeitado: `title` no passo (capítulo já dá), `highlightProp` (o
`SceneWaypointId` já *é* o namespace de identidade dos props).

### Política de avanço (híbrida, sempre interrompível)

| Gatilho | Comportamento |
|---|---|
| Troca de passo | `dialog.say()` **imediato** (câmera ainda voando) |
| Câmera assenta | Arma o dwell e **então** desenha o diagrama |
| Dwell esgota | `next()` enquanto `PLAYING` |
| Clique do usuário | Ganha de tudo, em qualquer status |
| `PAUSED` | Tick para; câmera/diálogo/quadro seguram |

**Sem autostart.** `/` abre em `OVERVIEW`, status `IDLE`, com o card de intro
e os chips — satisfaz WCAG 2.2.2 honestamente e respeita o recrutador que
quer pular direto. **Reduced-motion mantém o auto-advance** (é sinal
vestibular, não de velocidade de leitura): câmera salta, diagrama aparece
completo, dwell colapsa para tempo de leitura puro.

### Acessibilidade (a narração é o conteúdo principal)
- Caixa de diálogo: `role="status"` + `aria-live="polite"` + **`aria-atomic="true"`**
  (obrigatório — sem ele alguns leitores anunciam só o fragmento diferente).
- Título do capítulo e contador **fora** da live region, para não reanunciar.
- `aria-hidden="true"` no wrapper do `<VoxelStudio>` — hoje o
  `WhiteboardCanvas` dentro do `<Html>` tem `role="img"` e é lido como
  conteúdo solto.
- **Transcript visível** (não `sr-only`): dá a `/` seu primeiro texto
  indexável, funciona sem WebGL, e cada passo é um botão que navega.
- `sr-only <h1>` — `/` não tem `<h1>` hoje.
- Atalhos globais (setas, espaço/K, Esc, T) com guardas para `input`/`repeat`/modificadores.
- Foco move exatamente 2×: ao iniciar o tour e ao encerrar. **Nunca** no auto-advance.

## Bugs reais encontrados (corrigir nesta fase)

1. **Badge índigo com texto preto** — `generateBadge` preenche sólido com
   `el.color`, mas o label em `whiteboard-canvas.tsx` é `<motion.text>` sem
   `fill` → preto. O `#4f46e5` da amostra é preto-sobre-índigo (visível nos
   prints do usuário). Usar cores claras nos badges e/ou dar `fill` ao label.
2. **`box` colorido fica ilegível** — `getColorOptions()`
   (`rough-options.ts:15-21`) seta `stroke` + `fill` + `fillStyle: "hachure"`
   juntos; caixa colorida ganha hachura atrás do label. Regra: não colorir
   `box`.
3. **SVG sem `font-size`** — cai nos 16px do UA dentro de um viewBox 800×500.
   Declarar explicitamente (18px) para as coordenadas do roteiro fecharem.
4. **`/cv.pdf` retorna 404** — `profile.cvHref` aponta para lá e o botão
   existe, mas `public/` está vazio. Bug visível ao recrutador.
5. **Setas do diagrama de amostra não dizem nada** — `Frontend → Backend`.
   Substituir pelo board de Arquitetura Limpa com dependências apontando
   para dentro.

## Sequência de build (Ciclo 1 — cada passo deixa o repo verde)

1. Entidades + timeline + testes (`story-script.ts`, `story-timeline.ts`).
2. `IDialogController` + barrel. Registrar a rejeição de `IStoryScript` em `docs/decisions.md`.
3. Pacing + store + testes. Máquina de estados provada sem UI nem cena.
4. Roteiro semente curto usando **só os 5 waypoints existentes** + teste de
   contrato (todo `waypoint` existe em `SCENE_WAYPOINTS` — pega bind quebrado;
   `use-camera-controller.ts` **lança** em id desconhecido).
5. Desacoplar o quadro: `whiteboard-store.ts`, `use-whiteboard-driver.ts`,
   `idle-diagram.ts`; reescrever `voxel-whiteboard.tsx` para ler da store.
   *Verificável: o quadro deve ficar idêntico ao de hoje.*
6. Adaptador de câmera DOM-side + orquestrador + **teste da guarda de época**.
7. Componentes apresentacionais + testes (todos prop-driven, store-free).
8. Conectar: overlay, runtime, composição em `page.tsx`, `aria-hidden` no canvas.
   *Primeiro checkpoint com tour clicável.*
9. Completar a11y: transcript, `<h1>`, atalhos, foco.
10. Docs: `architecture.md` + `decisions.md`.

**Ciclo 2 (depois, plano separado):** 6 novas áreas voxel
(`CHILDHOOD_REDSTONE`, `ETEC_SCHOOL`, `ETEC_STAGE`, `FETEPS_FAIR`,
`PRO_WORKSTATION`, `IFSP_RESEARCH`) dispostas como linha do tempo espacial,
waypoints correspondentes, e os capítulos restantes do roteiro.

O design espacial detalhado (coordenadas, geometria de cada prop, novos
waypoints) **ainda não foi feito** — o agente que o elaborava foi interrompido
antes de concluir. Isso **não bloqueia o Ciclo 1**, mas precisa ser planejado
no início do Ciclo 2. Insumos já levantados que o design deve respeitar:

- A câmera ortográfica vive no octante `(+,+,+)`, então só faces com normais
  `+x`/`+y`/`+z` aparecem; paredes de fundo ficam em `x`/`z` negativos.
- Escala estabelecida: props de ~1–3 unidades de mundo, OVERVIEW em
  `position (12,12,12)` / `target (0,0.8,0)` / `zoom 55`, áreas com `zoom 90–95`.
- Todo passo com diagrama precisa de um waypoint que enquadre o quadro branco
  (objeto físico único) — ou o Ciclo 2 adiciona um segundo suporte de desenho.
- `scene-waypoint-config.test.ts` fixa `toHaveLength(5)` e uma lista `ALL_IDS`;
  ambos precisam crescer junto.
- `use-camera-controller.ts` **lança** em `SceneWaypointId` desconhecido — o
  teste de contrato do roteiro (passo 4 do Ciclo 1) pega bind quebrado.

## Roteiro (13 capítulos / 26 passos / ~3min) — resumo

Capítulos: prólogo → redstone/infância → Etec (14 p/ 15) → o PC → **um
semestre à frente** (clímax, diagrama D1) → IoT → FETEPS (2 tentativas) →
Eco-Play/TCC (diagrama D2) → freela e escola → voz/comunicação (diagrama D3)
→ 2025 CLT → IFSP e IC → epílogo com CTA para `/recruiter`.

Orçamento: `mascotDialogue` ≤ 140 chars (alvo 90–120), máx. 2 frases, dwell
6,5s (11–13s nos passos com diagrama). 7 chips, sendo **"Trabalho hoje"** a
porta explícita do recrutador com pressa e **"▶ Minha História"** o CTA
primário.

3 diagramas apenas (11% dos passos), coordenadas reais no viewBox 800×500:
trilha JS→React Native→Nuvem/NoSQL→IoT (13 elementos), arquitetura do Eco-Play
com a métrica real dos 135/98,5% (9), e SOLID/Arquitetura Limpa (13).

**Restrição descoberta:** o quadro é um objeto físico único, então todo passo
com diagrama precisa de um waypoint que o enquadre. Isso concentra os
diagramas em 3 capítulos e faz o tour voltar ao quadro 3× — virou motivo
narrativo deliberado ("deixa eu desenhar"), não acidente.

**20 dos 26 passos estão prontos; 6 carregam `[A CONFIRMAR]`** e ficam atrás
da flag `draft` até o usuário responder o questionário abaixo.

## Questionário para o usuário (lacunas factuais)

Ordenado por impacto. Os 4 primeiros destravam passos que hoje não podem ir
ao ar. **Não inventar nada biográfico.**

**Já respondidas:** StarSeg pode ser citada; tom "aberto a oportunidades";
freela depois do TCC; impressora 3D entra (imprimiu peças de projeto — falta
saber quais).

1. Nome do curso técnico na Etec (suponho Desenvolvimento de Sistemas pelas
   matérias PAM/BD II) e ano de entrada/formatura.
2. Ano em que começou a programar (você diz "14 pra 15" — falta a régua absoluta).
3. FETEPS 2024: qual projeto levou? Era o Eco-Play ou outro?
4. FETEPS: o que aconteceu na 1ª tentativa? (não passou na seleção interna,
   não classificou, desistiu?) O beat de persistência depende disso.
5. Congressos: quais, quando, apresentou ou assistiu? Tem certificado/anais/DOI?
6. Projetos pro grêmio e pra Etec: quantos, o que cada um resolvia, quantas
   pessoas usaram, código é público? *(maior lacuna — talvez mereça capítulo próprio)*
7. A viagem divulgando a Etec: pra onde, em que contexto, falou em público?
8. StarSeg: posso citar o nome? Cargo formal, desde quando em 2025, o que da
   arquitetura pode ser descrito publicamente?
9. IFSP: curso, câmpus, desde quando. IC: tema/recorte, orientador, é
   continuação do Eco-Play? Tem bolsa?
10. Freela (set/2023→): tipo de cliente/trabalho, segue pegando? Um exemplo concreto.
11. Redes sociais: quais usa para publicar, quer que o tour linke ou só mencione?
12. A impressora 3D da cena é sua? Imprime peças de projeto? (hoje o waypoint
    `PRINTER_3D` ficou sem passo por falta de fato)
13. Minecraft/redstone: o que você construía concretamente? (farm automática,
    cofre com senha, calculadora?) É o 1º passo do tour, precisa de gancho.
14. Certificados e fotos que valham aparecer.
15. Ordem cronológica: freela (set/2023) veio antes ou depois do TCC na narrativa?
16. Está em busca ativa de vaga? Afeta o tom do fecho.
17. **ABERTA:** quais outros momentos você lembrou e quer incluir?

## Restrições invioláveis

- `src/core/` 100% framework-agnostic (zero three/R3F/React/DOM).
- `next/dynamic({ssr:false})` em `voxel-studio-loader.tsx` segue o único
  caminho até three.js — `/recruiter` nunca baixa WebGL.
- Não alterar `ICameraController`.
- Geometrias primitivas apenas; sem GLTF/texturas; sem shadow mapping.
- Toda animação gated por `usePrefersReducedMotion()`.
- Componentes R3F não são testados em unidade (jsdom sem WebGL).
- Biome (tabs), Conventional Commits em inglês, sem trailer de co-autoria.
- Todo texto ao visitante em **pt-BR**.
- `mascotDialogue` ≤ 140 chars; ≤ 12 `diagramElements` por passo
  (`generateShape` não é memoizado).

## Verificação

1. `pnpm exec tsc --noEmit` — zero erros (não há script `typecheck`).
2. `pnpm lint` (Biome) — limpo.
3. `pnpm test` — suíte atual (52+) passando mais os novos.
4. `pnpm build` — sucesso; `/recruiter` com `react-loadable-manifest.json` vazio.
5. `pnpm dev` → `/`: card de intro; "Minha História" toca do início ao fim;
   chips saltam para capítulos; câmera, diálogo e quadro sincronizados.
6. Clicar "próximo" no meio de um voo **não** deixa o quadro no diagrama
   anterior (regressão da guarda de época).
7. Reduced-motion → câmera salta, diagrama completo, sem animação de traço.
8. Teclado: chips e controles operáveis; `aria-live` anuncia cada passo uma vez.
9. Transcript legível e navegável com o WebGL desabilitado.
