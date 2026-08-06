import { describe, it, expect } from 'vitest';
import { renderResumeHtml } from '../src/render.js';
import { resumeSchema } from '../src/schema.js';

describe('renderResumeHtml', () => {
  const sampleData = resumeSchema.parse({
    name: 'João da Silva',
    position: 'Engenheiro de Software',
    email: 'joao@exemplo.com',
    summary: 'Engenheiro com 5 anos de experiência.',
    education: [
      {
        school: 'USP',
        degree: 'Ciência da Computação',
        startYear: '2019-01-01',
        endYear: '2023-12-31',
      },
    ],
    workExperience: [
      {
        company: 'Empresa X',
        position: 'Desenvolvedor Senior',
        description: 'Liderou time de 5 devs.',
        keyAchievements: 'Reduziu custos de infra em 30%.',
        startYear: '2022-01-01',
        endYear: 'Presente',
      },
    ],
    skills: [
      {
        title: 'Backend',
        skills: ['Node.js', 'PostgreSQL', 'Docker'],
      },
    ],
  });

  it('deve compilar o template Handlebars e incluir dados de entrada no HTML', () => {
    const html = renderResumeHtml(sampleData);
    expect(html).toContain('João da Silva');
    expect(html).toContain('Engenheiro de Software');
    expect(html).toContain('joao@exemplo.com');
    expect(html).toContain('USP');
    expect(html).toContain('Empresa X');
    expect(html).toContain('Reduziu custos de infra em 30%.');
    expect(html).toContain('Node.js');
  });
});
