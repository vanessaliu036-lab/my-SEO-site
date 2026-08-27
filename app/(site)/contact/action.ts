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
  service: z.enum(
    ["General Enquiry", "Editorial Question", "Source Correction", "Media / Interview"],
    { errorMap: () => ({ message: "Please select an enquiry type" }) }
  ),
  message: z
    .string()
    .max(2000, "Message must be 2000 characters or fewer")
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

  const { name, email, service, message } = parsed.data

  console.log("[ContactForm] New message received:", {
    name,
    email,
    enquiryType: service,
    message: message ?? "(no message)",
    timestamp: new Date().toISOString(),
  })

  return { success: true }
}
