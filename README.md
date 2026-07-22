# Portfólio Interativo & Assistente Autônomo de IA

> Uma aplicação Full-Stack arquitetada em Monorepo, contendo uma engine de manipulação de Canvas e um Agente Virtual integrado para consumo do meu contexto profissional.

Este repositório não é apenas um site estático. É uma aplicação desenvolvida para demonstrar domínio prático em arquitetura de front-end avançada (Next.js/React), orquestração de pacotes e integração de Inteligência Artificial generativa otimizada para custo e latência.

## 🏗 Decisões Arquiteturais e Engenharia

O projeto foi construído sobre uma fundação de **Monorepo (Turborepo + pnpm workspaces)**, permitindo o isolamento da aplicação web principal (`web/`) das configurações base, garantindo escalabilidade caso a aplicação cresça para múltiplos serviços.

### 🧠 A Decisão sobre IA: Injeção de Contexto Estruturado vs. RAG Tradicional
Um dos principais requisitos técnicos deste projeto era a implementação de um "Mascote" (Agente de IA) que pudesse responder perguntas sobre a minha carreira.

**Por que não usei um RAG Tradicional (Vector DB + Embeddings)?**
Em arquitetura de software, adoção de tecnologia deve ser guiada pelo problema de negócio. A aplicação de um RAG tradicional exigiria uma infraestrutura adicional (Bancos de Dados Vetoriais), adicionando latência de rede no _retrieval_ dos chunks e custos desnecessários em cloud para um dataset de tamanho fechado e determinístico (meu histórico profissional).

**A Solução Implementada:**
Implementei um modelo de **Injeção de Contexto Determinística (Stateless Context Injection)**. 
1. Meus dados profissionais (Keypoints, Summary, Reports) são pré-processados e armazenados em estruturas JSON imutáveis.
2. O serviço de IA (`generative-ai.service.ts`) consome esses dados e os injeta de forma otimizada diretamente no _System Prompt_ via Google Gemini SDK.
3. **Resultado:** Tempo de latência de busca local reduzido a 0ms, custo de infraestrutura de banco de dados vetorial zerado (redução direta de OPEX) e eliminação do risco de "alucinação de chunks" comum em RAGs mal calibrados, garantindo 100% de precisão no _recall_ do contexto.

### 🎨 Motor Gráfico (Canvas API)
Além da integração com LLMs, o módulo `drawmylife` implementa lógicas complexas de front-end puro. A interface gerencia estados de renderização de Canvas, tracking de ponteiro de mouse, ferramentas de desenho e controle de câmera, integrando essas interações nativas do browser de forma reativa com os hooks do React.

## 💻 Tech Stack

- **Ecossistema:** Next.js (App Router), React, TypeScript.
- **Inteligência Artificial:** Google Gemini SDK (`@google/generative-ai`).
- **Styling & UI:** Tailwind CSS, componentes acessíveis.
- **Orquestração:** Turborepo, pnpm workspaces.
- **BaaS (Backend as a Service):** Firebase (configurado para escalabilidade de armazenamento e analytics, se necessário).

## 📂 Estrutura do Projeto

```text
portfolio/
├── web/
│   ├── src/
│   │   ├── app/                 # Rotas da aplicação (App Router)
│   │   ├── api/                 # Serviços de backend (Gemini AI, Firebase)
│   │   │   └── services/generative-ai/data/ # Contexto imutável do Agente (JSONs)
│   │   ├── drawmylife/          # Módulo da engine de Canvas interativo
│   │   └── components/          # Componentes reusáveis de UI e Animações (Framer Motion / GSAP concepts)
├── package.json                 # Scripts unificados
└── turbo.json                   # Pipeline de build otimizada

```

## 🚀 Como executar localmente

1. **Clone o repositório e instale as dependências:**
O projeto utiliza `pnpm`. Na raiz do monorepo, execute:
```bash
pnpm install

```


2. **Configure as Variáveis de Ambiente:**
Dentro da pasta `web/`, duplique o arquivo `.env.example` para `.env` e preencha com a sua chave da API do Google Gemini.
```env
GEMINI_API_KEY=sua_chave_aqui

```


3. **Inicie o servidor de desenvolvimento:**
Na raiz do monorepo, inicie o Turborepo:
```bash
pnpm dev

```


A aplicação estará rodando em `http://localhost:3000`.

---

*Projetado e desenvolvido por Victor Lis Bronzo.*
