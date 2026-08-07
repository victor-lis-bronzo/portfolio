import { randomUUID } from "node:crypto";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { generateResumePdf } from "./pdf.js";

const app = Fastify({ logger: true });

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

  // Gera um PDF de currículo formatado para ATS via Typst
  server.tool(
    "generate_ats_resume_pdf",
    "Gera um arquivo PDF de currículo formatado para ATS a partir dos dados do candidato.",
    {
      name: z.string().describe("Nome completo do candidato"),
      position: z.string().describe("Cargo/posição pretendida"),
      contactInformation: z.object({
        email: z.string(),
        address: z.string(),
        linkedin: z.string().describe("Ex: linkedin.com/in/usuario, sem https://"),
        github: z.string().describe("Ex: github.com/usuario, sem https://"),
        portfolio: z.string().describe("Ex: victorlisbronzo.com, sem https://"),
      }),
      summary: z.string(),
      workExperience: z.array(
        z.object({
          position: z.string(),
          company: z.string(),
          startYear: z.string(),
          endYear: z.string(),
          description: z.string(),
          keyAchievements: z.array(z.string()).optional().default([]),
        })
      ),
      projects: z.array(
        z.object({
          name: z.string(),
          link: z.string().describe("Ex: github.com/usuario/repo, sem https://"),
          description: z.string(),
          technologies: z.array(z.string()),
        })
      ),
      education: z.array(
        z.object({
          degree: z.string(),
          school: z.string(),
          startYear: z.string(),
          endYear: z.string(),
        })
      ),
      skills: z.object({
        languages: z.array(z.string()),
        frameworks: z.array(z.string()),
        tools: z.array(z.string()),
      }),
    },
    async (args) => {
      const pdfBuffer = await generateResumePdf(args);
      return {
        content: [
          {
            type: "resource",
            resource: {
              uri: `resource://portfolio-mcp/cv-${randomUUID()}.pdf`,
              mimeType: "application/pdf",
              blob: pdfBuffer.toString("base64"),
            },
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
