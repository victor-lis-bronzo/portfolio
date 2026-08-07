import { randomUUID } from "node:crypto";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const app = Fastify({ logger: true });

// Habilita o CORS de forma global e robusta para clientes (incluindo Gemini / Claude)
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "mcp-session-id"],
  exposedHeaders: ["mcp-session-id"],
});

// Cria uma instância nova de servidor MCP por sessão — o SDK só aceita uma
// transport conectada por vez em cada instância de McpServer.
function createMcpServer() {
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

  return server;
}

// Mapeamento de sessões Streamable HTTP ativas, por Mcp-Session-Id
const transports = new Map<string, StreamableHTTPServerTransport>();

// Rota 1: recebe as mensagens JSON-RPC do cliente MCP (inclui o handshake "initialize")
app.post("/", async (req, reply) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  let transport = sessionId ? transports.get(sessionId) : undefined;

  if (!transport) {
    if (sessionId || !isInitializeRequest(req.body)) {
      reply.status(400).send({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Bad Request: No valid session ID provided" },
        id: null,
      });
      return;
    }

    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sid) => {
        transports.set(sid, transport!);
      },
    });
    transport.onclose = () => {
      if (transport!.sessionId) transports.delete(transport!.sessionId);
    };

    const mcpServer = createMcpServer();
    await mcpServer.connect(transport);
  }

  await transport.handleRequest(req.raw as any, reply.raw as any, req.body);
});

// Rota 2: stream opcional de notificações do servidor para uma sessão existente
app.get("/", async (req, reply) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  const transport = sessionId ? transports.get(sessionId) : undefined;
  if (!transport) {
    reply.status(400).send("Invalid or missing session ID");
    return;
  }
  await transport.handleRequest(req.raw as any, reply.raw as any);
});

// Rota 3: encerra a sessão
app.delete("/", async (req, reply) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  const transport = sessionId ? transports.get(sessionId) : undefined;
  if (!transport) {
    reply.status(400).send("Invalid or missing session ID");
    return;
  }
  await transport.handleRequest(req.raw as any, reply.raw as any);
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
