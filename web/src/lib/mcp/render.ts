import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import { type ResumeData } from './schema';

export function renderResumeHtml(data: ResumeData): string {
  // process.cwd() aponta para a raiz do pacote 'web' tanto no dev server do Next.js quanto via script npx tsx
  let templatePath = path.resolve(process.cwd(), 'src/lib/mcp/templates/resume.hbs');
  
  if (!fs.existsSync(templatePath)) {
    // Fallback caso seja executado de outro diretório acidentalmente
    templatePath = path.resolve(process.cwd(), 'lib/mcp/templates/resume.hbs');
  }

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Arquivo de template não encontrado em: ${templatePath}`);
  }

  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateSource);

  return template(data);
}
