import { z } from "zod";

export const AttorneySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal(""))
});

export const DonorSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal(""))
});

export const LPATypeSchema = z.enum(["LP1F", "LP1H"]);

export const LPAFormSchema = z.object({
  type: LPATypeSchema,
  donor: DonorSchema,
  attorneys: z.array(AttorneySchema).min(1),
  replacementAttorneys: z.array(AttorneySchema).optional().default([]),
  decisions: z.object({
    lifeSustainingTreatment: z.enum(["donor", "attorneys"]).optional(),
    howAttorneysAct: z.enum(["joint", "jointAndSeveral"]).default("jointAndSeveral"),
    preferences: z.string().optional().default(""),
    instructions: z.string().optional().default(""),
  }),
  peopleToNotify: z.array(z.object({
    name: z.string().min(1),
    address: z.string().min(1)
  })).optional().default([]),
  certificateProvider: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    statement: z.string().optional().default("")
  }),
  correspondent: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    email: z.string().email().optional().or(z.literal(""))
  }).optional(),
});
export type LPAForm = z.infer<typeof LPAFormSchema>;
