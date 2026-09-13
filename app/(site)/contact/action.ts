"use server"

import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  company: z
    .string()
    .min(1, "Company or brand is required")
    .max(150, "Company or brand must be 150 characters or fewer"),
  service: z.enum(
    ["Wholesale", "Custom Roasting", "Coffee Marketing", "Other Enquiry"],
    { errorMap: () => ({ message: "Please select a commercial path" }) }
  ),
  message: z
    .string()
    .max(2000, "Project context must be 2000 characters or fewer")
    .optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Validation failed",
    }
  }

  const { name, email, company, service, message } = parsed.data

  console.log("[ContactForm] New commercial enquiry received:", {
    name,
    email,
    company,
    commercialPath: service,
    projectContext: message ?? "(no project context)",
    timestamp: new Date().toISOString(),
  })

  return { success: true }
}
