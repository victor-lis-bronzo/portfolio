import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import { type ResumeData } from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderResumeHtml(data: ResumeData): string {
  let templatePath = path.resolve(__dirname, '../templates/resume.hbs');
  if (!fs.existsSync(templatePath)) {
    templatePath = path.resolve(__dirname, '../../templates/resume.hbs');
  }

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Arquivo de template não encontrado em: ${templatePath}`);
  }

  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateSource);

  return template(data);
}
