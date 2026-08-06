import { z } from 'zod';

export const socialMediaSchema = z.object({
  socialMedia: z.string(),
  link: z.string(),
});

export const educationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});

export const workExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  description: z.string(),
  keyAchievements: z.string().optional(),
  startYear: z.string(),
  endYear: z.string(),
});

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string().optional(),
  technologies: z.array(z.string()).optional(),
});

export const skillCategorySchema = z.object({
  title: z.string(),
  skills: z.array(z.string()),
});

export const resumeSchema = z.object({
  name: z.string({ required_error: "O campo 'name' é obrigatório." }),
  position: z.string({ required_error: "O campo 'position' é obrigatório." }),
  contactInformation: z.string().optional().default(''),
  email: z.string({ required_error: "O campo 'email' é obrigatório." }),
  address: z.string().optional().default(''),
  profilePicture: z.string().optional().default(''),
  socialMedia: z.array(socialMediaSchema).optional().default([]),
  summary: z.string({ required_error: "O campo 'summary' é obrigatório." }),
  education: z.array(educationSchema, { required_error: "O campo 'education' é obrigatório." }),
  workExperience: z.array(workExperienceSchema, { required_error: "O campo 'workExperience' é obrigatório." }),
  projects: z.array(projectSchema).optional().default([]),
  skills: z.array(skillCategorySchema, { required_error: "O campo 'skills' é obrigatório." }),
  languages: z.array(z.string()).optional().default([]),
  certifications: z.array(z.string()).optional().default([]),
  outputFilename: z.string().optional(),
});

export type ResumeData = z.infer<typeof resumeSchema>;
