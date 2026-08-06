import assert from 'node:assert/strict';
import { resumeSchema } from '../schema';
import { renderResumeHtml } from '../render';

console.log('🧪 Executando testes unitários do MCP migrado para web (Zod e Handlebars)...');

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
  outputFilename: 'amazon-intern-web-cv',
};

// 1. Zod Validation Pass
const parseResult = resumeSchema.safeParse(validPayload);
assert.equal(parseResult.success, true, 'Payload válido deveria ser aprovado pelo Zod');
if (parseResult.success) {
  assert.equal(parseResult.data.name, 'Victor Lis Bronzo');
  console.log('  ✅ [PASS] Validação Zod no workspace web');
}

// 2. Zod Validation Fail
const { workExperience, ...invalidPayload } = validPayload;
const parseFailResult = resumeSchema.safeParse(invalidPayload);
assert.equal(parseFailResult.success, false, 'Payload sem workExperience deveria ser rejeitado pelo Zod');
console.log('  ✅ [PASS] Rejeição do Zod para campo ausente');

// 3. Handlebars Template Render
if (parseResult.success) {
  const html = renderResumeHtml(parseResult.data);
  assert.ok(html.includes('Victor Lis Bronzo'), 'HTML deve conter o nome');
  assert.ok(html.includes('StarSeg'), 'HTML deve conter a empresa');
  console.log('  ✅ [PASS] Renderização do template Handlebars no workspace web');
}

console.log('🎉 Todos os testes unitários da migração passaram com sucesso!');
