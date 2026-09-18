"use server"

import { z } from "zod"
import { persistContactLead } from "@/lib/contact-lead-delivery.mjs"

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
    [
      "Wholesale / Sourcing",
      "Sample Request",
      "Lot List",
      "Roasting / Solutions",
      "Editorial / Source Correction",
      "Media / Interview",
      "General Enquiry",
    ],
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

  const persisted = await persistContactLead(parsed.data)
  if (!persisted) {
    return {
      success: false,
      error: "Your enquiry could not be saved. Please try again.",
    }
  }

  return { success: true }
}
