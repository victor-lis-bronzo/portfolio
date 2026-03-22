import { z } from "zod";

export const techSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
});

export const createTechSchema = techSchema.omit({ id: true });

export const techIdSchema = techSchema.pick({ id: true });

export type Tech = z.infer<typeof techSchema>;
export type CreateTechDTO = z.infer<typeof createTechSchema>;
