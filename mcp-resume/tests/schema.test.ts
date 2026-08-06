import { describe, it, expect } from 'vitest';
import { resumeSchema } from '../src/schema.js';

describe('resumeSchema Validation', () => {
  const validResumePayload = {
    name: 'Victor Lis Bronzo',
    position: 'Desenvolvedor Full-Stack',
    contactInformation: '+55 11 99999-9999',
    email: 'victorlisbronzo1@gmail.com',
    address: 'Atibaia, SP',
    summary: 'Desenvolvedor Full-Stack experiente em Node.js e React.',
    education: [
      {
        school: 'IFSP',
        degree: 'Análise e Desenvolvimento de Sistemas',
        startYear: '2025-01-01',
        endYear: 'Presente',
      },
    ],
    workExperience: [
      {
        company: 'StarSeg',
        position: 'Desenvolvedor Full-Stack',
        description: 'Desenvolvimento web.',
        keyAchievements: 'Criei arquitetura de microserviços.',
        startYear: '2025-01-01',
        endYear: 'Presente',
      },
    ],
    skills: [
      {
        title: 'Linguagens',
        skills: ['TypeScript', 'Node.js', 'Java'],
      },
    ],
    outputFilename: 'amazon-intern-cv',
  };

  it('deve validar com sucesso um payload completo e correto', () => {
    const result = resumeSchema.safeParse(validResumePayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Victor Lis Bronzo');
      expect(result.data.outputFilename).toBe('amazon-intern-cv');
    }
  });

  it('deve falhar se o campo "workExperience" estiver ausente', () => {
    const { workExperience, ...incompletePayload } = validResumePayload;
    const result = resumeSchema.safeParse(incompletePayload);
    expect(result.success).toBe(false);
  });

  it('deve falhar se o campo "email" estiver ausente', () => {
    const { email, ...incompletePayload } = validResumePayload;
    const result = resumeSchema.safeParse(incompletePayload);
    expect(result.success).toBe(false);
  });

  it('deve preencher valores default para campos opcionais ausentes', () => {
    const result = resumeSchema.safeParse(validResumePayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.projects).toEqual([]);
      expect(result.data.languages).toEqual([]);
      expect(result.data.certifications).toEqual([]);
    }
  });
});
