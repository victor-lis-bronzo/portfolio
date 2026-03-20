import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { techs } from "@database/models";
import { z } from "zod";

export const techSelectSchema = createSelectSchema(techs);

export const techInsertSchema = createInsertSchema(techs)
  .omit({ id: true })
  .extend({ name: z.string().min(1) });

export const techIdSchema = techSelectSchema.pick({ id: true });

export type Tech = z.infer<typeof techSelectSchema>;
export type CreateTech = z.infer<typeof techInsertSchema>;
