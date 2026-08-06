import assert from 'node:assert/strict';
import { resumeSchema } from '../src/schema.js';
import { renderResumeHtml } from '../src/render.js';

console.log('🧪 Executando testes unitários do schema Zod e renderizador Handlebars...');

// Teste 1: Validação de Payload Válido
const validPayload = {
  name: 'Victor Lis Bronzo',
  position: 'Desenvolvedor Full-Stack',
  email: 'victorlisbronzo1@gmail.com',
  summary: 'Desenvolvedor Full-Stack experiente.',
  education: [
    {
      school: 'IFSP',
      degree: 'ADS',
      startYear: '2025-01-01',
      endYear: 'Presente',
    },
  ],
  workExperience: [
    {
      company: 'StarSeg',
      position: 'Desenvolvedor Full-Stack',
      description: 'Dev de aplicações.',
      startYear: '2025-01-01',
      endYear: 'Presente',
    },
  ],
  skills: [
    {
      title: 'Linguagens',
      skills: ['TypeScript', 'Node.js'],
    },
  ],
  outputFilename: 'amazon-intern-cv',
};

const parseResult = resumeSchema.safeParse(validPayload);
assert.equal(parseResult.success, true, 'Payload válido deveria ter sido aprovado pelo Zod');
if (parseResult.success) {
  assert.equal(parseResult.data.name, 'Victor Lis Bronzo');
  assert.equal(parseResult.data.outputFilename, 'amazon-intern-cv');
  console.log('  ✅ [PASS] Validação do Zod com payload válido');
}

// Teste 2: Validação de Rejeição de Payload Sem Campo Obrigatório (workExperience)
const { workExperience, ...invalidPayload } = validPayload;
const parseFailResult = resumeSchema.safeParse(invalidPayload);
assert.equal(parseFailResult.success, false, 'Payload sem workExperience deveria ser rejeitado pelo Zod');
console.log('  ✅ [PASS] Rejeição do Zod para campo obrigatório ausente');

// Teste 3: Compilação e Injeção do Handlebars
if (parseResult.success) {
  const html = renderResumeHtml(parseResult.data);
  assert.ok(html.includes('Victor Lis Bronzo'), 'HTML deve conter o nome');
  assert.ok(html.includes('Desenvolvedor Full-Stack'), 'HTML deve conter o cargo');
  assert.ok(html.includes('StarSeg'), 'HTML deve conter a empresa');
  assert.ok(html.includes('IFSP'), 'HTML deve conter a instituição de ensino');
  console.log('  ✅ [PASS] Renderização do template Handlebars com injeção de dados');
}

console.log('\n🎉 Todos os testes unitários passaram com sucesso!');
