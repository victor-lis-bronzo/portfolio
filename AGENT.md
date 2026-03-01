# Portfolio - Agenda & Referência do Projeto

Este documento serve como referência rápida para o assistente da Inteligência Artificial e desenvolvedores associados na operação, manutenção e evolução do projeto **Portfolio**. Ele consolida as informações mais importantes sobre a arquitetura do software, fluxo de dados e regras inquebráveis.

---

## 📌 1. Visão Geral

**Portfolio** é uma plataforma focada em destrinchar meus projetos, habilidades e experiências.
O projeto utiliza uma arquitetura de Monorepo alavancada pelo **TurboRepo** onde todo o ecossistema convive e compartilha do mesmo pipeline de scripts, pacotes com gestor base sendo o **pnpm**.

## 🏗️ 2. Arquitetura e Workspaces (Monorepo)

O projeto está dividido nestes workspaces fundamentais:

- 🌍 **`web` (`@web`)**: O Frontend da aplicação criado usando Next.js 16.1.4 (App Router) e React 19.
  - **Styling & UI**: Tailwind CSS v4, Radix UI primitives e Lucide React. Suporte a Dark Mode via `next-themes`.
  - **State & Auth**: React Query para server state e NextAuth.js v4 (Credentials/JWT) para autenticação.
  - **HTTP Client**: Instância customizada do Axios com interceptors para gestão facilitada de tokens.
- 🔌 **`api` (`@api`)**: O Backend central, contendo uma API RESTful erguida via Fastify 5 e TypeScript.
  - A API também expõe **Swagger/OpenAPI** automaticamente (disponível na rota `/` em desenvolvimento).
  - Centraliza recepção das interações web, validações cruas com **Zod** e protege rotas via middleware de autenticação (populando `request.user`).
- 🧠 **`core` (`@core`)**: O coração das regras de negócio. Desacoplado de rede e HTTP.
  - Abriga serviços isolados para integrações de terceiros como pagamentos (**Mercado Pago**) e disparo de emails (**Resend**).
  - Define classes customizadas de Erros (`InvalidCredentials`, etc.) e exporta um **Error Handler** padronizado para a API.
  - Empacotado internamente usando o **tsup**.
- 🗄️ **`database` (`@database`)**: Gerencia o banco relacional PostgreSQL via Prisma ORM (v7.3.0).
  - Cliente do Prisma é gerado isoladamente em `prisma/generated/`.
  - Contém um script de seed (`prisma/seed.ts`) responsável por injetar o usuário Admin, Templates de Cards e Pacotes de Créditos iniciais.
- 📦 **`packages` (`@packages`)**: A "cola mestre" validatória.
  - Armazena schemas **Zod** organizados por domínios (ex: `auth`, `card-template`, `credit-package`, `user`).
  - Garante inferência e forte tipagem global da comunicação HTTP (entre Web e API) sem duplicação de códigos.

---

## 🚨 3. A REGRA DE OURO INQUEBRÁVEL (MANDATORY RULE) 🚨

É **ESTRITAMENTE PROIBIDO** falhar sob a regra de referências da base de dados:

> TODOS os tipos que lidam com os dados relacionais (relativos aos domínios gerados pelo Prisma e entidades do DB) DEVEM ser obrigatoriamente importados do workspace `@packages/**` via `@packages`.
>
> - Arquiteturas exteriores (frontend, rotas e APIs) **nunca** recriam tais tipos localmente.
> - **EM HIPÓTESE ALGUMA**, importe tipos diretamente do client gerado na pasta do `database` fora do próprio escopo do banco de dados.

---

## 🛠️ 4. Fluxo e Scripts Base de Desenvolvimento

Toda execução parte da **raiz do repositório**.

**Scripts Globais**

- `pnpm install` — Instalar todas as dependências nos workspaces (node_modules global).
- `pnpm run setup:env` — Copia o `.env.example` raiz para sub-pacotes (`web`, `api`, `database`).
- `pnpm run docker:up` — Efetivar dependências de serviços primários (PostgreSQL) usando o `docker-compose.yaml`.
- `pnpm run turbo:dev` — Inicia o ecossistema local (Fastify Backend na Porta 3001 | Web Frontend na Porta 3000).
- `pnpm run turbo:build` — Executa a build de produção de todo o monorepo.

**Serviços DB (filtro via root ou pasta local)**

- `pnpm --filter @database migrate` — Aplica alterações pendentes do esquema via Prisma Migrate.
- `pnpm --filter @database generate` — Regenereção customizada do cliente Prisma.
- `pnpm --filter @database seed` — Inserção de dados vitais (Admin, pacotes, etc).
- `pnpm --filter @database studio` — Abre a interface web do banco.

---

## 🧩 5. Padrões Chave de Arquitetura

### Backend (api -> core)

Emprega o Padrão de Separação **_Service-Route_**:

1.  **Rota (`api/src/routes`)**: Recebe a requisição HTTP, aciona middlewares de autenticação e exige validação rigorosa (Zod schemas de `packages`). Não roda Prisma ou SQL.
2.  **Serviço (`core/src/services`)**: Invocado pela rota, processa o domínio e regra (Lida com o DB via `@database` e integrações como Mercado Pago).
3.  **Tratamento de Erros**: Falhas ativam throw de exceptions customizadas em `core/src/errors`, que são interceptadas e formatadas globalmente no `error-handler`.

### Web (Frontend)

1. **App Router e Server State**: Utiliza a estrutura app/ e o módulo React Query para manutenção inteligente de dados assíncronos.
2. **Server Actions (REGRA GERAL)**: O projeto emprega _estritamente_ **Next.js Server Actions** para lidar com mutações e interações que precisam acessar o Backend indiretamente ou o banco de dados. O uso de novas rotas REST (da API) não deve ser o padrão primário para as páginas do Dashboard.
3. **Axios Client Centralizado**: A comunicação HTTP externa ocorre por um `useAPI` que já insere tokens JWT da sessão (via interceptors), dando _signOut_ em 401s.
4. **Compound Components**: Desenho de componentes complexos usando composições locais e simples (Ex: `<Header.Root>`, `<Header.Logo>`).

### Design System e Infra de Proxy

- **Design Protótipos (`config/.ui/`)**: O projeto conta com arquivos HTML/CSS/JS estáticos em `config/.ui/` atuando como a referência absoluta visual (Mockups de home, marketplace, prices) a se seguir na interface fluida.
- **Proxy e Certificados**: O ambiente de produção atrela o tráfego usando roteamento `nginx` em HTTPs (`portfolio.api.victorlisbronzo.com` para API e `portfolio.victorlisbronzo.com` para a porta 3000 em web), validados através de configs de `certbot`.

---
