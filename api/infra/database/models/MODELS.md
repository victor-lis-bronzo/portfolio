# MODELS Layer (`api/infra/database/models`)

A camada de **Models** é responsável pela definição das tabelas do banco de dados relacional e a modelagem estrutural da aplicação usando o **Drizzle ORM**.

## Função

Sua principal função é mapear e tipar a estrutura do banco de dados PostgreSQL. Ela define:
- Os nomes das tabelas.
- As colunas, seus tipos (UUID, VARCHAR, TIMESTAMP, etc.) e restrições (Primary Key, Not Null, Unique).
- Tipos TypeScript inferidos a partir das tabelas (`UserSelect`, `UserInsert`, `UserUpdate`) para garantir type-safety em toda a aplicação.

---

## Interações

### ⬆️ Camada de Cima (DAO - Data Access Object)
* **Como interage**: A camada de **DAO** importa os schemas e os tipos TypeScript exportados por esta camada.
* **Exemplo**: O `UserDAO` importa a constante `users` para usá-la nas queries (`this.db.select().from(users)`) e o tipo `UserSelect` para tipar o retorno de suas funções assíncronas.

### ⬇️ Camada de Baixo (Banco de Dados / Infraestrutura)
* **Como interage**: Ela mapeia diretamente as tabelas físicas do banco de dados PostgreSQL. O Drizzle ORM utiliza esta definição para gerar migrações SQL e executar comandos reais no banco.
