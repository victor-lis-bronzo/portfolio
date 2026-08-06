import Fastify from "fastify";
import cors from "@fastify/cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

const app = Fastify({ logger: true });

// Habilita o CORS de forma global e robusta para clientes (incluindo Gemini / Claude)
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-mcp-session-id"],
});

// Instanciação do Servidor MCP
const server = new McpServer({
  name: "portfolio-mcp-server",
  version: "1.0.0",
});

// Exemplo de tool MCP registrada
server.tool(
  "generate_ats_resume_pdf",
  "Gera um arquivo PDF de currículo formatado para ATS.",
  {
    name: z.string().describe("Nome completo do candidato"),
    role: z.string().describe("Cargo ou área pretendida"),
    experience: z.array(z.string()).optional().describe("Lista de experiências"),
  },
  async (args) => {
    // Lógica de geração de PDF / retorno
    return {
      content: [
        {
          type: "text",
          text: `PDF gerado com sucesso para ${args.name} (${args.role}).`,
        },
      ],
    };
  }
);

// Mapeamento de conexões ativas SSE
const activeTransports = new Map<string, SSEServerTransport>();

// Rota 1: Estabelece a conexão SSE
app.get("/api/mcp", async (req, reply) => {
  const transport = new SSEServerTransport("/api/mcp/message", reply.raw as any);
  const sessionId = transport.sessionId;

  activeTransports.set(sessionId, transport);

  reply.raw.on("close", () => {
    activeTransports.delete(sessionId);
  });

  await server.connect(transport);
});

// Rota 2: Recebe as mensagens JSON-RPC do cliente MCP
app.post("/api/mcp/message", async (req, reply) => {
  const sessionId = (req.query as any).sessionId;

  const transport = activeTransports.get(sessionId);
  if (!transport) {
    return reply.status(404).send({ error: "Session not found or expired" });
  }

  await transport.handlePostMessage(req.raw as any, reply.raw as any, req.body);
});

// Inicialização do servidor na porta 3001
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`MCP Server rodando no Fastify na porta ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
