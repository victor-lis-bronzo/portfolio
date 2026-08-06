import { NextRequest } from "next/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { resumeSchema } from "@/lib/mcp/schema";
import { renderResumeHtml } from "@/lib/mcp/render";
import { generatePdfFromHtml } from "@/lib/mcp/pdf";

// 1. Diretivas Críticas para Next.js / Vercel
export const dynamic = "force-dynamic";
export const maxDuration = 60; // Estende o timeout da Serverless Function

// 2. Políticas de CORS inegociáveis para conexões de clientes remotos (Gemini)
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const server = new McpServer({
  name: "ats-resume-generator-web",
  version: "1.0.0",
});

server.tool(
  "generate_ats_resume_pdf",
  "Gera um arquivo PDF de currículo formatado para ATS a partir de um JSON estruturado.",
  resumeSchema.shape,
  async (args) => {
    try {
      const parsed = resumeSchema.safeParse(args);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((i) => `${i.path.join(".") || "root"}: ${i.message}`)
          .join("; ");
        return {
          content: [{ type: "text", text: `Erro de validação: ${issues}. Corrija o JSON e tente novamente.` }],
          isError: true,
        };
      }

      const html = renderResumeHtml(parsed.data);
      const pdfPath = await generatePdfFromHtml(html, parsed.data.outputFilename);

      return {
        content: [{ type: "text", text: `Arquivo PDF gerado e salvo com sucesso em: ${pdfPath.replace(/\\/g, "/")}. Avise o usuário que o arquivo está pronto.` }],
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Erro crítico na geração do PDF: ${errorMessage}` }],
        isError: true,
      };
    }
  }
);

// Mapeamento em memória. Atenção: Isso é volátil em arquiteturas Serverless.
const activeTransports = new Map<string, SSEServerTransport>();

function createSseAdapter() {
  const encoder = new TextEncoder();
  let controllerRef: ReadableStreamDefaultController | null = null;
  const listeners: Record<string, Array<() => void>> = { close: [], finish: [] };

  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;
    },
    cancel() {
      listeners.close.forEach((fn) => fn());
    },
  });

  const mockRes = {
    writeHead: () => mockRes,
    write: (chunk: string | Uint8Array) => {
      if (controllerRef) {
        controllerRef.enqueue(typeof chunk === "string" ? encoder.encode(chunk) : chunk);
      }
      return true;
    },
    end: () => {
      if (controllerRef) {
        try { controllerRef.close(); } catch { }
      }
    },
    on: (event: string, listener: () => void) => {
      if (listeners[event]) listeners[event].push(listener);
      return mockRes;
    },
    once: (event: string, listener: () => void) => {
      if (listeners[event]) listeners[event].push(listener);
      return mockRes;
    },
    emit: (event: string) => {
      if (listeners[event]) listeners[event].forEach((fn) => fn());
    },
  };

  return { stream, mockRes };
}

// 3. Método OPTIONS: O porteiro que aprova a conexão do Gemini
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET(req: NextRequest) {
  const { stream, mockRes } = createSseAdapter();

  // A URL de callback precisa ser a rota absoluta baseada na requisição atual
  const url = new URL(req.url);
  const callbackUrl = `${url.origin}${url.pathname}`;

  const transport = new SSEServerTransport(callbackUrl, mockRes as any);

  const sessionId = transport.sessionId;
  activeTransports.set(sessionId, transport);

  mockRes.on("close", () => {
    activeTransports.delete(sessionId);
  });

  await server.connect(transport);

  return new Response(stream, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("sessionId");

  if (sessionId && activeTransports.has(sessionId)) {
    const transport = activeTransports.get(sessionId)!;
    const body = await req.json();

    const mockRes = {
      writeHead: () => mockRes,
      end: () => { },
    };

    await transport.handlePostMessage(req as any, mockRes as any, body);

    return new Response("Accepted", {
      status: 202,
      headers: CORS_HEADERS
    });
  }

  // Fallback para fallback de requisições JSON diretas
  try {
    const body = await req.json();
    const parsed = resumeSchema.parse(body);
    const html = renderResumeHtml(parsed);
    const pdfPath = await generatePdfFromHtml(html, parsed.outputFilename);

    return Response.json({
      success: true,
      path: pdfPath.replace(/\\/g, "/"),
    }, { headers: CORS_HEADERS });
  } catch (err: unknown) {
    return Response.json({ error: `Erro: ${err}` }, { status: 500, headers: CORS_HEADERS });
  }
}