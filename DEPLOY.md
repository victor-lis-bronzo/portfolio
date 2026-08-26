# Deploy

O deploy de produção (`web`, hospedado na Vercel) é controlado por **tags Git**, não
por push direto em `main`. Isso mantém o histórico de releases explícito e permite
rollback previsível apontando para uma tag anterior.

## Como funciona

1. O deploy automático da Vercel via integração Git está **desabilitado** para a
   branch `main` (`web/vercel.json` → `git.deploymentEnabled.main: false`).
2. Criar e enviar uma tag anotada no padrão `vX.Y.Z` dispara o workflow
   [`.github/workflows/release.yml`](.github/workflows/release.yml), que:
   - **resolve**: valida que a tag existe, segue SemVer estrito e é uma tag anotada
     (`git tag -a`) — tags leves são rejeitadas.
   - **verify**: instala dependências, roda lint (Biome) e build do `web`
     (pulável com `skip_verify` no disparo manual).
   - **deploy**: roda sob o Environment `production` do GitHub (pode exigir approval
     manual, se configurado em Settings → Environments) e publica em produção via
     Vercel CLI (`vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`).
   - **smoke**: faz um `curl` na URL retornada pelo deploy para confirmar HTTP 2xx/3xx.

## Criando uma release

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

Para corrigir uma tag criada por engano, delete e recrie — nunca mova a tag:

```bash
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## Rollback / redeploy manual

Use o disparo manual do workflow (`Actions` → `Release` → `Run workflow`) apontando
`tag` para uma tag anterior já publicada, com `confirm: yes`. Isso reconstrói e
redeploya exatamente aquele commit em produção.

## Secrets e variables necessários no GitHub

Configurar em **Settings → Secrets and variables → Actions**.

| Nome | Tipo | Descrição |
|---|---|---|
| `VERCEL_TOKEN` | Secret | Token da conta Vercel usado pela CLI para autenticar o deploy |
| `VERCEL_ORG_ID` | Variable | `orgId` do projeto na Vercel |
| `VERCEL_PROJECT_ID` | Variable | `projectId` do projeto `web` na Vercel |

Recomenda-se também criar o Environment `production` (Settings → Environments) para
poder exigir approval manual antes do job `deploy` rodar.

## O que ficou fora deste workflow

O pacote `api/` não faz parte deste pipeline de deploy por tag — seu ciclo de vida
(Docker Compose + VPS) é tratado separadamente.
