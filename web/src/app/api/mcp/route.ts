import { NextRequest } from "next/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
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

// We need a global or outside-scope transport mapping for SSE sessions
// Note: In serverless (Vercel) this might not persist across requests.
// For local execution or a VPS it works as long as the Node process stays alive.
let globalTransport: SSEServerTransport | null = null;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  globalTransport = new SSEServerTransport("/api/mcp/messages", {} as any); // Type cast might be needed depending on SDK version
  await server.connect(globalTransport);
  
  // Create a stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // The SSEServerTransport needs a way to push messages to this stream
      // We'd have to map the transport's send method to the controller
      // Let's rely on standard response streams
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!globalTransport) {
    return new Response("No active SSE connection", { status: 400 });
  }
  
  const body = await req.json();
  await globalTransport.handlePostMessage(req as any, body); // Type casting
  return new Response("Accepted", { status: 202 });
}
