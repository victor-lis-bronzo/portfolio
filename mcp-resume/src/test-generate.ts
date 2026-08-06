import fs from 'node:fs';
import path from 'node:path';
import { resumeSchema } from './schema.js';
import { renderResumeHtml } from './render.js';
import { generatePdfFromHtml } from './pdf.js';

async function runTest() {
  console.log('📄 Lendo amazon-intern.json...');
  const jsonPath = path.resolve('c:/Users/Victor/Desktop/referencias/cv-templates/json/amazon-intern.json');
  
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Arquivo não encontrado: ${jsonPath}`);
  }

  const rawContent = fs.readFileSync(jsonPath, 'utf-8');
  const jsonData = JSON.parse(rawContent);

  // Adiciona outputFilename se não houver
  jsonData.outputFilename = 'amazon-intern-cv';

  console.log('🔍 Validando payload com Zod...');
  const parsed = resumeSchema.parse(jsonData);

  console.log('🎨 Renderizando HTML com Handlebars...');
  const html = renderResumeHtml(parsed);

  console.log('⚙️ Compilando PDF via Puppeteer...');
  const pdfPath = await generatePdfFromHtml(html, parsed.outputFilename);

  const stats = fs.statSync(pdfPath);
  console.log(`✅ Sucesso! PDF gerado e salvo em: ${pdfPath}`);
  console.log(`📊 Tamanho do arquivo: ${(stats.size / 1024).toFixed(2)} KB`);
}

runTest().catch((err) => {
  console.error('❌ Erro no teste de geração:', err);
  process.exit(1);
});
