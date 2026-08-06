import { NextRequest } from "next/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse";
import { resumeSchema } from "../../../lib/mcp/schema";
import { renderResumeHtml } from "../../../lib/mcp/render";
import { generatePdfFromHtml } from "../../../lib/mcp/pdf";

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
          content: [
            {
              type: "text",
              text: `Erro de compilação: O campo de entrada possui erros de validação: ${issues}. Corrija o JSON e tente novamente.`,
            },
          ],
          isError: true,
        };
      }

      const html = renderResumeHtml(parsed.data);
      const pdfPath = await generatePdfFromHtml(html, parsed.data.outputFilename);
      const normalizedPath = pdfPath.replace(/\\/g, "/");

      return {
        content: [
          {
            type: "text",
            text: `Arquivo PDF gerado e salvo com sucesso em: ${normalizedPath}. Avise o usuário que o arquivo está pronto.`,
          },
        ],
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        content: [
          {
            type: "text",
            text: `Erro de compilação ao gerar o PDF: ${errorMessage}. Corrija o JSON e tente novamente.`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Mapeamento de sessões ativas do transporte SSE
const activeTransports = new Map<string, SSEServerTransport>();

/**
 * Cria um adaptador de resposta do Node.js sobre um ReadableStream Web nativo do Next.js App Router
 */
function createSseAdapter() {
  const encoder = new TextEncoder();
  let controllerRef: ReadableStreamDefaultController | null = null;
  const listeners: Record<string, Array<() => void>> = {
    close: [],
    finish: [],
  };

  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;
    },
    cancel() {
      listeners.close.forEach((fn) => fn());
    },
  });

  const mockRes = {
    writeHead(_status: number, _headers?: Record<string, string>) {
      return mockRes;
    },
    write(chunk: string | Uint8Array) {
      if (controllerRef) {
        const data = typeof chunk === "string" ? encoder.encode(chunk) : chunk;
        controllerRef.enqueue(data);
      }
      return true;
    },
    end() {
      if (controllerRef) {
        try {
          controllerRef.close();
        } catch {}
      }
    },
    on(event: string, listener: () => void) {
      if (listeners[event]) {
        listeners[event].push(listener);
      }
      return mockRes;
    },
    once(event: string, listener: () => void) {
      if (listeners[event]) {
        listeners[event].push(listener);
      }
      return mockRes;
    },
    emit(event: string) {
      if (listeners[event]) {
        listeners[event].forEach((fn) => fn());
      }
    },
  };

  return { stream, mockRes };
}

export async function GET(req: NextRequest) {
  const { stream, mockRes } = createSseAdapter();

  const transport = new SSEServerTransport("/api/mcp", mockRes as any);
  
  const sessionId = transport.sessionId;
  activeTransports.set(sessionId, transport);

  mockRes.on("close", () => {
    activeTransports.delete(sessionId);
  });

  await server.connect(transport);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("sessionId");

  // Se houver um sessionId ativo na query string, repassa para o transporte SSE do MCP
  if (sessionId && activeTransports.has(sessionId)) {
    const transport = activeTransports.get(sessionId)!;
    const body = await req.json();

    const mockRes = {
      writeHead(_status: number) {
        return mockRes;
      },
      end() {},
    };

    await transport.handlePostMessage(req as any, mockRes as any, body);
    return new Response("Accepted", { status: 202 });
  }

  // Caso contrário, lida como uma chamada direta de API JSON
  try {
    const body = await req.json();

    // Chamada no formato JSON-RPC 2.0
    if (body?.method === "tools/call" && body?.params?.name === "generate_ats_resume_pdf") {
      const parsed = resumeSchema.safeParse(body.params.arguments);
      if (!parsed.success) {
        return Response.json({
          jsonrpc: "2.0",
          id: body.id,
          error: { code: -32602, message: parsed.error.message }
        }, { status: 400 });
      }
      const html = renderResumeHtml(parsed.data);
      const pdfPath = await generatePdfFromHtml(html, parsed.data.outputFilename);
      return Response.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          content: [{ type: "text", text: `Arquivo PDF gerado e salvo com sucesso em: ${pdfPath.replace(/\\/g, "/")}` }]
        }
      });
    }

    // Chamada com o JSON direto do currículo
    const parsed = resumeSchema.parse(body);
    const html = renderResumeHtml(parsed);
    const pdfPath = await generatePdfFromHtml(html, parsed.outputFilename);
    const normalizedPath = pdfPath.replace(/\\/g, "/");

    return Response.json({
      success: true,
      message: `Arquivo PDF gerado e salvo com sucesso em: ${normalizedPath}`,
      path: normalizedPath,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return Response.json({ error: `Erro na geração de PDF: ${errorMessage}` }, { status: 500 });
  }
}
