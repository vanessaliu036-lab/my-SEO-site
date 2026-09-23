"use server"

import { contactSchema, type ContactFormData } from "./schema"
import { persistContactLead } from "@/lib/contact-lead-delivery.mjs"


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
