import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { resumeSchema } from './schema.js';
import { renderResumeHtml } from './render.js';
import { generatePdfFromHtml } from './pdf.js';

const server = new McpServer({
  name: 'ats-resume-generator',
  version: '1.0.0',
});

server.tool(
  'generate_ats_resume_pdf',
  'Gera um arquivo PDF de currículo formatado para ATS a partir de um JSON estruturado.',
  resumeSchema.shape,
  async (args) => {
    try {
      const parsed = resumeSchema.safeParse(args);
      if (!parsed.success) {
        const issues = parsed.error.issues.map((i) => `${i.path.join('.') || 'root'}: ${i.message}`).join('; ');
        return {
          content: [
            {
              type: 'text',
              text: `Erro de compilação: O campo de entrada possui erros de validação: ${issues}. Corrija o JSON e tente novamente.`,
            },
          ],
          isError: true,
        };
      }

      const html = renderResumeHtml(parsed.data);
      const pdfPath = await generatePdfFromHtml(html, parsed.data.outputFilename);
      const normalizedPath = pdfPath.replace(/\\/g, '/');

      return {
        content: [
          {
            type: 'text',
            text: `Arquivo PDF gerado e salvo com sucesso em: ${normalizedPath}. Avise o usuário que o arquivo está pronto.`,
          },
        ],
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        content: [
          {
            type: 'text',
            text: `Erro de compilação ao gerar o PDF: ${errorMessage}. Corrija o JSON e tente novamente.`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Fatal error in MCP Server:', err);
  process.exit(1);
});
