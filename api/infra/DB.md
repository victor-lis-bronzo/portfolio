# Infraestrutura (`api/infra`)

Camada responsável por toda a infraestrutura externa da API: banco de dados, ORM e serviços de terceiros.

---

## Estrutura

```
infra/
├── docker-compose.yml        # PostgreSQL 16 + Firebase Emulator
├── package.json
├── database/
│   ├── connection.ts          # Factory de conexão Drizzle + pg.Pool
│   └── models/
│       ├── index.ts           # Barrel export dos schemas
│       └── user.schema.ts     # Schema da tabela "users"
└── firebase/
    ├── admin.ts               # Inicialização do Firebase Admin SDK
    └── storage.ts             # Adaptador do Firebase Storage
```

---

## Banco de Dados / ORM (Drizzle)

### Conexão (`database/connection.ts`)

Cria e exporta a instância do Drizzle ORM conectada ao PostgreSQL via `pg.Pool`.

```ts
createDatabase(connectionString: string): NodePgDatabase<any>
```

### Models (`database/models/`)

Cada arquivo `*.schema.ts` define **uma tabela** do PostgreSQL usando a API do Drizzle.

#### `user.schema.ts` — Tabela `users`

| Coluna       | Tipo SQL                    | Restrições                    |
|--------------|-----------------------------|-------------------------------|
| `id`         | `UUID`                      | PK, `defaultRandom()`        |
| `name`       | `VARCHAR(255)`              | `NOT NULL`                    |
| `email`      | `VARCHAR(255)`              | `NOT NULL`, `UNIQUE`          |
| `avatarUrl`  | `VARCHAR(1024)`             | nullable                      |
| `createdAt`  | `TIMESTAMP WITH TIME ZONE`  | `NOT NULL`, `defaultNow()`    |
| `updatedAt`  | `TIMESTAMP WITH TIME ZONE`  | `NOT NULL`, `defaultNow()`    |

**Tipos exportados:**

| Tipo          | Uso                                        |
|---------------|--------------------------------------------|
| `UserSelect`  | Retorno de queries (`select`)              |
| `UserInsert`  | Dados para inserção (`insert`)             |
| `UserUpdate`  | Atualização parcial (`Partial<UserInsert>`) |

---

## Comandos Drizzle & Setup

### Configuração (`api/drizzle.config.ts`)

O arquivo de configuração do Drizzle Kit fica na raiz de `api/` e aponta para os schemas e o diretório de migrações:

```ts
export default defineConfig({
  schema: './infra/database/models/index.ts',  // onde estão os schemas
  out: './infra/database/migrations',          // onde as migrações são salvas
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,            // string de conexão via .env
  },
});
```

### Scripts disponíveis (`api/package.json`)

Todos os comandos abaixo devem ser executados a partir da pasta `api/`:

```bash
cd api
```

| Comando | Script | O que faz |
|---------|--------|-----------|
| `pnpm db:generate` | `drizzle-kit generate` | Lê os schemas e gera arquivos SQL de migração em `infra/database/migrations/`. |
| `pnpm db:migrate` | `drizzle-kit migrate` | Aplica as migrações pendentes no banco de dados. |
| `pnpm db:push` | `drizzle-kit push` | Sincroniza o schema direto no banco **sem gerar arquivos de migração** (útil em dev). |
| `pnpm db:studio` | `drizzle-kit studio` | Abre o Drizzle Studio (GUI web) para visualizar e editar dados no navegador. |
| `pnpm docker:up` | `docker compose ... up -d` | Sobe os containers (PostgreSQL + Firebase Emulator). |
| `pnpm docker:down` | `docker compose ... down` | Derruba os containers. |

### Fluxo típico de setup (primeira vez)

```bash
# 1. Suba o banco de dados
pnpm docker:up

# 2. Sincronize o schema no banco (dev rápido)
pnpm db:push

# 3. (Opcional) Abra o Studio para verificar
pnpm db:studio
```

### Fluxo de migração (produção / equipe)

```bash
# 1. Altere ou crie um arquivo *.schema.ts em infra/database/models/

# 2. Gere a migração SQL
pnpm db:generate

# 3. Aplique no banco
pnpm db:migrate
```

### Dependências relevantes

| Pacote | Onde | Papel |
|--------|------|-------|
| `drizzle-orm` | `dependencies` | Runtime do ORM (queries, tipos) |
| `drizzle-kit` | `devDependencies` | CLI de migrações, push e studio |
| `pg` | `dependencies` | Driver PostgreSQL para Node.js |
| `dotenv` | `dependencies` | Carrega `DATABASE_URL` do `.env` |

---

## Docker (`docker-compose.yml`)

| Serviço      | Imagem                      | Porta(s) exposta(s)                   |
|--------------|-----------------------------|---------------------------------------|
| `postgres`   | `postgres:16-alpine`        | `5433 → 5432`                         |
| `firebase`   | `spine3/firebase-emulator`  | `4000`, `9099`, `8080`, `9199`, etc.  |

Subir os containers:

```bash
cd api/infra
docker compose up -d
```

---

## Firebase (`firebase/`)

- **`admin.ts`** — Inicializa o Firebase Admin SDK.
- **`storage.ts`** — Adaptador para upload/download de arquivos no Firebase Storage.
