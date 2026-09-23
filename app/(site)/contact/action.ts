"use server"

import { contactSchema } from "./schema"
import type { ContactFormData } from "./schema"
import { persistContactLead } from "@/lib/contact-lead-delivery.mjs"
import { sendContactNotification } from "@/lib/contact-notification.mjs"

type ContactActionResult =
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

  // Airtable remains the system of record. Notification failure must not ask the
  // visitor to submit the same enquiry twice.
  await sendContactNotification(parsed.data)

  return { success: true }
}
