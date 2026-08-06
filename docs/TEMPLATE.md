import Fastify from "fastify";
import cors from "@fastify/cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { resumeSchema } from "./lib/schema"; // Ajuste o path
import { renderResumeHtml } from "./lib/render"; // Ajuste o path
import { generatePdfFromHtml } from "./lib/pdf"; // Ajuste o path

const app = Fastify({ logger: true });

// Habilita o CORS de forma global e robusta para o Gemini
app.register(cors, {
origin: "\*",
methods: ["GET", "POST", "OPTIONS"],
});

const server = new McpServer({
name: "ats-resume-generator-vps",
version: "1.0.0",
});

server.tool(
"generate_ats_resume_pdf",
"Gera um arquivo PDF de currículo formatado para ATS.",
resumeSchema.shape,
async (args) => {
// ... mesma lógica de parsing e geração de PDF ...
return {
content: [{ type: "text", text: `PDF gerado com sucesso.` }],
};
}
);

// Aqui a memória persiste porque o Fastify é um processo contínuo (Daemon/PM2/Docker)
const activeTransports = new Map<string, SSEServerTransport>();

// Rota 1: Estabelece a conexão SSE
app.get("/api/mcp", async (req, reply) => {
// Passamos o caminho exato para onde o POST deve ser enviado
const transport = new SSEServerTransport("/api/mcp/message", reply.raw as any);
const sessionId = transport.sessionId;

activeTransports.set(sessionId, transport);

reply.raw.on("close", () => {
activeTransports.delete(sessionId);
});

await server.connect(transport);
});

// Rota 2: Recebe as mensagens JSON-RPC do Gemini
app.post("/api/mcp/message", async (req, reply) => {
const sessionId = (req.query as any).sessionId;

const transport = activeTransports.get(sessionId);
if (!transport) {
return reply.status(404).send({ error: "Session not found or expired" });
}

// O Fastify já fez o parse do JSON no req.body
await transport.handlePostMessage(req.raw as any, reply.raw as any, req.body);
});

// Inicialização da porta
const start = async () => {
try {
await app.listen({ port: 3001, host: "0.0.0.0" });
console.log("MCP Server rodando no Fastify na porta 3001");
} catch (err) {
app.log.error(err);
process.exit(1);
}
};

start();
