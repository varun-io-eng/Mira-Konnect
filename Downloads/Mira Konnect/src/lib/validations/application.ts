import { z } from "zod";



const applyFields = {

  jobId: z.string().min(1),

  coverNote: z.string().max(2000).optional(),

};



export const applyMinimalSchema = z.object(applyFields);



export const applyFullSchema = z.object({

  ...applyFields,

  firstName: z.string().min(1).max(80),

  lastName: z.string().min(1).max(80),

  email: z.string().email(),

  phone: z.string().min(6).max(30),

  currentJobTitle: z.string().min(1).max(120),

  currentSalary: z.string().max(80).optional(),

  address: z.string().min(2).max(300),

  message: z.string().max(5000).optional(),

  agreeTerms: z.literal("on", { message: "Please accept the Terms and Conditions" }),

});



/** @deprecated use applyMinimalSchema / applyFullSchema */

export const applySchema = applyMinimalSchema;



export function buildApplicationNotes(data: {

  coverNote?: string;

  currentJobTitle?: string;

  currentSalary?: string;

  address?: string;

  message?: string;

  coverLetterName?: string;

}): string | undefined {

  const lines: string[] = [];

  if (data.currentJobTitle) lines.push(`Current job title: ${data.currentJobTitle}`);

  if (data.currentSalary) lines.push(`Current salary: ${data.currentSalary}`);

  if (data.address) lines.push(`Address: ${data.address}`);

  if (data.message?.trim()) lines.push(`Message:\n${data.message.trim()}`);

  if (data.coverLetterName) lines.push(`Cover letter file: ${data.coverLetterName}`);

  if (data.coverNote?.trim()) lines.push(data.coverNote.trim());

  return lines.length ? lines.join("\n\n") : undefined;

}



export function parseApplyFormData(formData: FormData) {

  const isFullApplication = formData.get("applicationForm") === "full";

  const raw = {

    jobId: formData.get("jobId"),

    coverNote: formData.get("coverNote") || undefined,

    firstName: formData.get("firstName") || undefined,

    lastName: formData.get("lastName") || undefined,

    email: formData.get("email") || undefined,

    phone: formData.get("phone") || undefined,

    currentJobTitle: formData.get("currentJobTitle") || undefined,

    currentSalary: formData.get("currentSalary") || undefined,

    address: formData.get("address") || undefined,

    message: formData.get("message") || undefined,

    agreeTerms: formData.get("agreeTerms") === "on" ? "on" : undefined,

  };



  if (isFullApplication) {

    return { kind: "full" as const, parsed: applyFullSchema.safeParse(raw) };

  }

  return { kind: "minimal" as const, parsed: applyMinimalSchema.safeParse(raw) };

}


