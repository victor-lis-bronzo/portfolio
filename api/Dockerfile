# Multi-stage build — contexto isolado dentro de api/
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

COPY tsconfig.json ./
COPY src ./src
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

# Typst: compilador de documentos nativo usado pela tool generate_ats_resume_pdf
RUN apk add --no-cache wget tar xz \
    && wget -O /tmp/typst.tar.xz https://github.com/typst/typst/releases/latest/download/typst-x86_64-unknown-linux-musl.tar.xz \
    && tar -xJf /tmp/typst.tar.xz -C /tmp \
    && mv /tmp/typst-x86_64-unknown-linux-musl/typst /usr/local/bin/typst \
    && rm -rf /tmp/typst*

ENV NODE_ENV=production
ENV PORT=3001

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/templates ./dist/templates

EXPOSE 3001
CMD ["node", "dist/server.js"]
